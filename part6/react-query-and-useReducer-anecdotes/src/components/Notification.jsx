import { useNotificationValue } from '../hooks/useNotification'

export default function Notification () {
  const notification = useNotificationValue()

  if (!notification) return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}
