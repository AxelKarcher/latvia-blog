require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer  = require('multer')

const app = express()
const jwt = require('jsonwebtoken')
const mysql2 = require('mysql2')
const db = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '1963',
  database: 'latvia_blog'
})
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const axios = require('axios')

const {getToken} = require('./utils')
const {uploadImage, removeImage} = require('./s3')

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Server started on port', process.env.PORT))



app.post('/auth/register', (req, res) => {
  const {pseudo, mail, password} = req?.body
  const query = 'INSERT INTO users (pseudo, mail, password) VALUE (?, ?, ?)'

  db.query(query, [pseudo, mail, password], (err, result) => {
    res.status(err ? 406 : 200)
    res.send(err ? err?.code : {
      token: jwt.sign(result.insertId, process.env.TOKEN_SECRET),
      isAdmin: result?.isAdmin
    })
  })
})

app.post('/auth/login', (req, res) => {
  const {pseudo, password} = req?.body
  const query = 'SELECT * FROM users WHERE FIND_IN_SET(?,pseudo)'

  db.query(query, [pseudo], (err, result) => {
    if (err || !result?.length) {
      res.status(406)
      res.send(err?.code || 'No result')
    } else if (result[0]?.password === password) {
      res.status(200)
      res.send({
        token: jwt.sign(result[0]?.id, process.env.TOKEN_SECRET),
        isAdmin: result[0]?.isAdmin
      })
    } else {
      res.status(500)
      res.send(err)
    }
  })
})



app.get('/user/getInfos', (req, res) => {
  const id = getToken(jwt, req)
  const query = 'SELECT * FROM users WHERE FIND_IN_SET(?,id)'

  db.query(query, [id], (err, result) => {
    res.status(200)
    res.send(result[0])
  })
})

app.post('/user/updateInfos', (req, res) => {
  const {pseudo, mail, password} = req?.body
  const id = getToken(jwt, req)
  const query = 'UPDATE users SET pseudo = ?, mail = ?, password = ? WHERE id = ?'

  db.query(query, [pseudo, mail, password, id], (err, result) => {
    res.status(err ? 406 : 200)
    res.send(err || 'DONE')
  })
})



app.post('/post/create', upload.single('image'), async (req, res) => {
  const file = req?.file
  const title = req?.body?.string[0]
  const location = req?.body?.string[1]
  const description = req?.body?.string[2]

  const query = 'INSERT INTO posts (imageKey, location, title, description) VALUE (?, ?, ?, ?)'

  let uploadResult = undefined

  if (file) {
    uploadResult = await uploadImage(file)
    await unlinkFile(file.path)
  }

  db.query(query, [uploadResult.Key, location, title, description], (err, result) => {
    res.status(err ? 500 : 200)
    res.send(err || 'OK')
  })
})

app.get('/post/getAll', (req, res) => {
  const query = 'SELECT * FROM posts'

  db.query(query, (err, result) => {
    res.send(result)
  })
})

app.post('/post/remove', async (req, res) => {
  const {key} = req?.body

  const query = 'DELETE FROM posts WHERE imageKey = ?'

  await removeImage(key)

  db.query(query, [key], (err, result) => {
    res.status(err ? 500 : 200)
    res.send(err || 'OK')
  })
})