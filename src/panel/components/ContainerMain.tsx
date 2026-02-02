import React from 'react'
import { ContainerInner as ContainerInterface } from '../interfaces'
import { Breadcrumb } from './Breadcrumb'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const ContainerMain = ({ children, breadcrumb }: ContainerInterface) => {
    
    document.body.classList.add("bg-stone-200");

    return (
        <>
            {/* header */}
            <Header />
    
            {/* breadcrumb */}
            <Breadcrumb 
                breadcrumb={breadcrumb}
                className='!bg-[#22252c] text-white' />
    
            {/* main */}
            <Container
                className='flex items-center justify-center bg-stone-300 py-8'>
    
                { children }
            
            </Container>
                    
            {/* footer */}
            <Footer/>
        </>
      )
}
