import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

export function useNotificationValue () {
  const { notification } = useContext(NotificationContext)
  return notification
}

export function useNotificationDispatch () {
  const { setNotification } = useContext(NotificationContext)
  return setNotification
}
