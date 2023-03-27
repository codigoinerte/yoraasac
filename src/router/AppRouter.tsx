import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRouter } from '../auth';
import { Auth } from '../interfaces';
import { PanelRoute } from '../panel';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
    
  useEffect(() => {
  
    checkAuthToken();

  }, []);

  if ( status === 'checking' ) {
      return (
          <h3>Cargando...</h3>
      )
  }

  return (
    <Routes>

        {
          ( status === 'not-authenticated')  
          ?(<Route path="/auth/*" element={<AuthRouter />} />)
          :(<Route path="/*" element={<PanelRoute />}/>)

        }

        <Route path="/*" element={<Navigate to="/auth/" />} />

        

    </Routes>  
  )
}
