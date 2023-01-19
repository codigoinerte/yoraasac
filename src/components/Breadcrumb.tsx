import React from 'react'

export const Breadcrumb = () => {
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

                <h1>P&aacute;gina principal</h1>

                <p>Bienvenido Yonatan</p>

            </div>
        </div>

    </>
  )
}
