const express = require('express')
const { createHero, getHero, updateHero } = require('../controllers/hero.controller')
const uploadVideo = require('../middlewares/uploadVideo')  // yeni import

const router = express.Router()

router.post('/', uploadVideo.single('video'), createHero)
router.get('/', getHero)
router.put('/', uploadVideo.single('video'), updateHero)

module.exports = router