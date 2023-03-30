import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Home from './pages/Home'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedIn } from './store/auth/authSlice'
import Header from './components/Header'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
function App() {
  const { user,isLoading } = useSelector(e => e.Auth)
  const {theme} = useSelector(e => e.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoggedIn())
    
  }, []);



  const CheckAuth = ({ children }) => {
    if (user == null) {
      return <Navigate to='/login' />
    } else {
      return children
    }
  }
  const CheckNotAuth = ({ children }) => {
    if (user != null) {
      return <Navigate to='/' />
    } else {
      return (children)
    }
  }
  return (
    <div className={theme}>
    <div className=' w-full min-h-screen dark:bg-slate-900 bg-[#eee] '>
      <BrowserRouter>
      {isLoading&&<Loading />}
      {user&&<Header />}
        <Routes>
          <Route path='/' element={<CheckAuth><Home /></CheckAuth>} />
          {/* <Route path='/settings' element={<CheckAuth><Settings /></CheckAuth>} /> */}
          <Route path='/profile/:name/:userId' element={<CheckAuth><Profile /></CheckAuth>} />
          <Route path='/settings' element={<CheckAuth><Settings /></CheckAuth>} />
          <Route path='/login' element={<CheckNotAuth><SignIn /></CheckNotAuth>} />
          <Route path='/register' element={<CheckNotAuth><Register /></CheckNotAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  )
}

export default App
