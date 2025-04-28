const express = require('express')
const router = express.Router()
const { getAllDresses, createDress, updateDress, deleteDress, getDressById, getPopularDresses } = require('../controllers/dresses.controller')
const upload = require('../middlewares/upload')

router.get('/popular', getPopularDresses)
router.get('/', getAllDresses)
router.post('/', upload.single('image'), createDress)
router.get('/:id', getDressById)
router.put('/:id', upload.single('image'), updateDress)
router.delete('/:id', deleteDress)

module.exports = router