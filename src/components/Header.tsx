import React from 'react'
import profile from '~assets/images/profile.jpg';
import logo  from '~assets/images/logo.png';

export const Header = () => {
  return (
    <>
        <div className="header bg-primary">
        <div className="container">

        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="Yoraasac" loading='lazy' width={70}/>
            </a>
            <button className="navbar-toggler principal" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <div className="display-responsive">
                <div className="d-flex justify-content-end">

                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-x"></i>
                  </button>

                </div>
              </div>

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">               

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Entidades
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Cliente</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Proveedores</a></li>                    
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Personal</a></li>
                  </ul>
                </li>
                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stock
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Helados</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Barquillos</a></li>                    
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Baterias</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Productos
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-plus"></i> Nuevo producto</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Productos</a></li>                    
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Marcas</a></li>
                  </ul>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link" href="#">Nota heladero</a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Facturaci&oacute;n
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Boletas</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Facturas</a></li>                    
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-text"></i> Nota de venta</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Reportes
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-earmark-bar-graph"></i> Helados</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-earmark-bar-graph"></i> Barquillos</a></li>                    
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-earmark-bar-graph"></i> Baterias</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-file-earmark-bar-graph"></i> Personal</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Configuraci&oacute;n
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Atajos</a></li>
                    
                  </ul>
                </li>
                
                <li className="nav-item dropdown display-responsive">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mi perfil
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Mi cuenta</a></li>
                    <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
                    <li><a className="dropdown-item" href="#"><span className="badge text-bg-secondary">4</span> Notificaciones</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-left"></i> salir</a></li>                    
                    
                  </ul>
                </li>
                
              </ul>  

              <div className="d-flex display-desktop">
                <div className="dropdown">
                  <button className="btn btn-profile dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profile} alt="" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    <li><a className="dropdown-item" href="#">Mi cuenta</a></li>
                    <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
                    <li><a className="dropdown-item" href="#"><span className="badge text-bg-secondary">4</span> Notificaciones</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-left"></i> salir</a></li>                    
                  </ul>
                </div>
              </div>



            </div>
          </div>
        </nav>

        </div>
      </div>
    </>
  )
}
