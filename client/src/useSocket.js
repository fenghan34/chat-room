import { useEffect } from 'react'
import { io } from 'socket.io-client'

const URI = 'http://localhost:5000'
const socket = io(URI, { autoConnect: false })

const useSocket = (context) => {
  const { username } = context

  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        throw new Error(err.message)
      }
    })

    socket.on('users', (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id
      })
    })
  }, [])

  useEffect(() => {
    if (username) {
      socket.auth = { username }
      socket.connect()
    }
  }, [username])
}

export default useSocket
