import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/Admin/Layout'
import AddBlog from './pages/Admin/AddBlog'
import ListBlog from './pages/Admin/ListBlog'
import Comments from './pages/Admin/Comments'
import Dashboard from './pages/Admin/Dashboard'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'



const App = () => {

  const {token} = useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/admin' element={token ? <Layout />:<Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='ListBlog' element={<ListBlog />} />
          <Route path='comment' element ={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App