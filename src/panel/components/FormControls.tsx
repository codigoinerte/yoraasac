import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ControlsInterface } from '../interfaces'

export const FormControls = ({ save, page, category, tipo = 'new', imprimir }:ControlsInterface) => {

    const { id = 0 } = useParams();

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    }

    const cat = typeof category != 'undefined' ? `/${category}`:'';


    return (
        <>
            <div className="d-flex gap-2 mb-4">
                {
                    tipo !== 'list' &&
                    <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
                }
                {
                    (parseInt(id.toString()) > 0 || tipo == 'list') &&
                    <Link to={`${cat}/${page}/new`} className="btn btn-primary btn-lg">Nuevo</Link>
                }
                {
                    (page == 'nota-heladero' && parseInt(id.toString()) > 0)&&
                    (
                        <>
                            <button type='button' onClick={()=> {
                                if(typeof save != "undefined"){ save(); }
                            } } className="btn btn-success btn-lg">Generar Factura</button>        
                            
                            <button type='button' onClick={()=> {
                                if(typeof imprimir != "undefined"){ imprimir();}
                            } } className="btn btn-success btn-lg">Imprimir</button>        
                        </>
                    )
                }
                <button type='button' onClick={onNavigateBack} className="btn btn-danger btn-lg">Atr&aacute;s</button>
            </div>
        </>
    )
}
