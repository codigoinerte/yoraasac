import React from 'react'
import { Link } from 'react-router-dom'
import { TablalList } from '../interfaces'

export const List = ({modulo, cabecera, detalle, eliminar, next, prev, children }:TablalList) => {
  return (
    <>
        <div className="d-flex gap-2 mb-4">
            <Link to={`/${modulo}/new`} className="btn btn-primary btn-lg">Nuevo</Link>
            <Link to="/" className="btn btn-danger btn-lg">Cancelar</Link>
        </div>

        <hr className='border border-1 opacity-50'/>

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
                                    const enlaceDetalle = `${`/${modulo}/edit`}${id}`;
                                return (                                    
                                    
                                        <tr key={keyrow}>
                                            {
                                                campos.map(( texto, index )=> {
                                                    
                                                    const cabeceraChildren = cabecera[index];
                                                    const childrenRowKey = `children_${cabeceraChildren}_${id}`
                                                    
                                                    return (
                                                    <td key={childrenRowKey} scope="row" data-label={cabeceraChildren}>
                                                        {texto}
                                                    </td>  
                                                )})
                                            }

                                            <td data-label="Acciones">
                                                <div className="acciones-buttons">
                                                    <Link to={enlaceDetalle} type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></Link>
                                                    <button onClick={()=> eliminar(id)} type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                                </div>
                                            </td>
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
