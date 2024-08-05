import { Link } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function ListOfUsers () {
  const { users } = useUsers()

  if (users.length === 0) {
    return <p>No users</p>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='List Of Users'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <span className='bold'>user</span>
            </TableCell>
            <TableCell align='center'>
              <span className='bold'>created blogs</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell align='center'>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
