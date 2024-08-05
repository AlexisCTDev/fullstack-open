import { useState } from 'react'

export function useField (name) {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputProps: {
      type: 'text',
      value,
      name,
      onChange
    },
    reset
  }
}
