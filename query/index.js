const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4002
app.use(express.json())
app.use(cors())


app.post('/posts', (req, res) => {

})

app.get('/events', (req, res) => {

})

app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
})