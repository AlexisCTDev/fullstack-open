import { Button, TextField } from '@mui/material'
import { useAppDispatch } from '../../hooks/store'
import { useField } from '../../hooks/useField'
import { useLogin } from '../../hooks/useLogin'
import { addComment } from '../../redux/slices/commentSlice'
import { showNotification } from '../../redux/slices/notifySlice'

export default function CommentForm ({ blogId }) {
  const comment = useField('text')
  const dispatch = useAppDispatch()
  const { loggedUser } = useLogin()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!loggedUser) {
      return dispatch(showNotification('You have not logged in', 'error'))
    }

    const newComment = {
      comment: comment.value
    }

    dispatch(addComment(newComment, blogId))
    comment.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...comment}
        id='outlined-basic'
        label='enter you comment here'
        variant='outlined'
      />
      <Button type='submit' variant='contained'>
        add comment
      </Button>
    </form>
  )
}
