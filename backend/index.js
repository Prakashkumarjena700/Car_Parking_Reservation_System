const express = require('express')
const { connection } = require('mongoose')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to car parking reservation system')
})


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Connected to DB')
    } catch (err) {
        console.log('Not connected to DB')
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.port}`)
})