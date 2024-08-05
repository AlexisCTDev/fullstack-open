import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import User from './components/Users/User'
import BlogOfUser from './pages/BlogOfUser'
import Page404 from './pages/Page404'
import MainLayout from './components/MainLayout'

export default function App () {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:id' element={<User />} />
        <Route path='blogs/:id' element={<BlogOfUser />} />
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}
