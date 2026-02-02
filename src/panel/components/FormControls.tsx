import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ControlsInterface } from '../interfaces'

export const FormControls = ({
    originId = 0,
    save,
    page,
    category,
    tipo = 'new',
    imprimir,
    isPrint = false,
    isFactura = false,
    isNew = false,
    funcNew = undefined,
    NewComponent = undefined,
    onNavigateBack= ()=>{ history.go(-1); } ,
    routeBackLabel, classContainer = ''   }:ControlsInterface) => {

    const IdRef = useRef<number>(0);
    const { id = 0 } = useParams();
    IdRef.current = id ? Number(id) : originId;
    
    const cat = typeof category != 'undefined' ? `/${category}`:'';   

    return (
        <>
            <div className={`d-flex gap-2 mb-4 flex-wrap ${classContainer}`}>
                {
                    tipo !== 'list' &&
                    <button type="submit" className="button-save flex-1 bg-primary hover:bg-primary-light text-primary-foreground uppercase text-xs font-bold py-3 rounded-sm text-white">Guardar</button>
                }
                {
                    ((IdRef.current && IdRef.current > 0) || tipo == 'list' || isNew) &&
                    (
                        funcNew ?
                        
                        <button type="button" onClick={() => {
                            funcNew();
                        }} className="button-new flex-1 bg-primary hover:bg-primary-light text-primary-foreground uppercase text-xs font-bold py-3 rounded-sm text-white">Nuevo</button>

                        :

                        <Link to={`${cat}/${page}/new`} className="button-new flex-1 bg-primary hover:bg-primary-light text-primary-foreground uppercase text-xs font-bold py-3 rounded-sm text-white text-center">Nuevo</Link>
                    )
                }
                {
                    isFactura &&
                    (
                        <>
                            <button type='button' onClick={()=> {
                                if(typeof save != "undefined"){ save(); }
                            } } className="button-factura flex-1 bg-primary hover:bg-primary-light text-primary-foreground uppercase text-xs font-bold py-3 rounded-sm text-white flex-fill">Generar Factura</button>        
                            
                        </>
                    )
                }
                {
                    isPrint &&
                    (
                        <>                           
                            <button type='button' onClick={()=> {
                                if(typeof imprimir != "undefined"){ imprimir();}
                            } } className="button-print flex-1 bg-green-800 hover:bg-green-700 text-primary-foreground uppercase text-xs font-bold py-3 rounded-sm text-white flex-fill">Imprimir</button>        
                        </>
                    )
                }
                {
                    NewComponent ? NewComponent : ''
                }
                <button type='button' onClick={onNavigateBack} className="button-back flex-1 bg-danger hover:bg-danger-light text-primary-foreground uppercase text-xs font-bold py-3 rounded-sm text-white flex-fill">{ routeBackLabel ? routeBackLabel: 'Volver al listado'}</button>
            </div>
        </>
    )
}
