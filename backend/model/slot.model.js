const mongoose = require('mongoose')

const slotSchema = mongoose.Schema({
    slotName: String,
    totalSlot: Array,
    avelableSlot: Array,
    bookedSlot: Array
})

const slotModel = mongoose.model('slots', slotSchema)

module.exports = {
    slotModel
}