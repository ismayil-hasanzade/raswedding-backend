const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|mov|avi|mkv/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if (extname) {
        cb(null, true)
    } else {
        cb(new Error('Yalnız video fayllara icazə verilir!'))
    }
}

const uploadVideo = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB limit
})

module.exports = uploadVideo