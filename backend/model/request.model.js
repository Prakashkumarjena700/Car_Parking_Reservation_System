const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    userDetails: Object,
    place: String,
    status: String,
    entryDate: String,
    exitDate: String,
    type: String,
    price: Number,
    user: String
})

const requestModel = mongoose.model('requests', requestSchema)

module.exports = {
    requestModel
}