import React from 'react'
import { ContainerInner, FormControls, FormStock } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock barquillos', enlace: '/stock/barquillos' },
  { id:3, titulo: 'Stock barquillos detalle', enlace: '' }
];

export const StockBarquillosDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
          <>
          {/* <FormStock page='helados' category='stock' /> */}
          <FormControls category="stock" save={()=>console.log(1)} page="barquillos"/>

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
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  
                  <div className="mb-3">
                      <label htmlFor="cantidad" className="form-label">Cantidad</label>
                      <input type="text" className="form-control" id="cantidad" aria-describedby="cantidad" />
                  </div>     

              </div>  


          </div>  
    
        </>
    </ContainerInner>
  )
}
