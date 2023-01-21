import React from 'react'
import "./assets/css/main.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import {  Home, 
          Clientes, 
          ClientesDetalle,
          Proveedores,
          ProveedoresDetalle,        
          Personal,
          PersonalDetalle

        } from './pages';

import { Routes, Route, Outlet, Link } from "react-router-dom";

export const App = () => {
  return (
    <>

      <Routes>
        
          <Route path="/" element={<Home />} />

          {/* clientes */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/new" element={<ClientesDetalle />} />
          <Route path="/clientes/edit/:id" element={<ClientesDetalle />} />

          {/* proveedores */}
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/proveedores/new" element={<ProveedoresDetalle />} />
          <Route path="/proveedores/edit/:id" element={<ProveedoresDetalle />} />
          
          {/* personal */}
          <Route path="/personal" element={<Personal />} />
          <Route path="/personal/new" element={<PersonalDetalle />} />
          <Route path="/personal/edit/:id" element={<PersonalDetalle />} />
          
          <Route path="*" element={<Home />} />
        
      </Routes>

    </>
  )
}

export default App;