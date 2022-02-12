import { produce } from 'immer'
import { useStore } from '../store'
import { socket } from '../useSocket'
import Form from './Form'
import MessagePanel from './MessagePanel'

function Chat() {
  const { selectedUser, dispatch } = useStore()

  if (!selectedUser) return null

  const onSubmit = (content) => {
    socket.emit('private message', {
      content,
      to: selectedUser.userID,
    })

    const payload = produce(selectedUser, (draft) => {
      if (!draft.messages) {
        draft.messages = []
      }
      draft.messages.push({ content, fromSelf: true })
    })

    dispatch({
      type: 'updateSelectedUser',
      payload,
    })
  }

  return (
    <div className="relative h-full flex flex-col">
      <div className="border-black border-b-5 text-2xl bg-white p-2">
        {selectedUser.username}
      </div>
      <div className="h-4/5">
        <MessagePanel />
      </div>
      <div className="flex-1 p-4 bg-black">
        <Form
          onSubmit={onSubmit}
          placeholder="Your message..."
          buttonTxt="Send"
        />
      </div>
    </div>
  )
}

export default Chat
