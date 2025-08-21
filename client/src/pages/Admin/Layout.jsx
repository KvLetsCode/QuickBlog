import { assets } from '../../assets/assets'
import { Outlet} from 'react-router-dom'
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from '../../context/AppContext';



const Layout = () => {
  

  const { axios, setToken, navigate } =useAppContext()

  const logout = () => { 
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = null
    setToken(null)
    navigate('/')
  }
  
  return (
    <>
      <div className='flex justify-between items-center border-b border-gray-200 py-2 h-[70px] px-4 sm:px-12'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/')} />
        <button onClick={logout} className='text-sm bg-primary text-white rounded-full px-8 py-2 cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        {<Outlet />}

      </div>
          
    </>
  )
}

export default Layout