import React from 'react'

import { ContainerInner, FormControls, FormStock, ListDetail } from '../../../components'
import { Breadcrumb as bread, listaDetalle } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock helados', enlace: '/stock/helados' },
  { id:3, titulo: 'Stock helados detalle', enlace: '' }
];

export const StockHeladosDetalle = () => {

  const cabecera = [
      "codigo",
      "Producto",
      "cantidad"
  ];

  const eliminar = (id:number) => {
      console.log(id);
  }

  const detalle:listaDetalle[] = [
    {
      id:1,
      campos: ["000000001", "Helado 1", "3"]        
    },
    {
      id:2,
      campos: ["000000002", "Helado 2", "4"]        
    },
    {
      id:3,
      campos: ["000000003", "Helado 3", "2"]        
    },
    {
      id:4,
      campos: ["000000004", "Helado 4", "1"]        
    }
  ];

  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
          {/* <FormStock page='helados' category='stock' /> */}
          <FormControls category="stock" save={()=>console.log(1)} page="helados"/>

          <hr className='border border-1 opacity-50'/>

          <h4>Informaci&oacute;n</h4>

          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  
                  <div className="mb-3">
                      <label htmlFor="tipo_movimiento" className="form-label">Tipo de movimiento</label>
                      <select name="tipo_movimiento" id="tipo_movimiento" className='form-control'>
                          <option value="">-seleccione una opcion-</option>
                          <option value="1">Ingreso</option>
                          <option value="2">Salida</option>
                      </select>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="tipo_documento" className="form-label">Tipo de Documento</label>
                      <select name="tipo_documento" id="tipo_documento" className='form-control'>
                          <option value="">-seleccione una opcion-</option>
                          <option value="1">Boleta venta</option>
                          <option value="2">Factura venta</option>
                          <option value="3">Factura compra</option>
                          <option value="4">Nota heladero salida</option>
                          <option value="5">Nota heladero ingreso</option>
                          <option value="6">Otro</option>
                      </select>
                  </div>

              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                              
                  <div className="mb-3">
                      <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                      <input type="date" className="form-control" id="fecha_movimiento" aria-describedby="fecha_movimiento" />
                  </div>            
                
                  <div className="mb-3">
                      <label htmlFor="num_documento" className="form-label">N&uacute;m de documento</label>
                      <input type="text" className="form-control" id="num_documento" aria-describedby="num_documento" />
                  </div>            

              </div>

          </div>  

          <h4>Productos o items del movimiento</h4>

          <div className="row">
              
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="input-group mb-3">
                  <select className="form-select" id="inputGroupSelect02">
                    <option>-Busque un producto-</option>
                    <option value="1">Helado 1</option>
                    <option value="2">Helado 2</option>
                    <option value="3">Helado 3</option>                    
                  </select>
                  <button className="btn btn-primary" type="button"><i className="bi bi-plus"></i> Agregar</button>
                </div>

              </div>

              <div className='px-3'>
              {
                 detalle.length > 0 ?
                 (
                     <>
                         <table className='table'>
                             <thead>
                                 <tr>
                                     {
                                         cabecera.map((titulo)=>(
                                             <th key={titulo} scope="col">{ titulo }</th>
                                         ))
                                     }
                                         <th scope="col">Acciones</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 
                                 {
                                     detalle.map(({ id, campos })=>{
                                         
                                         const keyrow = `fila${id}`;
                                         const enlaceDetalle = '';
                                     return (                                    
                                         
                                             <tr key={keyrow}>
                                                 {
                                                     campos.map(( texto, index )=> {
                                                         
                                                         const cabeceraChildren = cabecera[index];
                                                         const childrenRowKey = `children_${cabeceraChildren}_${id}`
                                                         
                                                         return (
                                                         <td key={childrenRowKey} scope="row" data-label={cabeceraChildren}>
                                                             {
                                                                  index == 2 ? 
                                                                  (
                                                                    <>
                                                                      <input 
                                                                            type="number" 
                                                                            className='form-control' 
                                                                            value={texto}
                                                                            min={0}
                                                                            onChange={()=>{}}
                                                                            max={1000} />
                                                                    </>
                                                                  )
                                                                  :
                                                                  texto
                                                                
                                                             }
                                                         </td>  
                                                     )})
                                                 }
     
                                                 <td data-label="Acciones">
                                                     <div className="acciones-buttons">                                                    
                                                         <button onClick={()=> eliminar(id)} type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                                     </div>
                                                 </td>
                                             </tr>
                                         
                                     )})
                                 }
                                 
                             </tbody>
                         </table>   
                       
                     </>
                 )
                 :
                 (
                     <>
                         <div className="alert alert-warning d-flex justify-content-center gap-3 fs-2 mt-5" role="alert">
                             <i className="bi bi-exclamation-triangle"></i>
                             <div>
                                 <b>No se añadio ningun producto</b>
                             </div>
                         </div>
                     </>
                 )
              }
              </div>

          </div>

        </>
    </ContainerInner>
  )
}
