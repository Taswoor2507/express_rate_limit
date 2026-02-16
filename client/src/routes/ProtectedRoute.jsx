import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
const navigate = useNavigate();
 const {IsAuthenticated , user} = useAuth()

 useEffect(()=>{
    if(!IsAuthenticated){
        navigate("/login")
    }
 } , [IsAuthenticated , user])




  return (
      <Outlet/>  
  )
}

export default ProtectedRoute