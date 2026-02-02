import React from 'react'
import { Link } from 'react-router-dom'
import { breadcrumb, breadcrumbInterface } from '../interfaces'
import { Menu } from './Menu';
import clsx from 'clsx';

export const Breadcrumb = ({ titulo, mensaje, breadcrumb, className }:breadcrumbInterface) => {

  const mainTitulo =  titulo ? titulo : breadcrumb[breadcrumb.length-1].titulo;

  return (
    <>

        <div className={clsx(`breadcrumb-container bg-background text-foreground py-5 `, className?.includes("bg-") ? className : "bg-stone-50")}>
            <div className="container">
              <div className='w-full grid grid-cols-[auto_60px]'>
                <div className='flex flex-col justify-between'>
                  {/* text-gray-500 */}
                    {
                      breadcrumb.length > 0 &&
                      (
                        <div>
                          <nav aria-label="breadcrumb">
                            <ol className="flex items-center gap-2 text-xs uppercase">

                            <li>
                              <Link to="/"><i className="bi bi-house" style={{color:'inherit'}}></i></Link>
                            </li>

                              {
                                breadcrumb.map(({ id, enlace, titulo }:breadcrumb, index)=>(
                                  
                                  (breadcrumb.length-1 == index)
                                  ?
                                    <React.Fragment key={id}>
                                      <span>/</span>
                                      <li data-page={index} className={ `${breadcrumb.length == index ? 'active' : ''} font-sans text-inherit` } aria-current="page">
                                          { titulo }
                                      </li>
                                    </React.Fragment>
                                  :
                                    <React.Fragment  key={id}>
                                      <li data-page={index} className={ `${breadcrumb.length == index ? 'active' : ''} font-sans text-inherit` } aria-current="page">
                                        <Link to={enlace}>{ titulo }</Link>
                                      </li>
                                    </React.Fragment>
                                ))
                              }
                                
                            </ol>
                          </nav>
                        </div>
                      )
                    }
                  
                    <h1 
                      className='font-bold uppercase tracking-wide text-foreground mb-0 font-sans text-inherit'
                      style={{
                        lineHeight:"18px",
                        fontSize:"1.15rem"
                      }}>{ mainTitulo }</h1>

                    { !!mensaje ? ( <p className='leading-0 font-sans'>{ mensaje }</p> ) : false }
                </div>
                <div className='items-end justify-end self-center text-right'>
                  <Menu />
                </div>
              </div>


            </div>
        </div>

    </>
  )
}
