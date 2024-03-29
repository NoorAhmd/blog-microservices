const express = require("express")
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 4000

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)

})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = { id, title }
    try {
        await axios.post('http://localhost:4005/events', { type: 'PostCreated', data: { id, title } })
        res.status(201).send(posts[id])
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error)
    }

})

app.post('/events', (req, res) => {
    console.log("Recieved Event", req.body.type);
    res.send({})
})

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
})

