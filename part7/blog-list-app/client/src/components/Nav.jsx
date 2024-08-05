import { AppBar, Button, Container, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Nav () {
  return (
    <AppBar>
      <Container maxWidth='lg'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
