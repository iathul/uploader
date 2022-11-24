const upload = document.getElementById('upload')
var fileSelect = document.getElementById('file-upload'),
  fileDrag = document.getElementById('file-drag')

var newFile
fileDrag.addEventListener('dragover', fileDragHover, false)
fileDrag.addEventListener('dragleave', fileDragHover, false)
fileDrag.addEventListener('drop', fileSelectHandler, false)

function fileDragHover(e) {
  var fileDrag = document.getElementById('file-drag')
  e.stopPropagation()
  e.preventDefault()
  fileDrag.className =
    e.type === 'dragover' ? 'hover' : 'modal-body file-upload'
}

function fileSelectHandler(e) {
  var file = e.target.files || e.dataTransfer.files
  fileDragHover(e)
  for (var i = 0, f; (f = file[i]); i++) {
    parseFile(f)
    newFile = f
  }
}

function parseFile(file) {
  var imageName = file.name
  var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName)
  if (isGood) {
    document.getElementById('start').classList.add('hidden')
    document.getElementById('response').classList.remove('hidden')
    document.getElementById('file-image').classList.remove('hidden')
    document.getElementById('file-image').src = URL.createObjectURL(file)
    document.getElementById('notimage').classList.add('hidden')
    document.getElementById('upload').classList.remove('hidden')
    document.getElementById('messages').innerHTML = `<strong> ${encodeURI(
      file.name
    )} </strong>`
  } else {
    document.getElementById('file-image').classList.add('hidden')
    document.getElementById('select-img').classList.add('hidden')
    document.getElementById('notimage').classList.remove('hidden')
    document.getElementById('start').classList.remove('hidden')
    document.getElementById('response').classList.add('hidden')
    document.getElementById('file-upload-form').reset()
  }
}

fileSelect.addEventListener('change', e => {
  newFile = e.target.files[0]
  if (newFile) {
    parseFile(newFile)
  }
})

const { protocol, hostname, port } = window.location

// Send chunk to server
async function uploadFile(chunk, fileName, chunkId, chunkCount) {
  await fetch(`${protocol}//${hostname}:${port}/api/file/upload`, {
    method: 'POST',
    headers: {
      'content-type': 'application/octet-stream',
      'content-length': chunk.length,
      'file-name': fileName,
      'chunk-id': chunkId,
      'chunk-count': chunkCount
    },
    body: chunk
  })
}

upload.addEventListener('click', e => {
  e.preventDefault()
  document.getElementById('progress-grp').classList.remove('hidden')
  document.getElementById('upload').classList.add('hidden')
  const fileReader = new FileReader()
  fileReader.onload = async event => {
    const CHUNK_SIZE = 1000
    const chunkCount = Math.round(event.target.result.byteLength / CHUNK_SIZE)
    const fileName = `${Date.now()}_${newFile.name}`
    for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
      const chunk = event.target.result.slice(
        chunkId * CHUNK_SIZE,
        chunkId * CHUNK_SIZE + CHUNK_SIZE
      )
      await uploadFile(chunk, fileName, chunkId, chunkCount)
      var progressStat = Math.round((chunkId * 100) / chunkCount)
      document.getElementById('file-progress').value = progressStat
      document.getElementById('progress-text').textContent = `${progressStat}%`
      if (progressStat == 100) {
        document.getElementById('success').classList.remove('hidden')
      }
    }
  }
  fileReader.readAsArrayBuffer(newFile)
})
