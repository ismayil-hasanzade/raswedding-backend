const express = require('express')
const path = require('path')
const cors = require('cors')

const dressesRoutes = require('./routes/dresses.routes')
const heroRoutes = require('./routes/hero.routes')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// 🛠️ Static file serving:
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')))
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads', 'videos')))

// API Routes
app.use('/api/dresses', dressesRoutes)
app.use('/api/hero', heroRoutes)

// Test Route
app.get('/', (req, res) => {
    res.send('Raswedding API işləyir ✅')
})

module.exports = app