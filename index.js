require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

app.use(express.static(path.join(__dirname, 'public')))



// Home Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.use('/api/file', require('./routes/file'))

PORT = process.env.PORT || 8100
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
