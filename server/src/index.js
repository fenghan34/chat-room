const http = require('http')
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const httpServer = http.createServer(app)

app.use(cors())
app.use(express.static(path.join(__dirname, 'client')))

require('./socket')(httpServer)

const port = 5000

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
