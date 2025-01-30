import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthRouter } from '../auth';
import { PanelRoute } from '../panel';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuthStore, useNotaHeladeroStore } from '../hooks';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  const { pathname } = useLocation();
  const { setNullNotaHeladero } = useNotaHeladeroStore();

  useEffect(() => {
  
    checkAuthToken();

  }, []);

  useEffect(() => {
    if(!pathname.includes('nota-heladero')){
      console.info('reseteo');
      setNullNotaHeladero();
    }
  }, [pathname])
  

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
