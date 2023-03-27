import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Auth, AuthRecovery } from '../pages';


export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth /> } />
      <Route path="/recuperar-password" element={<AuthRecovery /> } />
      <Route path="*" element={<Navigate to="/" />} />        
      
    </Routes>
  )
}
