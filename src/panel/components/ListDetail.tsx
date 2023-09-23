import React from 'react'
import { ListDetail as ListDetailInteface } from '../interfaces'

export const ListDetail = ({cabecera, detalle, eliminar}:ListDetailInteface) => {
  return (
    <>
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
                                return (                                    
                                    
                                        <tr key={keyrow}>
                                            {
                                                (campos??[]).map(( texto, index )=> {
                                                    
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
                                                    <button onClick={()=> eliminar(id)} type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    
                                )})
                            }
                            
                        </tbody>
                    </table>   
                  
                </>
            )
            :
            (
                <>
                    <div className="alert alert-warning d-flex justify-content-center gap-3 fs-2 mt-5" role="alert">
                        <i className="bi bi-exclamation-triangle"></i>
                        <div>
                            <b>No se añadio ningun producto</b>
                        </div>
                    </div>
                </>
            )

        }
    </>
  )
}
