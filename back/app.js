const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const jwt = require('jsonwebtoken')
const mysql2 = require('mysql2')
const db = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '1963',
  database: 'latvia_blog'
})

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Server started on port', process.env.PORT))

app.post('/auth/register', (req, res) => {
  const {pseudo, mail, password} = req?.body
  const query = 'INSERT INTO users (pseudo, mail, password) VALUE (?, ?, ?)'

  db.query(query, [pseudo, mail, password], (err, result) => {
    res.status(err ? 406 : 200)
    res.send(err ? err?.code : jwt.sign(result.insertId, process.env.TOKEN_SECRET))
  })
})

app.post('/auth/login', (req, res) => {
  const {pseudo, password} = req?.body
  const query = 'SELECT * FROM users WHERE FIND_IN_SET(?,pseudo)'

  db.query(query, [pseudo], (err, result) => {
    if (err || !result?.length) {
      res.status(406)
      res.send(err?.code || 'No result')
    }
    if (result[0]?.password === password) {
      res.status(200)
      res.send(jwt.sign(result[0]?.id, process.env.TOKEN_SECRET))
    }
  })
})