import { useEffect, useRef } from 'react'
import { useStore } from '../store'

function MessagePanel() {
  const { selectedUser } = useStore()
  const { messages = [] } = selectedUser

  const container = useRef(null)

  useEffect(() => {
    const el = container.current

    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={container}
      className="text-lg h-full px-6 overflow-y-auto overflow-x-hidden"
    >
      {messages.map(({ content, fromSelf }, i) => (
        <div
          key={i}
          className={`py-2 ${fromSelf ? 'text-right' : 'text-left'}`}
        >
          {content}
        </div>
      ))}
    </div>
  )
}

export default MessagePanel
