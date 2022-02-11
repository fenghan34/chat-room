import { useMemo, useReducer } from 'react'
import Login from './components/Login'
import Room from './components/Room'
import { Context, initialContext, reducer } from './store'
import useSocket from './useSocket'

function App() {
  const [state, dispatch] = useReducer(reducer, initialContext)

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state])

  useSocket(contextValue)

  return (
    <div className="bg-dark-700 h-full">
      <Context.Provider value={contextValue}>
        {!state.username ? <Login /> : <Room />}
      </Context.Provider>
    </div>
  )
}

export default App
