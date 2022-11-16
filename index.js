require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/upload', (req, res) => {
  const fileName = req.headers['file-name']
  const fileDir = `./files`
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true })
  }
  req.on('data', chunk => {
    fs.appendFileSync(`${fileDir}/${fileName}`, chunk)
  })
  return res.status(200).json({
    message: 'File uploaded successfully.'
  })
})

PORT = process.env.PORT || 8100
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
