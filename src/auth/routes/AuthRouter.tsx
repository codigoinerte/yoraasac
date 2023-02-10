import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth, AuthRecovery } from '../pages';
import '../assets/css/style.scss';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth /> } />
      <Route path="/recuperar-password" element={<AuthRecovery /> } />
      <Route path="*" element={<Auth />} />        
      
    </Routes>
  )
}
