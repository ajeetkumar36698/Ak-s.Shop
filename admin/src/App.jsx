import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { Login } from './components/Login'

import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency='₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')


  useEffect(() => {
    localStorage.setItem('token', token)

  })




  return (
    <div className='bg-gray-50 min-h-'>
      <ToastContainer />
      {token === ''
        ? <Login setToken={setToken} />
        : <>

          <NavBar setToken={setToken} />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vh,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/order' element={<Order token={token} />} />
              </Routes>

            </div>

          </div>
        </>
      }


    </div >
  )
}

export default App