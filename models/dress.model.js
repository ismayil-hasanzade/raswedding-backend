const mongoose = require('mongoose')

const DressSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    image: {type:String,required: true},
    material: {type:String,required: true},
    sizes: {type:[String],required: true},
    popularity: {type: Boolean , default: false},
}, { timestamps: true })

module.exports = mongoose.model('Dress', DressSchema)