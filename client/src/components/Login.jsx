import { useStore } from '../store'
import Form from './Form'

function Login() {
  const { dispatch } = useStore()

  return (
    <div className="h-full flex items-center justify-center">
      <Form
        onSubmit={(payload) => dispatch({ type: 'login', payload })}
        placeholder="Your message..."
        buttonTxt="Send"
      />
    </div>
  )
}

export default Login
