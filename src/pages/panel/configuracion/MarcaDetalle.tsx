import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerInner, FormControls } from '../../../components';
import { breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Marcas', enlace: '/configuracion/marca' },
    { id:2, titulo: 'Marca detalle', enlace: '' }
];

export const MarcaDetalle = () => {
  
    const { id = 0 } = useParams();

    const navigate = useNavigate();
  
    const onNavigateBack = () => {
        navigate(-1);
    }
  
    return (
      <ContainerInner breadcrumb={breadcrumb}>
          <>
            <FormControls page="productos" save={()=>console.log(1)} />
  
              <hr className='border border-1 opacity-50'/>
  
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h4>Informaci&oacute;n</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                        
                  <div className="mb-3">
                      <label htmlFor="marca" className="form-label">Marca</label>
                      <input type="text" className="form-control" id="marca" aria-describedby="marca" placeholder='Nombre de marca' />
                  </div>                     
                    
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select name="estado" id="estado" className='form-control'>
                            <option value="1">Disponible</option>
                            <option value="2">Descontinuado</option>
                        </select>
                    </div>

                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        
                    <div className="mb-3">
                        <label htmlFor="proveedor" className="form-label">Proveedor</label>
                        <select name="proveedor" id="proveedor" className='form-control'>
                            <option value="1">Proveedor 1</option>
                            <option value="2">Proveedor 2</option>
                        </select>
                    </div>
                        
                    </div>
                </div>

              </div>
          </>
      </ContainerInner>
    )
}
