const express = require('express')

const slotRoute = express.Router()

slotRoute.post('/create', async (req, res) => {
    try {
        res.send('Here we will post slot')
    } catch (err) {
        res.send({ 'msg': 'No slot avelable' })
        console.log(err)
    }
})

module.exports = {
    slotRoute
}