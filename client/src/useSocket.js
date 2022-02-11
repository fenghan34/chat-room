import { useEffect } from 'react'
import { io } from 'socket.io-client'

const URI = 'http://localhost:5000'
export const socket = io(URI, { autoConnect: false })

const useSocket = (context) => {
  const { username, users, dispatch } = context

  useEffect(() => {
    socket.on('connect', () => {
      dispatch({ type: 'setSelfStatus', payload: true })
    })

    socket.on('disconnect', () => {
      dispatch({ type: 'setSelfStatus', payload: false })
    })

    socket.on('connect_error', (err) => {
      console.error(err.message)
    })

    socket.on('users', (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id
      })

      dispatch({ type: 'updateUsers', payload: users })
    })

    socket.on('user connected', (user) => {
      dispatch({ type: 'updateUsers', payload: [...users, user] })
    })

    socket.on('private message', (context) => {
      dispatch({ type: 'receiveMessage', payload: context })
    })

    return () => {
      socket.offAny()
    }
  }, [dispatch, users])

  useEffect(() => {
    if (username) {
      socket.auth = { username }
      socket.connect()
    }
  }, [username])
}

export default useSocket
