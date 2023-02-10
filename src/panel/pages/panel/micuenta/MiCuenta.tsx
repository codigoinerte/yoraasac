import React from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Mi cuenta', enlace: '' }
];


export const MiCuenta = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
    <>

    <FormControls page="micuenta" save={()=>console.log(1)} tipo='edit' />

    <hr className='border border-1 opacity-50'/>

    <div className="card">
        <div className="card-header">
            Mis datos de contacto
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
                        <label htmlFor="departamento" className="form-label">Departamento</label>
                        <select name="departamento" id="departamento" className='form-control'>
                            <option value="">-Seleccione una opci&oacute;n-</option>
                        </select>
                    </div>

                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                    
                    <div className="mb-3">
                        <label htmlFor="provincia" className="form-label">Provincia</label>
                        <select name="provincia" id="provincia" className='form-control'>
                            <option value="">-Seleccione una opci&oacute;n-</option>
                        </select>
                    </div>

                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                    
                    <div className="mb-3">
                        <label htmlFor="distrito" className="form-label">Distrito</label>
                        <select name="distrito" id="distrito" className='form-control'>
                            <option value="">-Seleccione una opci&oacute;n-</option>
                        </select>
                    </div>

                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                        
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">Direcci&oacute;n</label>
                        <input type="text" className="form-control" id="direccion" aria-describedby="direccion" placeholder='Dirección'/>
                    </div>

                </div>

            </div>


        </div>
    </div>

    <div className="card mt-3">
        <div className="card-header">
            Mis datos de login
        </div>
        <div className="card-body"> 

            <div className="row">

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        
                    <div className="mb-3">
                        <label htmlFor="usuario" className="form-label">Usuario</label>
                        <input type="text" className="form-control" id="usuario" aria-describedby="usuario" placeholder='Usuario'/>
                    </div>

                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contrase&ntilde;a</label>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="contraseña" />
                            <button className="btn btn-primary" type="button" id="button-addon2"><i className="bi bi-eye"></i></button>
                        </div>
                    </div>

                </div>                                        
              
            </div>

        </div>
    </div>
                   
    </>
</ContainerInner>
  )
}
