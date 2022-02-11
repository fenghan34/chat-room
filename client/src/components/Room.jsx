import Chat from './Chat'
import UserList from './UserList'

function Room() {
  return (
    <div className="bg-white rounded-xl absolute inset-10 p-8 flex">
      <div className="w-1/5 min-w-54 bg-black rounded-l-md">
        <UserList />
      </div>
      <div className="flex-1 rounded-r-md ml-4 border-black border-5">
        <Chat />
      </div>
    </div>
  )
}

export default Room
