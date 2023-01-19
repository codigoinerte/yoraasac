import React from 'react'
import { breadcrumbInterface } from '../interfaces'

export const Breadcrumb = ({ titulo, mensaje, breadcrumb }:breadcrumbInterface) => {
  return (
    <>

        <div className="breadcrumb-container bg-primary">
            <div className="container">

                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#"><i className="bi bi-house"></i></a></li>
                    <li className="breadcrumb-item active" aria-current="page">Pagina principal</li>
                </ol>
                </nav>

                <h1>{ titulo }</h1>

                { !!mensaje ? ( <p>{ mensaje }</p> ) : false }

            </div>
        </div>

    </>
  )
}
