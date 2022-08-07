require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({bucketName, region, accessKeyId, secretAccessKey})

const uploadImage = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: 'image/jpeg'
  }

  return s3.upload(uploadParams).promise()
}

const removeImage = (key) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
  }

  return s3.deleteObject(uploadParams).promise()
}

module.exports = {uploadImage, removeImage}