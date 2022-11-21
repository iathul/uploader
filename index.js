require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

app.use(express.static(path.join(__dirname, 'public')))

const fileDir = `./files`
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir, { recursive: true })
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/upload', async (req, res) => {
  const fileName = req.headers['file-name'],
    chunkId = req.headers['chunk-id'],
    chunkCount = req.headers['chunk-count']

  req.on('data', chunk => {
    fs.appendFileSync(`${fileDir}/${fileName}`, chunk)
  })

  if (chunkId === chunkCount) {
    const filePath = `${__dirname}/files/${fileName}`,
      result = await cloudinary.v2.uploader.upload(filePath, {
        folder: 'project-uploader'
      })
    fs.unlinkSync(filePath)
    return res.status(200).json({
      message: 'Image save to cloudinary successfully.',
      result: result
    })
  } else {
    return res.status(200).json({
      message: 'Chunk received successfully.'
    })
  }
})

PORT = process.env.PORT || 8100
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
