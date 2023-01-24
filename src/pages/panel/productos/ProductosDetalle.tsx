import React from 'react'
import { Link } from 'react-router-dom';
import { ContainerInner, FormPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Productos', enlace: '/productos' },
    { id:2, titulo: 'Productos detalle', enlace: '' }
];


export const ProductosDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
            <div className="d-flex gap-2 mb-4">
                <button onClick={()=>console.log(1)} className="btn btn-primary btn-lg">Guardar</button>
                <Link to='/productos' className="btn btn-danger btn-lg">Cancelar</Link>
            </div>

            <hr className='border border-1 opacity-50'/>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  
                <h4>Informaci&oacute;n</h4>
                
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Codigo de producto</label>
                    <input type="text" className="form-control" id="codigo" aria-describedby="codigo" />
                </div>

                <div className="mb-3">
                    <label htmlFor="nombreproducto" className="form-label">Nombre de producto</label>
                    <input type="text" className="form-control" id="nombreproducto" aria-describedby="nombreproducto" />
                </div>

                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <select name="marca" id="marca" className='form-control'>
                      <option value="">- Seleccione una opcion -</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="tipoproducto" className="form-label">Tipo de producto (UNSPSC SUNAT)</label>
                    <select name="tipoproducto" id="tipoproducto" className='form-control'>
                      <option value="">- Seleccione una opcion -</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select name="estado" id="estado" className='form-control'>
                      <option value="1">Disponible</option>
                      <option value="2">Descontinuado</option>
                    </select>
                </div>
                  
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <h4>Precio de venta (publico)</h4>
               
                <div className="mb-3">
                    <label htmlFor="tipoigv" className="form-label">Tipo de IGV</label>
                    <select name="tipoigv" id="tipoigv" className='form-control'>
                      <option value="">- Seleccione una opcion -</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="moneda" className="form-label">Tipo de IGV</label>
                    <select name="moneda" id="moneda" className='form-control'>
                      <option value="">Soles</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="precioventa" className="form-label">Precio de venta</label>
                    <input type="text" className="form-control" id="precioventa" aria-describedby="precioventa" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="descuento" className="form-label">Descuento</label>
                    <div className="input-group mb-3">
                      <input type="number" className="form-control" aria-describedby="precio-descuento" min={0} step={1} max={100}/>
                      <span className="input-group-text" id="precio-descuento">%</span>
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="preciofinal" className="form-label">Precio final</label>
                    <input type="text" className="form-control" id="preciofinal" aria-describedby="preciofinal" />
                </div>


              </div>
            </div>
        </>
    </ContainerInner>
  )
}
