import { useState } from 'react'

export default function LoginForm ({ onSumbit }) {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = ({ target }) => {
    setUserCredentials({
      ...userCredentials,
      [target.name]: target.value
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    onSumbit(userCredentials)
  }

  return (
    <article>
      <h2>Loggin into application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              name='username'
              value={userCredentials.username}
              onChange={handleChange}
              data-testid='username'
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type='password'
              name='password'
              value={userCredentials.password}
              onChange={handleChange}
              data-testid='password'
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </article>
  )
}
