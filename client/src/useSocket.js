import { useEffect } from 'react'
import { io } from 'socket.io-client'

const URI = 'http://localhost:5000'
export const socket = io(URI, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

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
      const payload = [...users]

      payload.forEach((user) => {
        if (user.userID === socket.userID) {
          user.self = true
        }
      })

      dispatch({ type: 'updateUsers', payload })
    })

    socket.on('user connected', (user) => {
      // const index = users.findIndex(({ userID }) => userID === user.userID)
      // let payload
      // if (index >= 0) {
      //   payload = produce(users, (draft) => {
      //     draft[index].connected = true
      //   })
      // } else {
      //   payload = [...users, user]
      // }
      // dispatch({ type: 'updateUsers', payload })
    })

    socket.on('private message', (context) => {
      dispatch({ type: 'receiveMessage', payload: context })
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [dispatch, users])

  useEffect(() => {
    if (username) {
      const sessionID = localStorage.getItem('sessionID')

      socket.auth = { username, sessionID }
      socket.connect()

      socket.on('session', ({ sessionID, userID }) => {
        socket.auth = { sessionID }
        localStorage.setItem('sessionID', sessionID)
        socket.userID = userID
      })
    }
  }, [username])
}

export default useSocket
