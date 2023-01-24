import queryString from 'query-string';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List } from '../../../components';
import { breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock Baterias', enlace: '' },
];

export const StockBaterias = () => {
  
  const cabecera = [
    "Documento",
    "Nombre",
    "Fecha de creación"
];

const eliminar = (id:number) => {
    console.log(id);
}

const detalle:listaDetalle[] = [
  {
    id:1,
    campos: ["70035156", "BRIGITTE MERIDA PONCE VALENTIN", "15/06/2022"]        
  },
  {
    id:2,
    campos: ["70035156", "BRIGITTE MERIDA PONCE VALENTIN", "15/06/2022"]        
  },
  {
    id:3,
    campos: ["70035156", "BRIGITTE MERIDA PONCE VALENTIN", "15/06/2022"]        
  },
  {
    id:4,
    campos: ["70035156", "BRIGITTE MERIDA PONCE VALENTIN", "15/06/2022"]        
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
  <ContainerInner breadcrumb={breadcrumb}>
    <List   modulo='stock-baterias'
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
                        <label htmlFor="documento" className="form-label">Documento</label>
                        <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='Documento'/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                        <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido'/>
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
