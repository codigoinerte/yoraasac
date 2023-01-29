import React from 'react'
import "./assets/css/main.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import {  Home, 
          Clientes, 
          ClientesDetalle,
          Proveedores,
          ProveedoresDetalle,        
          Personal,
          PersonalDetalle,
          Heladeros,
          HeladerosDetalle,
          StockHelados,
          StockHeladosDetalle,
          StockBarquillosDetalle,
          StockBaterias,
          StockBateriasDetalle,
          ProductosDetalle,
          Personas

        } from './pages';

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { StockBarquillos } from './pages/panel/stockBarquillos/StockBarquillos';
import { Productos } from './pages/panel/productos/Productos';
import path from 'path';

export const App = () => {
  return (
    <>

      <Routes>
        
          <Route path="/" element={<Home />} />
          
          <Route path="/personas/*" element={<Routes>

            {/* Categoria clientes */}
            <Route path="/" element={<Personas />} />

            {/* clientes */}
            <Route path="/clientes/*" element={<Routes>

                <Route path="/" element={<Clientes />} />
                <Route path="/new" element={<ClientesDetalle />} />
                <Route path="/edit/:id" element={<ClientesDetalle />} />
            </Routes>} />

            {/* proveedores */}
            <Route path="/proveedores/*" element={<Routes>

              <Route path="/" element={<Proveedores />} />
              <Route path="/new" element={<ProveedoresDetalle />} />
              <Route path="/edit/:id" element={<ProveedoresDetalle />} />
            </Routes>} />
            
            {/* personal */}
            <Route path="/personal/*" element={<Routes>

              <Route path="/" element={<Personal />}/>
              <Route path="/new" element={<PersonalDetalle />} />
              <Route path="/edit/:id" element={<PersonalDetalle />} />
            </Routes>} />

            {/* Heladeros */}
            <Route path="/heladeros/*" element={<Routes>
              
              <Route path="/" element={<Heladeros />} />
              <Route path="/new" element={<HeladerosDetalle />} />
              <Route path="/edit/:id" element={<HeladerosDetalle />} />
            </Routes>} />                        

          </Routes>} />

          
          
          {/* Stock helados */}
          <Route path="/stock-helados" element={<StockHelados />} />
          <Route path="/stock-helados/new" element={<StockHeladosDetalle />} />
          <Route path="/stock-helados/edit/:id" element={<StockHeladosDetalle />} />
          
          {/* Stock barquillos */}
          <Route path="/stock-barquillos" element={<StockBarquillos />} />
          <Route path="/stock-barquillos/new" element={<StockBarquillosDetalle />} />
          <Route path="/stock-barquillos/edit/:id" element={<StockBarquillosDetalle />} />
          
          {/* Stock baterias */}
          <Route path="/stock-baterias" element={<StockBaterias />} />
          <Route path="/stock-baterias/new" element={<StockBateriasDetalle />} />
          <Route path="/stock-baterias/edit/:id" element={<StockBateriasDetalle />} />

          {/* Productos */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/new" element={<ProductosDetalle />} />
          <Route path="/productos/edit/:id" element={<ProductosDetalle />} />


          <Route path="*" element={<Home />} />
        
      </Routes>

    </>
  )
}

export default App;