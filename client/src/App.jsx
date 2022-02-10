import { useMemo, useReducer } from 'react'
import Login from './Login'
import { Context, initialContext, reducer } from './store'
import useSocket from './useSocket'

function App() {
  const [state, dispatch] = useReducer(reducer, initialContext)

  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  )

  useSocket(contextValue)

  const { username } = state

  return (
    <div className="bg-dark-700 h-full">
      <Context.Provider value={contextValue}>
        {!username ? <Login /> : null}
      </Context.Provider>
    </div>
  )
}

export default App
