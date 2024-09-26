import React from 'react'
import "../assets/css/main.scss";

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
          Reportes,
          ReporteCliente,
          ReporteProveedores,
          ReportePersonal,
          ReporteHeladeros,
          ReporteHelados,
          ReporteBarquillos,
          ReporteBaterias,
          ReporteNotaHeladero,
          ReporteFacturas,
          Configuracion,
          Moneda,
          Marca,
          MarcaDetalle,
          ConfiguracionPrincipal,
          LocalesSeries,
          MiCuenta,
          StockHistorialHelados,
          StockRestante,
          ReporteNotaHeladeroAsistencia,
          Reajuste,
          ReajusteDetalle,
        } from '../pages';

import { Routes, Route, Navigate } from "react-router-dom";
import { StockBarquillos } from '../pages/panel/stockBarquillos/StockBarquillos';
import { Productos } from '../pages/panel/productos/Productos';

import { NotaHeladero } from '../pages/panel/notaHeladero/NotaHeladero';
import { ReporteBoletas } from '../pages/panel/reportes/ReporteBoletas';
import { Notificaciones } from '../pages/panel/micuenta/Notificaciones';
import { Destacados } from '../pages/panel/configuracion/Destacados';

export const PanelRoute = () => {
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
          <Route path="/movimiento/*" element={<Routes>

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

            {/* Reajustes */}
            <Route path="/reajuste/*" element={<Routes>

              
              <Route path="/" element={<Reajuste />} />
              <Route path="/new" element={<ReajusteDetalle />} />
              <Route path="/edit/:id" element={<ReajusteDetalle />} />
              <Route path="*" element={<Reajuste />} />   
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
            <Route path='/clientes' element={<ReporteCliente />} />
            <Route path='/proveedores' element={<ReporteProveedores />} />
            <Route path='/personal' element={<ReportePersonal />} />
            <Route path='/heladeros' element={<ReporteHeladeros />} />
            <Route path='/heladeros-asistencia' element={<ReporteNotaHeladeroAsistencia />} />
            <Route path='/helados' element={<ReporteHelados />} />
            <Route path='/barquillos' element={<ReporteBarquillos />} />
            <Route path='/baterias' element={<ReporteBaterias />} />
            <Route path='/nota-heladeros' element={<ReporteNotaHeladero />} />
            <Route path='/facturas' element={<ReporteFacturas />} />
            <Route path='/boletas' element={<ReporteBoletas />} />

            {/* Stock helados */}
            <Route path="/historial-helados/*" element={<Routes>
              <Route path="/" element={<StockHistorialHelados />} />
            </Routes>} />

            {/* Stock restante */}
            <Route path="/stock-restante/*" element={<Routes>
              <Route path="/" element={<StockRestante />} />
            </Routes>} />
              
            
            <Route path="*" element={<Reportes />} />   
          </Routes>} />
          
          {/* Configuracion */}
          <Route path="/configuracion/*" element={<Routes>
            
            <Route path="/" element={<Configuracion />} />
            <Route path="/monedas" element={<Moneda />} />

            <Route path="/marcas/*" element={<Routes>

              <Route path='/' element={<Marca />} />
              <Route path='/new' element={<MarcaDetalle />} />
              <Route path='/edit/:id' element={<MarcaDetalle />} />
              <Route path='*' element={<Marca />} />

            </Routes>} />

            <Route path="/principal" element={<ConfiguracionPrincipal />} />
            <Route path="/locales-series" element={<LocalesSeries />} />
            <Route path="/destacados" element={<Destacados />} />

            <Route path="*" element={<Reportes />} />   
          </Routes>} />

          <Route path="/mi-cuenta" element={<MiCuenta />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          

          <Route path="/*" element={<Navigate to="/" />} />
        
      </Routes>

    </>
  )
}