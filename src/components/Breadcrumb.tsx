import React from 'react'
import { breadcrumb, breadcrumbInterface } from '../interfaces'

export const Breadcrumb = ({ titulo, mensaje, breadcrumb }:breadcrumbInterface) => {
  return (
    <>

        <div className="breadcrumb-container bg-primary">
            <div className="container">

                {
                  breadcrumb.length > 0 &&
                  (
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        {
                          breadcrumb.map(({ id, enlace, titulo }:breadcrumb, index)=>(
                            
                            (index == 0)
                            ?                            
                              <li key={id} className="breadcrumb-item"><i className="bi bi-house"></i></li>
                            :

                              (breadcrumb.length-1 == index)
                              ?
                                <li key={id} data-page={index} className={ `breadcrumb-item ${breadcrumb.length == index ? 'active' : ''}` } aria-current="page">
                                    { titulo }
                                </li>
                              :
                                <li key={id} data-page={index} className={ `breadcrumb-item ${breadcrumb.length == index ? 'active' : ''}` } aria-current="page">
                                  <a href={enlace}>{ titulo }</a>
                                </li>
                              
                                

                          ))
                        }
                          
                      </ol>
                    </nav>

                  )
                }

                <h1>{ titulo }</h1>

                { !!mensaje ? ( <p>{ mensaje }</p> ) : false }

            </div>
        </div>

    </>
  )
}
