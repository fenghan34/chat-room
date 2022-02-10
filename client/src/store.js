import { createContext, useContext } from 'react'

export const Context = createContext({})

export const initialContext = {
  users: [],
}

export const reducer = (state, action) => {
  if (!(action instanceof Object)) {
    throw new Error('invalid dispatch')
  }

  console.log('dispatch', action)

  const { type, payload } = action

  switch (type) {
    case 'login':
      return { ...state, username: payload }
    case 'addUser':
      return { ...state, users: payload }
    default:
      throw new Error('invalid dispatch type')
  }
}

export const useStore = () => useContext(Context)
