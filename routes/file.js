const router = require('express').Router()
const {uploadFiles} = require('../controllers/file')

router.post('/upload', uploadFiles);

module.exports = router
