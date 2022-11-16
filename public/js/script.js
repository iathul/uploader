const upload = document.getElementById('upload')
var fileSelect = document.getElementById('file-upload')
var newFile
fileSelect.addEventListener('change', e => {
  newFile = e.target.files[0]
  if (newFile) {
    document.getElementById('start').classList.add('hidden')
    document.getElementById('response').classList.remove('hidden')
    document.getElementById('file-image').classList.remove('hidden')
    document.getElementById('file-image').src = URL.createObjectURL(newFile)
    document.getElementById('notimage').classList.add('hidden')
    document.getElementById('messages').innerHTML = `<strong> ${encodeURI(
      newFile.name
    )} </strong>`
  }
})

upload.addEventListener('click', e => {
  e.preventDefault()
  document.getElementById('progress-grp').classList.remove('hidden')
  const fileReader = new FileReader()
  fileReader.onload = async event => {
    const CHUNK_SIZE = 1000
    const chunkCount = Math.round(event.target.result.byteLength / CHUNK_SIZE,0)
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
      document.getElementById('file-progress').value = Math.round(
        (chunkId * 100) / chunkCount,
        0
      )
      document.getElementById('progress-text').textContent =
        Math.round((chunkId * 100) / chunkCount, 0) + '%'
    }
  }
  fileReader.readAsArrayBuffer(newFile)
})
