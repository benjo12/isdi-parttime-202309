const express = require('express')
const cors = require('cors')

const server = express()

server.use(cors())

server.get('/', (_, res) => {
    res.send('hola mundo')
})

server.listen(8080, () => console.log('server up'))