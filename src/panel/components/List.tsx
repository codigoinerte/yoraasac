import React from 'react'
import { Link } from 'react-router-dom'
import { Enlace } from '../helpers';
import { TablalList } from '../interfaces'
import { FormControls } from './FormControls';

export const List = ({page, cabecera, detalle, eliminar = function(){}, next, prev, children, category, options = true, actions = true }:TablalList) => {

    

  return (
    <>
        {
            options === true &&
            (
                <>
                    <FormControls category={category} page={page} save={()=>console.log(1)} tipo='list'/>
            
                    <hr className='border border-1 opacity-50'/>
                </>
            )
        }

        <div className="buscador">
            { children }
        </div>            

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
                                    const enlaceDetalle = Enlace(category, page, id);
                                return (                                    
                                    
                                        <tr key={keyrow}>
                                            {
                                                campos?.map(( texto, index )=> {
                                                    
                                                    const cabeceraChildren = cabecera[index];
                                                    const childrenRowKey = `children_${cabeceraChildren}_${id}`
                                                    
                                                    return (
                                                    <td key={childrenRowKey} scope="row" data-label={cabeceraChildren}>
                                                        {(texto=='')?'\u00A0':texto}
                                                    </td>  
                                                )})
                                            }
                                            {
                                                actions === true &&
                                                (
                                                    <td data-label="Acciones">
                                                        <div className="acciones-buttons">
                                                            <Link to={enlaceDetalle} type="button" className="btn btn-outline-primary"><i className="bi bi-eye"></i></Link>
                                                            <button onClick={()=> eliminar(id)} type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                                        </div>
                                                    </td>
                                                )
                                            }
                                            
                                            
                                        </tr>
                                    
                                )})
                            }
                            
                        </tbody>
                    </table>   

                    <div className="pagination flex justify-content-between mt-4">
                        <button className="btn btn-outline-primary" onClick={(e)=>prev(e)}><i className="bi bi-chevron-left"></i> Anterior</button>
                        <button className="btn btn-outline-primary" onClick={(e)=>next(e)}>Siguiente <i className="bi bi-chevron-right"></i></button>
                    </div>
                </>
            )
            :
            (
                <>
                    <div className="alert alert-warning d-flex justify-content-center gap-3 fs-2 mt-5" role="alert">
                        <i className="bi bi-exclamation-triangle"></i>
                        <div>
                            <b>No se encontraron registros</b>
                        </div>
                    </div>
                </>
            )

        }
    </>    
  )
}
