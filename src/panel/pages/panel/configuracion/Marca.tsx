import queryString from 'query-string';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List, ListSave } from '../../../components'
import { breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Marcas', enlace: '' },
];


export const Marca = () => {

    const cabecera = [
        "Marca",      
        "Fecha de creación"
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }

    const detalle:listaDetalle[] = [
      {
        id:1,
        campos: ["Donofrio", "15/06/2022"]        
      },
      {
        id:2,
        campos: ["Donofrio", "15/06/2022"]        
      },
      {
        id:3,
        campos: ["Donofrio", "15/06/2022"]        
      },
      {
        id:4,
        campos: ["Donofrio", "15/06/2022"]        
      }
    ];

    const next = (e:paginationInterface) => {
        console.log(e);
    }
    
    const prev = (e:paginationInterface) => {
        console.log(e);
    }

    const navigate = useNavigate();

    const location = useLocation();
  
    const { q = '' } = queryString.parse(location.search);
    
    

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Marcas"> 

            <List 
                    page='marcas'
                    category='configuracion'
                    cabecera={cabecera} 
                    detalle={detalle}               
                    eliminar={eliminar}
                    next={next}
                    prev={prev}>
                <>
                <form>
                    <div className="row">
                        <div className="col-xs-12">
                            <h5>Buscador</h5>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-10">
                            <div className="mb-3">
                                <label htmlFor="marcas" className="form-label">Marca</label>
                                <input type="text" className="form-control" id="marcas" aria-describedby="Buscador" placeholder='Marcas'/>
                            </div>
                        </div>                        
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
                            <div className="mb-3 w-100">                                
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Buscar</button>
                            </div>
                        </div>

                    </div>
                </form>
                </>
            </List>
    
  
        </ContainerInner>
    )
}
