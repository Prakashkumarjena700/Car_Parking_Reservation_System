const express = require('express')
const { requestModel } = require('../model/request.model')

const requestRoute = express.Router()

requestRoute.get('/', async (req, res) => {
    try {
        res.send('Here we will see all the request')
    } catch (err) {
        res.send('Error')
        console.log(err)
    }
})

requestRoute.post('/create', async (req, res) => {
    try {
        const request = new requestModel(req.body)
        await request.save()
        res.send({ "msg": "Request has been created", "sucess": true })

    } catch (err) {
        res.send({ "msg": "Request not created", "sucess": false })
        console.log(err)
    }
})

module.exports = {
    requestRoute
}