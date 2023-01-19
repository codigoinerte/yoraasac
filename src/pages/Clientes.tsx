import React from 'react'
import { Breadcrumb, Container, Footer, Header } from '../components'
import { Breadcrumb as bread } from '../interfaces';

const breadcrumb:bread[] = [
    { titulo: 'Clientes', enlace: ()=>{} }
];

export const Clientes = () => {
  return (
    <>
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb titulo="Clientes" breadcrumb={[]} />

        {/* main */}
        <Container>

        <div className="inner-page">

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
                                <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='DNI'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-6">
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


                    </div>
                </form>
            </div>

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
                        <td width="100%" data-label="Nombre">BRIGITTE MERIDA PONCE VALENTIN</td>
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

        </div>
        
        </Container>
                

        {/* footer */}
        <Footer/>
    </>
  )
}
