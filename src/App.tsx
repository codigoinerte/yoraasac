import React from 'react'
import "./assets/css/main.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Home } from './pages';
import { Clientes } from './pages/Clientes';
import { ClientesDetalle } from './pages/ClientesDetalle';


export const App = () => {
  return (
    <>
      
      {/* <Home />*/}
      <Clientes />
      {/* <ClientesDetalle /> */}

    </>
  )
}

export default App;