const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Fayl tipi əsaslı storage ayırması
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileType = file.mimetype.startsWith('video') ? 'videos' : 'images'
        const uploadPath = path.join(__dirname, '..', 'uploads', fileType)

        // Əgər qovluq yoxdursa, yaradırıq
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }

        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

module.exports = upload