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
          Personas,
          Stock,
          NotaHeladeroDetalle,
          Facturacion,
          FacturacionDetalle,
          Reportes

        } from './pages';

import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { StockBarquillos } from './pages/panel/stockBarquillos/StockBarquillos';
import { Productos } from './pages/panel/productos/Productos';
import path from 'path';
import { NotaHeladero } from './pages/panel/notaHeladero/NotaHeladero';

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
                <Route path="*" element={<Clientes />} />
            </Routes>} />

            {/* proveedores */}
            <Route path="/proveedores/*" element={<Routes>

              <Route path="/" element={<Proveedores />} />
              <Route path="/new" element={<ProveedoresDetalle />} />
              <Route path="/edit/:id" element={<ProveedoresDetalle />} />
              <Route path="*" element={<Proveedores />} />
            </Routes>} />
            
            {/* personal */}
            <Route path="/personal/*" element={<Routes>

              <Route path="/" element={<Personal />}/>
              <Route path="/new" element={<PersonalDetalle />} />
              <Route path="/edit/:id" element={<PersonalDetalle />} />
              <Route path="*" element={<Personal />} />
            </Routes>} />

            {/* Heladeros */}
            <Route path="/heladeros/*" element={<Routes>
              
              <Route path="/" element={<Heladeros />} />
              <Route path="/new" element={<HeladerosDetalle />} />
              <Route path="/edit/:id" element={<HeladerosDetalle />} />
              <Route path="*" element={<Heladeros />} />
            </Routes>} />  

            <Route path="*" element={<Personas />} />                      

          </Routes>} />

          {/* Productos */}
          <Route path="/productos/*" element={<Routes>

            <Route path="/" element={<Productos />} />
            <Route path="/new" element={<ProductosDetalle />} />
            <Route path="/edit/:id" element={<ProductosDetalle />} />
            <Route path="*" element={<Productos />} />
          </Routes>} />
          
          {/* Stock helados */}
          <Route path="/stock/*" element={<Routes>

            <Route path="/" element={<Stock />} />

            {/* Stock helados */}
            <Route path="/helados/*" element={<Routes>

              <Route path="/" element={<StockHelados />} />
              <Route path="/new" element={<StockHeladosDetalle />} />
              <Route path="/edit/:id" element={<StockHeladosDetalle />} />
              <Route path="*" element={<StockHelados />} />                            
            </Routes>} />
            
            {/* Stock barquillos */}
            <Route path="/barquillos/*" element={<Routes>

              <Route path="/" element={<StockBarquillos />} />
              <Route path="/new" element={<StockBarquillosDetalle />} />
              <Route path="/edit/:id" element={<StockBarquillosDetalle />} />
              <Route path="*" element={<StockBarquillos />} />   
            </Routes>} />
            
            {/* Stock baterias */}
            <Route path="/baterias/*" element={<Routes>

              
              <Route path="/" element={<StockBaterias />} />
              <Route path="/new" element={<StockBateriasDetalle />} />
              <Route path="/edit/:id" element={<StockBateriasDetalle />} />
              <Route path="*" element={<StockBaterias />} />   
            </Routes>} />

          </Routes>} />

          
          {/* Notas heladero */}
          <Route path="/nota-heladero/*" element={<Routes>
            
            <Route path="/" element={<NotaHeladero />} />
            <Route path="/new" element={<NotaHeladeroDetalle />} />
            <Route path="/edit/:id" element={<NotaHeladeroDetalle />} />
            <Route path="*" element={<NotaHeladero />} />   
          </Routes>} />

          
          {/* Facturación */}
          <Route path="/facturacion/*" element={<Routes>
            
            <Route path="/" element={<Facturacion />} />
            <Route path="/new" element={<FacturacionDetalle />} />
            <Route path="/edit/:id" element={<FacturacionDetalle />} />
            <Route path="*" element={<Facturacion />} />   
          </Routes>} />
         
          {/* Reportes */}
          <Route path="/reportes/*" element={<Routes>
            
            <Route path="/" element={<Reportes />} />
            
              
            
            <Route path="*" element={<Reportes />} />   
          </Routes>} />



          <Route path="*" element={<Home />} />
        
      </Routes>

    </>
  )
}

export default App;