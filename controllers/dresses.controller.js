const Dress = require('../models/dress.model')
const buildFullUrl = (req, path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${req.protocol}://${req.get('host')}${path}`
}

const getAllDresses = async (req, res) => {
    try {
        const dresses = await Dress.find()

        // 🔥 Hər gəlinlik üçün şəkil urlini tam qur
        const formattedDresses = dresses.map(dress => ({
            ...dress._doc,
            image: buildFullUrl(req, dress.image)
        }))

        res.json(formattedDresses)
    } catch (err) {
        res.status(500).json({ message: 'Xəta baş verdi' })
    }
}

const createDress = async (req, res) => {
    try {
        let sizes = req.body.sizes
        if (typeof sizes === 'string') {
            sizes = sizes.split(',')
        }
        const dress = new Dress({
            title: req.body.title,
            description: req.body.description,
            material: req.body.material,
            sizes: sizes,
            popularity: req.body.popularity === 'true',
            image: req.file ? `/uploads/images/${req.file.filename}` : ''
        })

        await dress.save()

        // 🔥 Yaradılan gəlinliyin şəkil yolunu tam URL-ə çevir
        res.status(201).json({
            message: 'Gəlinlik uğurla əlavə edildi ✅',
            data: {
                ...dress._doc,
                image: buildFullUrl(req, dress.image)
            }
        })
    } catch (err) {
        res.status(400).json({ message: 'Əlavə edilə bilmədi', error: err.message })
    }
}

const updateDress = async (req, res) => {
    try {
        const updateData = {}
        if (req.body.title) updateData.title = req.body.title
        if (req.body.description) updateData.description = req.body.description
        if (req.body.material) updateData.material = req.body.material
        if (req.body.popularity !== undefined) updateData.popularity = req.body.popularity === 'true'
        if (req.body.sizes) {
            if (Array.isArray(req.body.sizes)) {
                updateData.sizes = req.body.sizes
            } else {
                updateData.sizes = req.body.sizes.split(',')
            }
        }
        if (req.file) {
            updateData.image = `/uploads/images/${req.file.filename}`
        }
        const updatedDress = await Dress.findByIdAndUpdate(req.params.id, updateData, { new: true })
        if (!updatedDress) return res.status(404).json({ message: 'Gəlinlik tapılmadı' })

        res.json({ message: 'Gəlinlik uğurla yeniləndi ✅', data: updatedDress })
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'Yeniləmə xətası', error: err.message })
    }
}
const deleteDress = async (req, res) => {
    try {
        const deletedDress = await Dress.findByIdAndDelete(req.params.id)
        if (!deletedDress) return res.status(404).json({ message: 'Gəlinlik tapılmadı' })
        res.json({ message: 'Gəlinlik silindi ✅' })
    } catch (err) {
        res.status(400).json({ message: 'Silinmə xətası', error: err.message })
    }
}
const getDressById = async (req, res) => {
    try {
        const dress = await Dress.findById(req.params.id)
        if (!dress) return res.status(404).json({ message: 'Gəlinlik tapılmadı' })

        res.json({
            ...dress._doc,
            image: buildFullUrl(req, dress.image)
        })
    } catch (err) {
        res.status(400).json({ message: 'Səhv ID və ya server xətası', error: err.message })
    }
}
const getPopularDresses = async (req, res) => {
    try {
        const dresses = await Dress.find({ popularity: true })

        const formattedDresses = dresses.map(dress => ({
            ...dress._doc,
            image: buildFullUrl(req, dress.image)
        }))

        res.json(formattedDresses)
    } catch (err) {
        res.status(500).json({ message: 'Populyar gəlinliklər alınmadı', error: err.message })
    }
}

module.exports = {
    getAllDresses,
    createDress,
    updateDress,
    deleteDress,
    getDressById,
    getPopularDresses
}