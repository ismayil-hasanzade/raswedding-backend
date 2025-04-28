const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    video: { type: String },
    content1: { type: String, required: true },
    content2: { type: String, required: true }
})

const Hero = mongoose.model('Hero', heroSchema)
module.exports = Hero