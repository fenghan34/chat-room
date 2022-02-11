import { produce } from 'immer'
import { createContext, useContext } from 'react'

export const Context = createContext({})

export const initialContext = {
  username: '',
  selectedUser: null,
  users: [],
}

export const useStore = () => useContext(Context)

export const reducer = (state, action) => {
  if (!(action instanceof Object)) {
    throw new Error('invalid dispatch')
  }

  const { type, payload } = action

  switch (type) {
    case 'login':
      return { ...state, username: payload }
    case 'setSelfStatus':
      return setSelfStatus(state, payload)
    case 'updateUsers':
      return updateUsers(state, payload)
    case 'updateSelectedUser':
      return { ...state, selectedUser: payload }
    case 'receiveMessage':
      return receiveMessage(state, payload)
    default:
      throw new Error('invalid dispatch type')
  }
}

const setSelfStatus = (state, payload) => {
  return produce(state, (draft) => {
    const selfIndex = draft.users.findIndex((self) => !!self)

    const self = draft.users[selfIndex]

    if (self) {
      self.connected = payload
    }
  })
}

const updateUsers = (state, payload) => {
  payload.sort((a, b) => {
    if (a.self) return -1
    if (b.self) return 1
    if (a.username < b.username) return -1
    return a.username > b.username ? 1 : 0
  })

  return { ...state, users: payload }
}

const receiveMessage = (state, payload) => {
  const { users, selectedUser } = state
  const { content, from } = payload

  const sender = users.find(({ userID }) => userID === from)

  if (!sender.messages) {
    sender.messages = []
  }

  sender.messages.push({
    content,
    fromSelf: false,
  })

  if (!selectedUser || sender.userID !== selectedUser.userID) {
    sender.hasNewMessages = true
  }

  return {
    ...state,
    users: users
      .filter(({ userID }) => userID !== sender.userID)
      .concat(sender),
  }
}
