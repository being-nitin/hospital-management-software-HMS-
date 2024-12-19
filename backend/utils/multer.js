const multer = require('multer')

const storage = multer.memoryStorage();

const multiUpload = multer({ storage })

module.exports = multiUpload;