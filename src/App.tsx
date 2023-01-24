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
          ProductosDetalle

        } from './pages';

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { StockBarquillos } from './pages/panel/stockBarquillos/StockBarquillos';
import { Productos } from './pages/panel/productos/Productos';

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
          
          {/* Heladeros */}
          <Route path="/heladeros" element={<Heladeros />} />
          <Route path="/heladeros/new" element={<HeladerosDetalle />} />
          <Route path="/heladeros/edit/:id" element={<HeladerosDetalle />} />
          
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