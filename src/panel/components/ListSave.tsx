import React from 'react'
import { useNavigate } from 'react-router-dom';

import { SaveList } from '../interfaces'

export const ListSave = ({cabecera, detalle, editar, eliminar, children }:SaveList) => {

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    }

    return (
        <>            
            <div className="d-flex gap-2 mb-4">           
                <button onClick={onNavigateBack} className="btn btn-danger btn-lg">Atr&aacute;s</button>
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
                                    return (                                    
                                        
                                            <tr key={keyrow}>
                                                {
                                                    campos?.map(( texto, index )=> {
                                                        
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
                                                        <button onClick={()=> editar(id) } type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                                        <button onClick={()=> eliminar(id) } type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
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
                                <b>No se encontraron registros</b>
                            </div>
                        </div>
                    </>
                )

            }
        </>    
    )
}
