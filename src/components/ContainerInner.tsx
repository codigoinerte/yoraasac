import React from 'react'
import { ContainerInner as ContainerInterface } from '../interfaces'
import { Breadcrumb } from './Breadcrumb'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'

export const ContainerInner = ({ children, breadcrumb }: ContainerInterface) => {
  return (
    <>
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb breadcrumb={breadcrumb} />

        {/* main */}
        <Container>

        <div className="inner-page">{ children }</div>
        
        </Container>
                
        {/* footer */}
        <Footer/>
    </>
  )
}
