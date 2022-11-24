const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary')

// Create files dir
const fileDir = `./files`
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir, { recursive: true })
}

exports.uploadFiles = async (req, res) => {
  try {
    const fileName = req.headers['file-name'],
      chunkId = req.headers['chunk-id'],
      chunkCount = req.headers['chunk-count']

    req.on('data', chunk => {
      fs.appendFileSync(`${fileDir}/${fileName}`, chunk)
    })

    if (chunkId === chunkCount) {
      const filePath = path.resolve('files', fileName),
        result = await cloudinary.v2.uploader.upload(filePath, {
          folder: 'project-uploader'
        })
      fs.unlinkSync(filePath)
      return res.status(200).json({
        message: 'Image saved to cloudinary successfully.',
        result: result
      })
    } else {
      return res.status(200).json({
        message: 'Chunk received successfully.'
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}
