import { Outlet } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import TogglableLoginForm from './LoginForm/TogglableLoginForm'
import Nav from './Nav'
import TogglableNewBlogForm from './NewBlogForm/TogglableNewBlogForm'
import Notification from './Notification'
import { Button, Container } from '@mui/material'

export default function MainLayout () {
  const { loggedUser, signOut } = useLogin()

  return (
    <Container maxWidth='lg'>
      <Nav />
      <h1>Blog app</h1>
      <Notification />
      {loggedUser && (
        <div>
          <p>
            {loggedUser.name} logged in{' '}
            <Button variant='outlined' color='error' onClick={signOut}>
              Logout
            </Button>
          </p>
        </div>
      )}
      {!loggedUser ? <TogglableLoginForm /> : <TogglableNewBlogForm />}

      <Outlet />
    </Container>
  )
}
