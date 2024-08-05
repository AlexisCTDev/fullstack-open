import { useField } from '../../hooks/useField'
import { useLogin } from '../../hooks/useLogin'
import { Button, TextField } from '@mui/material'

export default function LoginForm () {
  const { signIn } = useLogin()
  const username = useField('text')
  const password = useField('text')

  const handleLogin = async (event) => {
    event.preventDefault()
    signIn({
      username: username.value,
      password: password.value
    })
  }

  return (
    <article>
      <h2>Loggin into application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            {...username}
            id='outlined-basic'
            label='username'
            variant='outlined'
            data-testid='username'
          />
        </div>
        <div>
          <TextField
            {...password}
            id='outlined-basic'
            label='password'
            variant='outlined'
            data-testid='password'
          />
        </div>
        <Button type='submit' variant='contained'>
          Login
        </Button>
      </form>
    </article>
  )
}
