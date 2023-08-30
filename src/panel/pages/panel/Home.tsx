import React, { useEffect, useState } from 'react'
import { Footer, Container, Breadcrumb, Header } from '../../components'
import { useDestacados } from '../../../hooks';
import { Menu } from '../../interfaces';

export const Home = () => {

    const [nodes, setNodes] = useState<Menu[]>([]);

    const { loadDestacados } = useDestacados();

    useEffect(() => {
      
        loadDestacados()
        .then((response)=>{
            const menuSaved = response.destacado ?? [];

            setNodes(menuSaved);
        })
        
    }, [])
    

  return (
    <>         
        {/* header */}
        <Header />

        {/* breadcrumb */}
        <Breadcrumb titulo="Pagina principal" breadcrumb={[]} mensaje="Bienvenido" />

        {/* main */}
        <Container>

        <ul className='atajos-homes row'>

        {
            nodes.map(({ alias, id, icono, nombre })=>(

                <li key={id} className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
                    <a href={alias}>
                        <i className={icono??"bi bi-files"}></i>
                        <span>{nombre}</span>
                    </a>
                </li>

            ))
        }        


        </ul>     
        
        </Container>
                

        {/* footer */}
        <Footer/>
    </>
  )
}
