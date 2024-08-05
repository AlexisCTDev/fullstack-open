import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { initializeComments } from '../../redux/slices/commentSlice'

export default function ListOfComments ({ blogId }) {
  const comments = useAppSelector((state) => state.comments)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeComments(blogId))
  }, [dispatch, blogId])

  if (comments.length === 0) return <p>No comments yet</p>

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.comment}</p>
        </li>
      ))}
    </ul>
  )
}
