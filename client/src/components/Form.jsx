import { useEffect, useRef, useState } from 'react'

function Form({ onSubmit, placeholder, buttonTxt }) {
  const [value, setValue] = useState('')

  const input = useRef()

  useEffect(() => {
    input.current.focus()
  }, [])

  const submit = () => {
    if (!value) return

    onSubmit(value)
    setValue('')
  }

  return (
    <div className="flex">
      <input
        ref={input}
        type="text"
        value={value}
        placeholder={placeholder}
        className="border-black border px-4 py-2 rounded flex-1"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <button
        type="button"
        className="bg-white px-4 py-2 ml-4 rounded hover:bg-green-300"
        onClick={submit}
      >
        {buttonTxt}
      </button>
    </div>
  )
}

export default Form
