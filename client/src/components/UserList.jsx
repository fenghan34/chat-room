import { useStore } from '../store'

function UserList() {
  const { users } = useStore()

  return (
    <div className="h-full flex flex-col">
      <div className="text-xl font-bold text-green-400 p-4">Online Users</div>
      <div className="text-white flex-1 overflow-y-auto">
        {users.map((user) => (
          <User key={user.userID} {...user} />
        ))}
      </div>
    </div>
  )
}

function User(props) {
  const { username, self, hasNewMessages } = props

  const { dispatch } = useStore()

  return (
    <div
      className={`p-4 border-white border-b border-opacity-30 cursor-pointer hover:bg-gray-800`}
      onClick={() =>
        dispatch({
          type: 'updateSelectedUser',
          payload: self ? null : { ...props, hasNewMessages: false },
        })
      }
    >
      <div>
        <span className="text-lg">{username}</span>
        {self && <span>&nbsp;(me)</span>}
        {hasNewMessages && (
          <span className="text-red-500 text-sm float-right">new</span>
        )}
      </div>
      <div className="text-gray-300">
        <i className="bg-green-300 inline-block w-2 h-2 rounded-full mr-2" />
        online
      </div>
    </div>
  )
}

export default UserList
