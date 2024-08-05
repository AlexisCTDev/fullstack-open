import LoginForm from './LoginForm'
import Togglable from '../Togglable'

export default function TogglableLoginForm () {
  return (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )
}
