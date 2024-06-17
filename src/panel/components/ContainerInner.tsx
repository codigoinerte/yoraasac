import React from 'react'
import { ContainerInner as ContainerInterface } from '../interfaces'
import { Breadcrumb } from './Breadcrumb'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const ContainerInner = ({ children, breadcrumb, titulo, classContainer }: ContainerInterface) => {
  return (
    <>
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb breadcrumb={breadcrumb} titulo={titulo}/>

        {/* main */}
        <Container classContainer={classContainer}>

        <div className="inner-page">{ children }</div>
        
        </Container>
                
        {/* footer */}
        <Footer/>
    </>
  )
}
