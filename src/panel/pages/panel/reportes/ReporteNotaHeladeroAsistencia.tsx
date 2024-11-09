import { useEffect, useState } from 'react'
import { ContainerInner, ListReportes } from '../../../components';
import { breadcrumb as bread, listaDetalle } from '../../../interfaces';
import { usePersonasStore } from '../../../../hooks';
import { CSVLink } from "react-csv";
import moment from 'moment';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Reporte de asistencia de hoy', enlace: '' },
];


export const ReporteNotaHeladeroAsistencia = () => {

    const cabecera = [
        "Documento",
        "Nombre",
        "Apertura",
        "Cierre"
    ];

    const [detalle, setDetalle] = useState<listaDetalle[]>([]);
    const [imprimible, setImprimible] = useState<any[]>([]);
    
    const { listReporteNotaHeladero: reporte, reporteHeladeroAsistencia } = usePersonasStore();

    useEffect(() => {
      
        const nuevoDetalle:listaDetalle[] = reporte.map((item)=> ({
            id: (item.id).toString(),
            campos: [
                (item.documento??'').toString(),
                (item.heladero_nombre??'').toString(),
                `
                <button class="btn btn-sm ${item.asistencia_apertura?'btn-success':'btn-danger'}">
                    <i class="bi ${item.asistencia_apertura?'bi-check':'bi-x'}"></i>
                </button>
                `,
                `
                <button class="btn btn-sm ${item.asistencia_cierre?'btn-success':'btn-danger'}">
                    <i class="bi ${item.asistencia_cierre?'bi-check':'bi-x'}"></i>
                </button>
                `
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte.map((item)=>({
            "heladero documento": (item.documento??'').toString(),
            "heladero nombre": (item.heladero_nombre??'').toString(),
            "asistencia apertura": item.asistencia_apertura?'si':'no',
            "asistencia cierre": item.asistencia_cierre?'si':'no',
        })))
        
    }, [reporte]);
    
    useEffect(() => {
        reporteHeladeroAsistencia();
    }, []);

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Reporte de asistencia de hoy">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={()=>{}}
                    routeBack={'/reportes'}
                    routeBackLabel={'Volver a las categorias'}>
                
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3 w-100 gap-2 d-flex flex-column flex-md-row">
                                {
                                    (detalle.length > 0) &&
                                    (
                                        <CSVLink filename={`reporte-healdero-asistencia-${moment().format()}.csv`} className="text-decoration-none btn btn-success text-center w-100" type="button" data={imprimible}><i className="bi bi-cloud-arrow-down"></i> Descargar</CSVLink>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                
                
            </ListReportes>
        </ContainerInner>
    )
}
