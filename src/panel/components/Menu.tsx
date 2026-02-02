import { Box, LogOut, Menu as IconMenu } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Drawer, Nav, Placeholder, Sidenav } from 'rsuite';
import { useAuthStore, useDestacados } from '../../hooks';
import { Link } from 'react-router-dom';
import { Menu as MenuType } from '../interfaces';

const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;
const version = import.meta.env.VITE_VERSION ?? '';

export const Menu = () => {
  const [open, setOpen] = React.useState(false);
  
  
  const { user, startLogout } = useAuthStore();
  const logo = user.logo ? `${URL_IMAGENES}${user.logo}` : "";
  
  const [nodes, setNodes] = useState<MenuType[]>([]);
  const { loadDestacados } = useDestacados();
  const isLoaded = useRef(false);

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

  const initials = (user.name ?? 'Usuario').split(" ").map((name) => name[0]).join("");
  const currentUrl = document.location.href;
  return (
    <>
        <button
            onClick={() => setOpen(true)}
            type="button"
            style={{
                width:"50px",
                height:"50px",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#00466B",
                textTransform: "uppercase",
                color: "#fff",
                fontSize:"16px",
                fontWeight:"bold",
                border:"none",
                borderRadius: "100%",
                display:"flex"
            }}>            
                <IconMenu />          
        </button>
        <Drawer 
          open={open} 
          onClose={() => setOpen(false)}
          backdrop="static"
          
          style={{
            maxWidth:"320px",
            width:"98%"
          }}>
          <Drawer.Header 
            className='bg-[#22252c] text-white'
            closeButton={false}
            style={{
              padding:"15px 20px"
            }}>
            <Drawer.Title className='flex flex-row text-white'>
              <div className='flex-1'>
                <p>Menú</p>
              </div>
              <Button 
                className='bg-danger text-white'
                onClick={()=> setOpen(false)}>
                <i className="bi bi-x"></i>
              </Button>
            </Drawer.Title>            
          </Drawer.Header>
          <Drawer.Body
                className='bg-gray-100'
                style={{
                  padding:"0px",
                  display:"flex",
                  flexDirection:"column",
                  height:"calc(100% - 45px)"
                }}>

                <Sidenav 
                  as={"div"}
                  className='bg-transparent'>
                  <Sidenav.Body>
                    <Nav>
                      <Nav.Item 
                        eventKey={"home"}
                        href={"/"}
                        as={"div"}
                        style={{
                          padding: "0px",
                          background:"transparent"
                        }}>
                          <Link   
                            className="dropdown-item text-foreground hover:bg-[#00466B] hover:text-white"
                            to={"/"}
                            style={{
                              padding: "15px 20px",
                              display: "flex",
                              flexDirection:"row",
                              gap: "1rem",
                              textDecoration:"none"
                            }}>
                            <Box />
                            Home
                          </Link>
                      </Nav.Item>                    
                      {
                          nodes.map(({ alias, id, icono, nombre }, index)=>{
                            
                            
                            const parts = alias.split("/");
                            const baseCategory = parts[1] ?? null;
                            
                            const isActive = baseCategory ? currentUrl.includes(baseCategory) : false;

                            return (
                              <Nav.Item 
                                  key={`${id}-${nombre}`} 
                                  eventKey={index.toString()}                                  
                                  href={alias}
                                  as={"div"}
                                  style={{
                                    padding: "0px",
                                    background:"transparent"
                                  }}>
                                    <Link   
                                      className={`dropdown-item text-foreground hover:bg-[#00466B] hover:text-white ${isActive?"bg-[#00466B] text-white" : ""}` }
                                      to={alias}
                                      style={{
                                        padding: "15px 20px",
                                        display: "flex",
                                        flexDirection:"row",
                                        gap: "1rem",
                                        textDecoration:"none"
                                      }}>
                                      <Box />
                                      {nombre}
                                    </Link>
                                </Nav.Item>
        
                          )})
                      }
                    </Nav>
                      
                  </Sidenav.Body>
                </Sidenav>

                <div className='flex-1'></div>
                <button 
                  className="dropdown-item w-full px-[20px] py-[15px] font-bold text-foreground flex flex-row gap-[1rem] text-white bg-danger"
                  onClick={()=>startLogout() }>
                    <LogOut /> salir
                </button>
                <Drawer.Footer>

                </Drawer.Footer>
          </Drawer.Body>
        </Drawer>
    </>
  )
}
