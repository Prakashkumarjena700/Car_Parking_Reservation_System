const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    userDetails: Object,
    place: String,
    status: String,
    seaction: String,
    entryDate: String,
    exitDate: String,
    type: String,
    price: Number,
    review: Array,
    user: String
})

const requestModel = mongoose.model('requests', requestSchema)

module.exports = {
    requestModel
}