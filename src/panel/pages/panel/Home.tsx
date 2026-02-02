import React, { useEffect, useState } from 'react'
import { Footer, Container, Breadcrumb, Header } from '../../components'
import { useAuthStore, useDestacados } from '../../../hooks';
import { Menu } from '../../helpers';


export const Home = () => {

    const { user } = useAuthStore();
    
  return (
    <>         
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb 
            titulo="Pagina principal" breadcrumb={[]} 
            mensaje={`Bienvenido ${user!.name??''}`}
            className='!bg-[#22252c] text-white' />

        {/* main */}
        <Container
            className='flex items-center justify-center !bg-stone-200'>

        <ul className='atajos-homes row'>

        {
                  Menu.map(({nombre, icono, alias}, index)=>(
                        <li key={alias} className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
                            <a href={alias} className='btn-category'>
                                <i className={icono??"bi bi-files"}></i>
                                <span>{nombre}</span>
                            </a>
                        </li>))
        }



        </ul>     
        
        </Container>
                

        {/* footer */}
        <Footer/>
    </>
  )
}
