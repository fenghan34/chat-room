const http = require('http')
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
const httpServer = http.createServer(app)

app.use(cors())
app.use('/', express.static('client'))

const io = new Server(httpServer, {
  origin: 'http://localhost:3000',
})

io.on('connection', (socket) => {
  console.log(socket)
})

const port = 5000

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
