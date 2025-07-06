import React from 'react'
import { useAuthStore } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
const user=useAuthStore((state)=>state.isLogin)
if(!user){
return <Navigate to='/login' replace/>
}
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes