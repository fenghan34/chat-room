import { useState } from 'react'
import { useStore } from './store'

function Login() {
  const [username, setUsername] = useState('')
  const { dispatch } = useStore()

  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-4 bg-white">
        <input
          type="text"
          value={username}
          maxLength={15}
          placeholder="Your username..."
          className="border rounded-md py-2 px-4"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="button"
          disabled={!username}
          className={`bg-gray-300 ml-4 px-4 py-2 rounded-md ${
            username ? 'hover:(bg-black text-white)' : 'cursor-not-allowed'
          }`}
          onClick={() => dispatch({ type: 'login', payload: username })}
        >
          Enter
        </button>
      </div>
    </div>
  )
}

export default Login
