import { createContext, useReducer } from 'react'

function notificationReducer (state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationContext = createContext()

export default function NotifiationContextProvider ({ children }) {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const setNotification = (message, timeout = 3000) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
