import React from 'react'
import { Link } from 'react-router-dom'
import { breadcrumb, breadcrumbInterface } from '../interfaces'

export const Breadcrumb = ({ titulo, mensaje, breadcrumb }:breadcrumbInterface) => {

  const mainTitulo =  titulo ? titulo : breadcrumb[breadcrumb.length-1].titulo;

  return (
    <>

        <div className="breadcrumb-container bg-primary">
            <div className="container">

                {
                  breadcrumb.length > 0 &&
                  (
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">

                      <li className="breadcrumb-item">
                        <Link to="/"><i className="bi bi-house"></i></Link>
                      </li>

                        {
                          breadcrumb.map(({ id, enlace, titulo }:breadcrumb, index)=>(
                            
                            (breadcrumb.length-1 == index)
                            ?
                              <li key={id} data-page={index} className={ `breadcrumb-item ${breadcrumb.length == index ? 'active' : ''}` } aria-current="page">
                                  { titulo }
                              </li>
                            :
                              <li key={id} data-page={index} className={ `breadcrumb-item ${breadcrumb.length == index ? 'active' : ''}` } aria-current="page">
                                <Link to={enlace}>{ titulo }</Link>
                              </li>
                          ))
                        }
                          
                      </ol>
                    </nav>

                  )
                }

                <h1>{ mainTitulo }</h1>

                { !!mensaje ? ( <p>{ mensaje }</p> ) : false }

            </div>
        </div>

    </>
  )
}
