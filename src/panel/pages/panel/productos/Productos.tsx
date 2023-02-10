import queryString from 'query-string';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List, ListPersonal } from '../../../components'
import { Breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';

const breadcrumb:bread[] = [  
    { id:1, titulo: 'Productos', enlace: '' },
];  

export const Productos = () => {

    const cabecera = [
        "Código",
        "Producto",
        "Moneda",
        "Prec. venta",
        "Estado",
        "Fecha de creación"
    ];
    
    const eliminar = (id:number) => {
        console.log(id);
    }
    
    const detalle:listaDetalle[] = [
      {
        id:1,
        campos: ["100001", "Helado 1", "Soles", "2.00", "Publicado", "15/06/2022"]        
      },
      {
        id:2,
        campos: ["100001", "Helado 1", "Soles", "2.00", "Publicado", "15/06/2022"]        
      },
      {
        id:3,
        campos: ["100001", "Helado 1", "Soles", "2.00", "Publicado", "15/06/2022"]        
      },
      {
        id:4,
        campos: ["100001", "Helado 1", "Soles", "2.00", "Publicado", "15/06/2022"]        
      },
      {
        id:5,
        campos: ["100001", "Helado 1", "Soles", "2.00", "Publicado", "15/06/2022"]        
      },
      {
        id:6,
        campos: ["100001", "Helado 1", "Soles", "2.00", "Publicado", "15/06/2022"]        
      },
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
        <ContainerInner breadcrumb={breadcrumb}>
            <List   page='productos'
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

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Código</label>
                                <input type="text" className="form-control" id="codigo" aria-describedby="Buscador" placeholder='Código'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="producto" className="form-label">Producto</label>
                                <input type="text" className="form-control" id="producto" aria-describedby="Buscador" placeholder='Productos'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de creaci&oacute;n</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion"/>
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
