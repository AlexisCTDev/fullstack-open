import { Alert } from '@mui/material'
import { useAppSelector } from '../hooks/store'

export default function Notification () {
  const notification = useAppSelector((state) => state.notify)

  if (!notification.message) return

  return <Alert severity={notification.type}>{notification.message}</Alert>
}
