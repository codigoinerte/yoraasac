import React from 'react'
import { Footer, Container, Breadcrumb, Header } from '../../components'

export const Home = () => {
  return (
    <>         
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb titulo="Pagina principal" breadcrumb={[]} mensaje="Bienvenido Yonatan" />

        {/* main */}
        <Container>

        <ul className='atajos-homes row'>
        
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>

        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>

        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>

        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>

        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>

        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>
        <li className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
            <a href='#'>
            <i className="bi bi-files"></i>
            <span>Heladero nota</span>
            </a>
        </li>

        </ul>     
        
        </Container>
                

        {/* footer */}
        <Footer/>
    </>
  )
}
