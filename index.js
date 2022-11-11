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
  req.on('data', chunk => {
    fs.appendFileSync(fileName, chunk)
    console.log(`received chunk! ${chunk.length}`)
  })
  res.end('uploaded!')
})

PORT = process.env.PORT || 8100
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
