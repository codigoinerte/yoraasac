import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PersonalForm } from '../../interfaces'
import { FormControls } from '../FormControls';
/*
    1: cliente
    2: proveedor
    3: personal
    4: heladero

*/
export const FormStock = ({category, page }:PersonalForm) => {
    
  return (
    <>
        <FormControls category={category} save={()=>console.log(1)} page={page}/>

        <hr className='border border-1 opacity-50'/>

        <h4>Informaci&oacute;n</h4>

        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                
                <div className="mb-3">
                    <label htmlFor="tipo_movimiento" className="form-label">Tipo de movimiento</label>
                    <select name="tipo_movimiento" id="tipo_movimiento" className='form-control'>
                        <option value="">-seleccione una opcion-</option>
                        <option value="1">Compra</option>
                        <option value="2">Devoluci&oacute;n</option>
                    </select>
                </div>

            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            
                <div className="mb-3">
                    <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                    <input type="date" className="form-control" id="fecha_movimiento" aria-describedby="fecha_movimiento" />
                </div>            

            </div>

        </div>  

        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                implementar detalle del movimiento
            </div>
        </div>

    </>
  )
}
