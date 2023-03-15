const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 4005
app.use(express.json())

app.post('/events', async (req, res) => {
    const event = req.body
    try {
        await axios.post("http://localhost:4000/events", event)
        await axios.post("http://localhost:4001/events", event)
        //await axios.post("http://localhost:4002/events", event)
        res.send({ status: 'OK' })
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
})