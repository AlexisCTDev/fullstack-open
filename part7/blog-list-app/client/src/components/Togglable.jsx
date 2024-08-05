import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef(({ buttonLabel, children, afterCancel }, refs) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const handleCancel = () => {
    toggleVisibility()

    if (afterCancel) afterCancel()
  }

  return (
    <article>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <Button type='button' variant='outlined' onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>

      <div style={{ display: isVisible ? '' : 'none' }}>
        {children}
        <Button type='button' variant='outlined' onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </article>
  )
})

export default Togglable
