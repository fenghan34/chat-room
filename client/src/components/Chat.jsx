import { produce } from 'immer'
import { useState } from 'react'
import { useStore } from '../store'
import { socket } from '../useSocket'

function Chat() {
  const { selectedUser, dispatch } = useStore()

  if (!selectedUser) return null

  return (
    <div className="relative h-full">
      <div className="border-black border-b-5 text-2xl bg-white p-2">
        {selectedUser.username}
      </div>
      <div className="p-2">123</div>
      <div className="absolute bottom-0 inset-x-0 p-4 bg-black">
        <Form
          onSubmit={(content) => {
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
          }}
        />
      </div>
    </div>
  )
}

function Form({ onSubmit }) {
  const [value, setValue] = useState('')

  return (
    <div className="flex">
      <input
        type="text"
        value={value}
        placeholder="Your message..."
        className="border-black border p-2 rounded flex-1"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="button"
        className="bg-white px-4 py-2 ml-4 rounded hover:bg-green-300"
        onClick={() => {
          if (!value) return

          onSubmit(value)
          setValue('')
        }}
      >
        Send
      </button>
    </div>
  )
}

export default Chat
