const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to car parking reservation system')
})


app.listen(4500, () => {
    console.log('Server is running at port 4500')
})