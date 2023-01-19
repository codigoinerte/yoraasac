import React from 'react'
import "./assets/css/main.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Home } from './pages';
import { Clientes } from './pages/Clientes';


export const App = () => {
  return (
    <>
      
      {/* <Home />*/}
      <Clientes />

    </>
  )
}

export default App;