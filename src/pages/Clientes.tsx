import React from 'react'
import { Breadcrumb, Container, Footer, Header } from '../components'

// const breadcrumb = [
//     { titulo: 'Clientes' }
// ];

export const Clientes = () => {
  return (
    <>
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb titulo="Clientes" breadcrumb={[]} />

        {/* main */}
        <Container>

        <div className="inner-page pt-9 pb-0">

            <div className="buscador">
                <form>
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

            <table>            
                <thead>
                    <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Account">Visa - 3412</td>
                        <td data-label="Due Date">04/01/2016</td>
                        <td data-label="Amount">$1,190</td>
                        <td data-label="Period">03/01/2016 - 03/31/2016</td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Account">Visa - 6076</td>
                        <td data-label="Due Date">03/01/2016</td>
                        <td data-label="Amount">$2,443</td>
                        <td data-label="Period">02/01/2016 - 02/29/2016</td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Account">Corporate AMEX</td>
                        <td data-label="Due Date">03/01/2016</td>
                        <td data-label="Amount">$1,181</td>
                        <td data-label="Period">02/01/2016 - 02/29/2016</td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Acount">Visa - 3412</td>
                        <td data-label="Due Date">02/01/2016</td>
                        <td data-label="Amount">$842</td>
                        <td data-label="Period">01/01/2016 - 01/31/2016</td>
                    </tr>
                </tbody>
            </table>    
        </div>
        
        </Container>
                

        {/* footer */}
        <Footer/>
    </>
  )
}
