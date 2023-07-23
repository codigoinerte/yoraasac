import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, ListReportes } from '../../../components';
import { ReporteItemNota, ReporteNotaForm, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useNotaHeladeroStore } from '../../../../hooks';
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Nota heladero', enlace: '' },
];


export const ReporteNotaHeladero = () => {

    const cabecera = [
        "DOCUMENTO",
        "NOMBRE",
        "ESTADO",
        "FECHA DE CREACIÓN",
        "FECHA DE APERTURA",
        "FECHA DE GUARDADO",
        "FECHA DE CIERRE",
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }

    const [detalle, setDetalle] = useState<listaDetalle[]>([]);
    const [imprimible, setImprimible] = useState<any[]>([]);

    const next = (e:paginationInterface) => {
        console.log(e);
    }
    
    const prev = (e:paginationInterface) => {
        console.log(e);
    }

    const navigate = useNavigate();

    const location = useLocation();
  
    const { q = '' } = queryString.parse(location.search);

    const { reporteHeladero, reporte } = useNotaHeladeroStore();

    useEffect(() => {
      
        const nuevoDetalle:listaDetalle[] = reporte.map((item)=> ({
            id: (item.id).toString(),
            campos: [
                (item.heladero_documento??'').toString(),
                (item.heladero_nombre??'').toString(),
                (item.estado??'').toString(),
                (item.created_at??'').toString(),
                (item.fecha_apertura??'').toString(),
                (item.fecha_guardado??'').toString(),
                (item.fecha_cierre??'').toString(),
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte.map((item)=>({
            heladero_documento: (item.heladero_documento??'').toString(),
            heladero_nombre: (item.heladero_nombre??'').toString(),
            estado: (item.estado??'').toString(),
            fecha_creacion: (item.created_at??'').toString(),
            fecha_apertura: (item.fecha_apertura??'').toString(),
            fecha_guardado: (item.fecha_guardado??'').toString(),
            fecha_cierre: (item.fecha_cierre??'').toString(),
        })))
        
    }, [reporte])
    

    const { register, handleSubmit, reset, formState:{ errors } } = useForm<ReporteNotaForm>();

    const onSubmit = async (params:ReporteNotaForm)=>{
        
        await reporteHeladero(params);
    }

    const resetear = () =>{
        reset();
        setDetalle([]);
    }

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Generar reporte de notas de heladeros">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={eliminar}
                    next={next}
                    prev={prev}>
                
                <form onSubmit={handleSubmit(onSubmit)}>                    
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Documento</label>
                                <input type="text" className="form-control" aria-describedby="Buscador" placeholder='Documento' {...register("documento")}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                                <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido' {...register("nombre")}/>
                            </div>
                        </div>                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de inicio</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion" {...register("fecha_inicio")}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="fecha_fin" className="form-label">Fecha fin</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_fin" aria-describedby="fechafin" {...register("fecha_fin")}/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3 w-100 gap-2 d-flex flex-column flex-md-row">
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Generar reportes</button>
                                {
                                    (detalle) &&
                                    (
                                        <>
                                        <CSVLink filename={`reporte-nota-healdero-${moment().format()}.csv`} className="text-decoration-none btn btn-success text-center w-100" type="button" data={imprimible}><i className="bi bi-cloud-arrow-down"></i> Descargar</CSVLink>;
                                        <button className="btn btn-danger text-center w-100" type="button" onClick={resetear}><i className="bi bi-trash"></i> resetear</button>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </form>
                
            </ListReportes>
        </ContainerInner>
    )
}
