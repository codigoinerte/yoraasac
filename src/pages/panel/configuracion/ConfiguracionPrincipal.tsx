import React from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Configuración principal', enlace: '' }
];

export const ConfiguracionPrincipal = () => {
    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>

            <FormControls page="configuracion" save={()=>console.log(1)} tipo='edit' />

            <hr className='border border-1 opacity-50'/>

            <div className="card">
                <div className="card-header">
                    Datos del emisor
                </div>
                <div className="card-body">
                    
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="ruc" className="form-label">Ruc</label>
                                <input type="text" className="form-control" id="ruc" aria-describedby="ruc" placeholder='Ruc'/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Razon social</label>
                                <input type="text" className="form-control" id="razon-social" aria-describedby="razon-social" placeholder='Razon social'/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="razon-comercial" className="form-label">Razon comercial</label>
                                <input type="text" className="form-control" id="razon-comercial" aria-describedby="razon-comercial" placeholder='Razon comercial'/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="pagina-web" className="form-label">P&aacute;gina web</label>
                                <input type="text" className="form-control" id="pagina-web" aria-describedby="pagina-web" placeholder='Pagina web'/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email de la empresa</label>
                                <input type="email" className="form-control" id="email" aria-describedby="email" placeholder='Email'/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="celular" className="form-label">Celular empresa</label>
                                <input type="tel" className="form-control" id="celular" aria-describedby="celular" placeholder='Email'/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            
                            <div className="mb-3">
                                <label htmlFor="celular" className="form-label">Celular empresa</label>
                                <input type="tel" className="form-control" id="celular" aria-describedby="celular" placeholder='Email'/>
                            </div>

                        </div>


                    </div>


                </div>
            </div>

            <div className="card mt-3">
                <div className="card-header">
                    Contactos de la empresa
                </div>
                <div className="card-body"> 

                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">                                
                            <div className="mb-3">
                                <label htmlFor="nombre_contacto" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre_contacto" aria-describedby="nombre_contacto" placeholder='Email'/>
                            </div>                            
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="email_contacto" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email_contacto" aria-describedby="email_contacto" placeholder='Email'/>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="celular_contacto" className="form-label">Celular</label>
                                <input type="tel" className="form-control" id="celular_contacto" aria-describedby="celular_contacto" placeholder='Email'/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="celular_contacto" className="form-label">Principal</label>
                                <select name="principal" id="principal" className='form-control'>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                            </div>
                        </div>
                      
                    </div>

                </div>
            </div>
            
            <div className="card mt-3">
                <div className="card-header">
                    Configuraci&oacute;n de facturas, boletas, notas, etc.
                </div>
                <div className="card-body"> 

                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3">
                                <label htmlFor="precio_venta" className="form-label">IGV</label>
                                <select name="precio_venta" id="precio_venta" className='form-control'>
                                    <option value="18">18% IGV</option>
                                    <option value="10">10% (ley 31556)</option>
                                    <option value="4">4% IVA</option>
                                </select>
                            </div>
                        </div>                           

                    </div>

                </div>
            </div>                      
            </>
        </ContainerInner>
    )
}
