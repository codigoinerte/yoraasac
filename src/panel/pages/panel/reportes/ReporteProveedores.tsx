import { ContainerInner, ListReportes } from '../../../components';
import { breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Proveedores', enlace: '' },
];


export const ReporteProveedores = () => {

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
        <ContainerInner breadcrumb={breadcrumb} titulo="Generar reporte de proveedores">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={eliminar}
                    next={next}
                    prev={prev}>
                
                <form>                    
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Documento</label>
                                <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='Documento'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                                <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido'/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="distrito" className="form-label">Distrito</label>
                                <select name="distrito" id="distrito" className="form-control">
                                    <option value="">-Seleccione una opción-</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de inicio</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="fecha_fin" className="form-label">Fecha fin</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_fin" aria-describedby="fechafin"/>
                            </div>
                        </div>
                        
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
