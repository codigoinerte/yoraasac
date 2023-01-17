import React from 'react'
import * as bootstrap from 'bootstrap'
import * as Popper from "@popperjs/core"
import "./assets/css/main.scss";
import profile from './assets/images/profile.jpg';
import logo  from './assets/images/logo.png';
import "bootstrap-icons/font/bootstrap-icons.css";


export const App = () => {
  return (
    <>
      
      {/* header */}
      <div className="header bg-primary">
        <div className="container">

        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="Yoraasac" loading='lazy' width={100}/>
            </a>
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
                <li className="nav-item">
                  <a className="nav-link" href="#">Proveedores</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stock
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Helados</a></li>
                    <li><a className="dropdown-item" href="#">Barquillos</a></li>                    
                    <li><a className="dropdown-item" href="#">Baterias</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Productos</a>
                </li>                
                <li className="nav-item">
                  <a className="nav-link" href="#">Marcas</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Heladero nota</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Facturaci&oacute;n
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Boletas</a></li>
                    <li><a className="dropdown-item" href="#">Facturas</a></li>                    
                    <li><a className="dropdown-item" href="#">Nota de venta</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">RRHH</a>
                </li>                
                <li className="nav-item">
                  <a className="nav-link" href="#">Reportes</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Configuraci&oacute;n
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Atajos</a></li>
                    
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
      <div className="main">
        <div className="container">

        
          <ul className='atajos-homes row'>
            
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>

            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>

            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>

            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>

            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>

            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>
            <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
              <a href='#'>
                <i className="bi bi-files"></i>
                <span>Heladero nota</span>
              </a>
            </li>

          </ul>     
        


        </div>
      </div>

      {/* footer */}
      <div className="footer bg-secondary">
        <div className="container">

        <nav className="navbar fixed-bottom bg-body-tertiary">
          <div className="container-fluid justify-content-center">
            <a className="navbar-brand text-center" href="#">Copyright &copy; 2023. Desarrollado por <a href="mailto:fmartinez.bpe@gmail.com">Fredy Martinez</a></a>
          </div>
        </nav>

        </div>
      </div>

    </>
  )
}

export default App;