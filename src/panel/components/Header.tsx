import React, { useEffect, useRef, useState } from 'react'
import profile from '../assets/images/profile.png';
// import logo  from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
// import { Menu } from '../helpers';
import { useAuthStore, useDestacados } from '../../hooks';
import { Menu } from '../interfaces';

export const Header = () => {

      const { startLogout } = useAuthStore();
      const [nodes, setNodes] = useState<Menu[]>([]);
      const { loadDestacados } = useDestacados();
      const isLoaded = useRef(false);

      const version = import.meta.env.VITE_VERSION ?? '';

      useEffect(() => {
        if (isLoaded.current) return;
    
        const itemStorage = `menuHeader${version}`;
        const menuHeader = localStorage.getItem(`menuHeader${version}`);
        if (menuHeader) {
          setNodes(JSON.parse(menuHeader));
        } else {
            Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('menuHeader')) {
              localStorage.removeItem(key);
            }
            });
          loadDestacados().then((response) => {
            const menuSaved = response.destacado ?? [];
            localStorage.setItem(itemStorage, JSON.stringify(menuSaved));
            setNodes(menuSaved);
          });
        }
    
        isLoaded.current = true;
      }, []);

  return (
    <>
        <div className="header bg-primary">
        <div className="container">

        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            {/* <Link className="navbar-brand d-none d-sm-none d-md-none d-lg-flex d-flex" to="/">
              <img src={logo} alt="Yoraasac" loading='lazy' width={70}/>
            </Link> */}
            <button className="navbar-toggler principal" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">              

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li key={"home-header"} className="nav-item dropdown">
                    <Link className="dropdown-item" to={'/'}>
                      <i className={"bi bi-house"}></i> 
                      <span>{"Principal"}</span>
                    </Link>
                </li>
              {
                  nodes.map(({ alias, id, icono, nombre })=>(
                      
                        <li key={`${id}-${nombre}`} className="nav-item dropdown">
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
                    {/* <li><Link className="dropdown-item" to="/notificaciones"><span className="badge text-bg-secondary">4</span> Notificaciones</Link></li> */}
                    <li><button className="dropdown-item" onClick={()=>startLogout() }><i className="bi bi-box-arrow-left"></i> salir</button></li>
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
