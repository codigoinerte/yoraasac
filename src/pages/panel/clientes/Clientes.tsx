import React from 'react'
import { Link } from 'react-router-dom';
import { ContainerInner } from '../../../components'
import { breadcrumb as bread} from '../../../interfaces/interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Clientes', enlace: '' },
];

export const Clientes = () => {
  return (
            
    <ContainerInner breadcrumb={breadcrumb}>
        <>
            <div className="d-flex gap-2 mb-4">
                <Link to="/clientes/new" className="btn btn-primary btn-lg">Nuevo</Link>
                <Link to="/" className="btn btn-danger btn-lg">Cancelar</Link>
            </div>

            <hr className='border border-1 opacity-50'/>

            <div className="buscador">
                <form>
                    <div className="row">
                        <div className="col-xs-12">
                            <h5>Buscador</h5>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Documento</label>
                                <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='Documento'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                                <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de creaci&oacute;n</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
                            <div className="mb-3 w-100">                                
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Buscar</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>            

            {
                true ?
                (
                    <>
                        <table className='table'>
                            <thead>
                                <tr>
                                <th scope="col">Documento</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">fecha de creaci&oacute;n</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="Documento">70035156</td>
                                    <td data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
                                    <td data-label="Fecha de creaci&oacute;n">15/06/2022</td>
                                    <td data-label="Acciones">
                                        <div className="acciones-buttons">
                                            <button type="button" className="btn btn-outline-primary"><i className="bi bi-pencil"></i></button>
                                            <button type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>   

                        <div className="pagination flex justify-content-between mt-4">
                            <a className="btn btn-outline-primary" href='#'><i className="bi bi-chevron-left"></i> Anterior</a>
                            <a className="btn btn-outline-primary" href='#'>Siguiente <i className="bi bi-chevron-right"></i></a>
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
    </ContainerInner>
    
  )
}
