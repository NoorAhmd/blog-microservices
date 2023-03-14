const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
const PORT = 4001

app.use(express.json())
app.use(cors())

const commentsByPostID = {}

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    res.status(200).send(commentsByPostID[id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentID = randomBytes(4).toString('hex')
    const { content } = req.body
    const { id } = req.params
    const comments = commentsByPostID[id] || []
    comments.push({ id: commentID, content })
    commentsByPostID[id] = comments
    res.status(201).send(comments)
})

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
})
