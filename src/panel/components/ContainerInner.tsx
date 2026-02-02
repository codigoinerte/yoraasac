import React from 'react'
import { ContainerInner as ContainerInterface } from '../interfaces'
import { Breadcrumb } from './Breadcrumb'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const ContainerInner = ({ children, breadcrumb, titulo, classContainer }: ContainerInterface) => {
  return (
    <div className='font-sans min-h-dvh flex flex-column'>
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb breadcrumb={breadcrumb} titulo={titulo}/>

        {/* main */}
        <Container classContainer={classContainer}>

        <div className="inner-page bg-transparent">{ children }</div>
        
        </Container>
                
        {/* footer */}
        <Footer/>
    </div>
  )
}
