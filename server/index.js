const http = require('http')
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const httpServer = http.createServer(app)

app.use(cors())
app.use(express.static(path.join(__dirname, 'client')))

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on('connection', (socket) => {
  const users = []
  for (const [id, s] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: s.username,
    })
  }
  socket.emit('users', users)
})

io.use((socket, next) => {
  const { username } = socket.handshake.auth

  if (!username) {
    return next(new Error('invalid username'))
  }

  socket.username = username
  next()
})

const port = 5000

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
