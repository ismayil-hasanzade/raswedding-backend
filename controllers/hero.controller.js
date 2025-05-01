const Hero = require('../models/hero.model')
const path = require("path");
const fs = require("fs");

const createHero = async (req, res) => {
    try {
        const { video, content1, content2 } = req.body
        const hero = new Hero({ video, content1, content2 })
        await hero.save()
        res.status(201).json({ message: 'Hero əlavə edildi ✅', data: hero })
    } catch (err) {
        res.status(400).json({ message: 'Hero əlavə olunmadı ❌', error: err.message })
    }
}

const getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne()

        if (!hero) {
            return res.status(200).json({
                video: '',
                content1: '',
                content2: ''
            })
        }

        let videoPath = hero.video || ''

        // Yol düzəlişi: əgər `/uploads/` var, amma `/uploads/videos/` yoxdursa, düzəldək
        if (videoPath.startsWith('/uploads/') && !videoPath.startsWith('/uploads/videos/')) {
            const fileName = videoPath.split('/').pop()
            videoPath = '/uploads/videos/' + fileName
        }

        // HTTPS məcburi şəkildə əlavə olunur
        const fullVideoUrl = videoPath ? 'https://' + req.get('host') + videoPath : ''

        res.json({
            video: fullVideoUrl,
            content1: hero.content1,
            content2: hero.content2
        })
    } catch (err) {
        res.status(500).json({ message: 'Server xətası', error: err.message })
    }
}

const updateHero = async (req, res) => {
    try {
        let hero = await Hero.findOne()

        if (!hero) {
            hero = new Hero()
        }

        // Əgər yeni video yüklənirsə köhnəsini silək
        if (req.file && hero.video) {
            const oldVideoPath = path.join(__dirname, '..', hero.video)
            if (fs.existsSync(oldVideoPath)) {
                fs.unlinkSync(oldVideoPath)
            }
        }

        if (req.file) {
            hero.video = '/uploads/videos/' + req.file.filename  // 🔥 Burada düz yolu qeyd edirik
        }

        hero.content1 = req.body.content1
        hero.content2 = req.body.content2

        await hero.save()

        res.status(200).json({ message: 'Hero məlumatı yeniləndi ✅' })
    } catch (err) {
        res.status(500).json({ message: 'Xəta baş verdi', error: err.message })
    }
}

module.exports = { createHero, getHero, updateHero }