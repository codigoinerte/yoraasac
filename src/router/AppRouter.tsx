import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRouter } from '../auth';
import { Auth } from '../interfaces';
import { PanelRoute } from '../panel';
import "bootstrap-icons/font/bootstrap-icons.css";

export const AppRouter = () => {

    const statusLogin:Auth = "no-auth";
    // statusLogin == "auth"
  return (
    <Routes>

        {
          false
          ?(<Route path="/*" element={<PanelRoute />}/>)
          :(<Route path="/auth/*" element={<AuthRouter />} />)

        }

        <Route path="/*" element={<Navigate to="/auth/" />} />

        

    </Routes>  
  )
}
