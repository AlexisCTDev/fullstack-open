import { useRef } from 'react'
import Togglable from '../Togglable'
import NewBlogForm from './NewBlogForm'

export default function TogglableNewBlogForm () {
  const newBlogFormRef = useRef()

  const onCreate = () => {
    newBlogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='Create new' ref={newBlogFormRef}>
      <NewBlogForm onCreate={onCreate} />
    </Togglable>
  )
}
