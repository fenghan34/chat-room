import { useStore } from '../store'

function UserList() {
  const { users } = useStore()

  return (
    <>
      <div className="text-xl font-bold text-green-400 p-4">Online Users</div>
      <div className="text-white">
        {users.map((user) => (
          <User key={user.userID} {...user} />
        ))}
      </div>
    </>
  )
}

function User(props) {
  const { username, self } = props

  const { dispatch } = useStore()

  return (
    <div
      className={`p-4 border-white border-b border-opacity-30 cursor-pointer hover:bg-gray-800`}
      onClick={() =>
        dispatch({ type: 'updateSelectedUser', payload: self ? null : props })
      }
    >
      <span className="text-lg">{username}</span>
      {self && <span>&nbsp;(me)</span>}
    </div>
  )
}

export default UserList
