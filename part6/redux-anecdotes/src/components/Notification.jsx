import { useSelector } from 'react-redux'

export function Notification () {
  const notification = useSelector((state) => state.notification)

  if (!notification) return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return <div style={style}>{notification}</div>
}
