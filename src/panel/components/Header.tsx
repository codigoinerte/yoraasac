import React from 'react'
import profile from '../assets/images/profile.jpg';
import logo  from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Menu } from '../helpers';

export const Header = () => {
  return (
    <>
        <div className="header bg-primary">
        <div className="container">

        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand d-none d-sm-none d-md-none d-lg-flex d-flex" to="/">
              <img src={logo} alt="Yoraasac" loading='lazy' width={70}/>
            </Link>
            <button className="navbar-toggler principal" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">              

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                  Menu.map(({nombre, icono, alias}, index)=>(
                    <li key={alias} className="nav-item dropdown">
                      <Link className="dropdown-item" to={alias}>
                        <i className={icono}></i> 
                        <span>{nombre}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>              

              <div className="d-none d-sm-none d-md-none d-lg-flex d-flex display-desktop">
                <div className="dropdown">
                  <button className="btn btn-profile dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={profile} alt="Yorasaac" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    <li><Link className="dropdown-item" to="/mi-cuenta">Mi cuenta</Link></li>
                    <li><Link className="dropdown-item" to="/mi-cuenta">Cambiar contraseña</Link></li>
                    <li><Link className="dropdown-item" to="/notificaciones"><span className="badge text-bg-secondary">4</span> Notificaciones</Link></li>
                    <li><button className="dropdown-item" onClick={()=>console.log(1)}><i className="bi bi-box-arrow-left"></i> salir</button></li>
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
