const http = require('http')

const server = http.createServer((req, res) => {
    debugger
    res.writeHead(404, { 'Content-Type': 'text/html' })

    res.end('<html><head><title>not found</title></head><body><h1>not found</h1></body></html>')
})

server.listen(8000)