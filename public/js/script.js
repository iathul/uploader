const upload = document.getElementById('upload')
const output = document.getElementById('output')
const file = document.getElementById('file')

upload.addEventListener('click', () => {
  const fileReader = new FileReader()
  const newFile = file.files[0]
  fileReader.onload = async event => {
    const CHUNK_SIZE = 1000
    const chunkCount = event.target.result.byteLength / CHUNK_SIZE
    console.log('Read successfully')
    const fileName = Math.random() * 1000 + newFile.name
    for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
      const chunk = event.target.result.slice(
        chunkId * CHUNK_SIZE,
        chunkId * CHUNK_SIZE + CHUNK_SIZE
      )
      await fetch('http://localhost:8100/upload', {
        method: 'POST',
        headers: {
          'content-type': 'application/octet-stream',
          'content-length': chunk.length,
          'file-name': fileName
        },
        body: chunk
      })
      output.textContent = Math.round((chunkId * 100) / chunkCount, 0) + '%'
    }
    console.log(event.target.result.byteLength)
  }
  fileReader.readAsArrayBuffer(newFile)
})
