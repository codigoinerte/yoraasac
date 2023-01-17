import React from 'react'
import * as bootstrap from 'bootstrap'
import * as Popper from "@popperjs/core"
import "./assets/css/main.scss";
import profile from './assets/images/profile.jpg';
import "bootstrap-icons/font/bootstrap-icons.css";


export const App = () => {
  return (
    <>
      
      {/* header */}
      <div className="header bg-primary">
        <div className="container">

        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Clientes</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Productos
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>                    
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                
              </ul>  

              <div className="d-flex">
                <div className="dropdown">
                  <button className="btn btn-profile dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profile} alt="" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
              </div>



            </div>
          </div>
        </nav>

        </div>
      </div>

      {/* breadcrumb */}
      <div className="breadcrumb-container bg-primary">
        <div className="container">

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#"><i className="bi bi-house"></i></a></li>
            <li className="breadcrumb-item active" aria-current="page">Pagina principal</li>
          </ol>
        </nav>

        <h1>P&aacute;gina principal</h1>


        </div>
      </div>

      {/* main */}
      <div className="main bg-secondary">
        <div className="container">

        </div>
      </div>

      {/* footer */}
      <div className="footer bg-secondary">
        <div className="container">

        </div>
      </div>

    </>
  )
}

export default App;