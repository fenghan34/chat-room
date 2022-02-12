import { produce } from 'immer'
import { createContext, useContext } from 'react'

export const Context = createContext({})

export const initialContext = {
  username: '',
  selectedUser: null,
  users: [],
}

export const useStore = () => useContext(Context)

export const reducer = produce((draft, action) => {
  if (!(action instanceof Object)) {
    throw new Error('invalid dispatch')
  }

  const { type, payload } = action

  switch (type) {
    case 'login':
      draft.username = payload
      break
    case 'setSelfStatus':
      setSelfStatus(draft, payload)
      break
    case 'updateUsers':
      updateUsers(draft, payload)
      break
    case 'updateSelectedUser':
      updateSelectedUser(draft, payload)
      break
    case 'receiveMessage':
      receiveMessage(draft, payload)
      break
    default:
      throw new Error('invalid action type')
  }
})

const setSelfStatus = (draft, payload) => {
  const selfIndex = draft.users.findIndex((self) => !!self)

  const self = draft.users[selfIndex]

  if (self) {
    self.connected = payload
  }
}

const updateSelectedUser = (draft, payload) => {
  draft.selectedUser = payload

  if (payload) {
    const users = draft.users
    const index = users.findIndex(({ userID }) => userID === payload.userID)
    users[index] = payload
  }
}

const updateUsers = (draft, payload) => {
  const users = [...payload]
  users.sort((a, b) => {
    if (a.self) return -1
    if (b.self) return 1
    if (a.username < b.username) return -1
    return a.username > b.username ? 1 : 0
  })

  draft.users = payload
}

const receiveMessage = (draft, payload) => {
  const { content, from } = payload
  const { selectedUser, users } = draft

  const index = users.findIndex((user) => user.userID === from)
  const sender = users[index]

  if (!sender.messages) {
    sender.messages = []
  }

  const message = {
    content,
    fromSelf: false,
  }

  sender.messages.push(message)

  if (!selectedUser || sender.userID !== selectedUser.userID) {
    sender.hasNewMessages = true
  } else {
    draft.selectedUser.messages.push(message)
  }
}
