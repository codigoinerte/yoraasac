import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ControlsInterface } from '../interfaces'

export const FormControls = ({ save, page, category, tipo = 'new', imprimir, isPrint = false, isFactura = false, isNew = false, funcNew = undefined, NewComponent = undefined, onNavigateBack= ()=>{ history.go(-1); } , routeBackLabel, classContainer = ''   }:ControlsInterface) => {

    const { id = 0 } = useParams();

    const navigate = useNavigate();

    
    const cat = typeof category != 'undefined' ? `/${category}`:'';


    return (
        <>
            <div className={`d-flex gap-2 mb-4 flex-wrap ${classContainer}`}>
                {
                    tipo !== 'list' &&
                    <button type="submit" className="button-save btn btn-primary btn-lg flex-fill">Guardar</button>
                }
                {
                    (parseInt(id.toString()) > 0 || tipo == 'list' || isNew) &&
                    (
                        funcNew ?
                        
                        <button type="button" onClick={() => {
                            funcNew();
                        }} className="button-new btn btn-primary btn-lg flex-fill">Nuevo</button>

                        :

                        <Link to={`${cat}/${page}/new`} className="button-new btn btn-primary btn-lg flex-fill">Nuevo</Link>
                    )
                }
                {
                    isFactura &&
                    (
                        <>
                            <button type='button' onClick={()=> {
                                if(typeof save != "undefined"){ save(); }
                            } } className="button-factura btn btn-success btn-lg flex-fill">Generar Factura</button>        
                            
                        </>
                    )
                }
                {
                    isPrint &&
                    (
                        <>                           
                            <button type='button' onClick={()=> {
                                if(typeof imprimir != "undefined"){ imprimir();}
                            } } className="button-print btn btn-success btn-lg flex-fill">Imprimir</button>        
                        </>
                    )
                }
                {
                    NewComponent ? NewComponent : ''
                }
                <button type='button' onClick={onNavigateBack} className="button-back btn btn-danger btn-lg flex-fill">{ routeBackLabel ? routeBackLabel: 'Volver al listado'}</button>
            </div>
        </>
    )
}
