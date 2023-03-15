const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
const PORT = 4001

app.use(express.json())
app.use(cors())

const commentsByPostID = {}

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    res.status(200).send(commentsByPostID[id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentID = randomBytes(4).toString('hex')
    const { content } = req.body
    const { id } = req.params
    const comments = commentsByPostID[id] || []
    comments.push({ id: commentID, content })
    commentsByPostID[id] = comments
    try {
        await axios.post('http://localhost:4005/events', { type: 'CommentCreated', data: { id: commentID, content, postID: id } })
        res.status(201).send(comments)
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
