import React from 'react'
import { ContainerInner, FormControls } from '../../../components';
import { breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Mi cuenta', enlace: '' }
];


export const Notificaciones = () => {
    return (
        <ContainerInner breadcrumb={breadcrumb}>
        <>
    
            <div className="row">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-1">
                    <div className="alert alert-primary d-flex align-content-center" role="alert">
                        <span className='w-100 text-middle'>Mensaje del sistema</span>
                        <button type="button" className="btn btn-primary"><i className="bi bi-trash3"></i></button>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-1">
                    <div className="alert alert-primary d-flex align-content-center" role="alert">
                        <span className='w-100 text-middle'>Mensaje del sistema</span>
                        <button type="button" className="btn btn-primary"><i className="bi bi-trash3"></i></button>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-1">
                    <div className="alert alert-primary d-flex align-content-center" role="alert">
                        <span className='w-100 text-middle'>Mensaje del sistema</span>
                        <button type="button" className="btn btn-primary"><i className="bi bi-trash3"></i></button>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-1">
                    <div className="alert alert-primary d-flex align-content-center" role="alert">
                        <span className='w-100 text-middle'>Mensaje del sistema</span>
                        <button type="button" className="btn btn-primary"><i className="bi bi-trash3"></i></button>
                    </div>
                </div>
                
            </div>
                       
        </>
    </ContainerInner>
      )
}
