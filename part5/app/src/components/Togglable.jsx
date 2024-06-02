import { useState, forwardRef, useImperativeHandle } from 'react'

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
        <button type='button' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>

      <div style={{ display: isVisible ? '' : 'none' }}>
        {children}
        <button type='button' onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </article>
  )
})

export default Togglable
