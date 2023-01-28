import React from 'react'
import { Link } from 'react-router-dom'
import { PersonalForm } from '../../interfaces'
/*
    1: cliente
    2: proveedor
    3: personal
    4: heladero

*/
export const FormPersonal = ({tipo, ruta }:PersonalForm) => {
  return (
    <>
        <div className="d-flex gap-2 mb-4">
            <button onClick={()=>console.log(1)} className="btn btn-primary btn-lg">Guardar</button>
            <Link to={`/personas/${ruta}`} className="btn btn-danger btn-lg">Cancelar</Link>
        </div>

        <hr className='border border-1 opacity-50'/>

        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                
                <h4>Informaci&oacute;n</h4>
                
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <div className="input-group">
                        <input type="text" id="dni" className="form-control" placeholder="00000000" aria-label="DNI" />
                        <button className="btn btn-primary" type="button"><i className="bi bi-search"></i> Buscar por DNI</button>
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
  )
}
