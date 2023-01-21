import React from 'react'
import { Link } from 'react-router-dom';
import { ContainerInner } from '../../../components';
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Proveedores', enlace: '/proveedores' },
    { id:2, titulo: 'Proveedor detalle', enlace: '' }
];


export const ProveedoresDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>                

        <div className="d-flex gap-2 mb-4">
            <Link to="/proveedores" className="btn btn-primary btn-lg">Guardar</Link>
            <Link to="/proveedores" className="btn btn-danger btn-lg">Cancelar</Link>
        </div>

        <hr className='border border-1 opacity-50'/>

        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                
                <h4>Informaci&oacute;n de contacto</h4>
                
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">RUC</label>
                    <div className="input-group">
                        <input type="text" id="dni" className="form-control" placeholder="00000000" aria-label="RUC" />
                        <button className="btn btn-primary" type="button"><i className="bi bi-search"></i> Buscar por RUC</button>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombres</label>
                    <input type="text" className="form-control" id="nombre" aria-describedby="nombre" />
                </div>

                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className="form-control" id="apellidos" aria-describedby="apellidos" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input type="tel" className="form-control" id="celular" aria-describedby="celular" />
                </div>

            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <h4>Direcci&oacute;n</h4>

                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <select name="departamento" id="departamento" className='form-control'>
                        <option value="">-seleccione una opcion-</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <select name="provincia" id="provincia" className='form-control'>
                        <option value="">-seleccione una opcion-</option>
                    </select>
                </div>                            
                <div className="mb-3">
                    <label htmlFor="distrito" className="form-label">Distrito</label>
                    <select name="distrito" id="distrito" className='form-control'>
                        <option value="">-seleccione una opcion-</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direcci&oacute;n</label>
                    <input type="text" className="form-control" id="direccion" aria-describedby="direccion" />
                </div>

            </div>
        </div>
                            
        </>

    </ContainerInner>
  )
}
