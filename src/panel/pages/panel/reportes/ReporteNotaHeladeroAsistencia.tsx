import { useEffect, useState } from 'react'
import { ContainerInner, ListReportes } from '../../../components';
import { breadcrumb as bread, listaDetalle } from '../../../interfaces';
import { usePersonasStore } from '../../../../hooks';
import { CSVLink } from "react-csv";
import moment from 'moment';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Nota heladero', enlace: '' },
];


export const ReporteNotaHeladeroAsistencia = () => {

    const cabecera = [
        "DOCUMENTO",
        "NOMBRE",
        "ASISTENCIAS"
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
                <button class="btn btn-sm ${item.asistio?'btn-success':'btn-danger'}">
                    <i class="bi ${item.asistio?'bi-check':'bi-x'}"></i>
                </button>
                `
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte.map((item)=>({
            heladero_documento: (item.documento??'').toString(),
            heladero_nombre: (item.heladero_nombre??'').toString(),
            asistio: item.asistio?'si':'no',
        })))
        
    }, [reporte]);
    
    const resetear = () =>{
        setDetalle([]);
    }

    useEffect(() => {
        reporteHeladeroAsistencia();
    }, []);

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Reporte de asistencia de hoy">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={()=>{}}>
                
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3 w-100 gap-2 d-flex flex-column flex-md-row">
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Generar reportes</button>
                                {
                                    (detalle.length > 0) &&
                                    (
                                        <>
                                        <CSVLink filename={`reporte-healdero-asistencia-${moment().format()}.csv`} className="text-decoration-none btn btn-success text-center w-100" type="button" data={imprimible}><i className="bi bi-cloud-arrow-down"></i> Descargar</CSVLink>
                                        <button className="btn btn-danger text-center w-100" type="button" onClick={resetear}><i className="bi bi-trash"></i> resetear</button>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                
                
            </ListReportes>
        </ContainerInner>
    )
}
