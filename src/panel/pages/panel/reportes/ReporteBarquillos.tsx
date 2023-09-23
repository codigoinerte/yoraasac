import { ContainerInner, ListReportes } from '../../../components';
import { breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Barquillos', enlace: '' },
];


export const ReporteBarquillos = () => {


    const cabecera = [
        "Fecha de reporte",        
        "Titulo del reporte"
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }

    const detalle:listaDetalle[] = [];

    const next = (e:paginationInterface) => {
        console.log(e);
    }
    
    const prev = (e:paginationInterface) => {
        console.log(e);
    }

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Generar reporte de stock barquillos">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={eliminar}
                    next={next}
                    prev={prev}>
                
                <form>                    
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3 w-100">                                
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Generar reportes</button>
                            </div>
                        </div>

                    </div>
                </form>
                
            </ListReportes>
        </ContainerInner>
    )
}
