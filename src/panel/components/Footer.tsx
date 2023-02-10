import React from 'react'

export const Footer = () => {
  return (
    <>
        <nav className="navbar navbar-footer sticky-bottom bg-body-tertiary d-lg-none d-xl-none d-xxl-none">
            <div className="container">
                <ul className='navbar'>
                    <li className="nav-item dropup-center dropup">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle"></i>
                        <span>Mi perfil</span>
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Mi cuenta</a></li>
                        <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
                        <li><a className="dropdown-item" href="#"><span className="badge text-bg-secondary">4</span> Notificaciones</a></li>
                        <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-left"></i> salir</a></li>                    
                        
                      </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <div className="footer bg-secondary">
            <div className="container">

                <nav className="navbar">
                    <div className="container-fluid justify-content-center">
                        <p className="navbar-brand text-center" >Copyright &copy; 2023. Desarrollado por <a href="mailto:fmartinez.bpe@gmail.com">Fredy Martinez</a></p>
                    </div>
                </nav>

            </div>
        </div>
    </>
  )
}
