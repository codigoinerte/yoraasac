import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, ListReportes } from '../../../components';
import { ReporteNotaForm, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useFacturastore } from '../../../../hooks';
import { useForm } from 'react-hook-form';
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Factura', enlace: '' },
];


export const ReporteFacturas = () => {

    const cabecera = [
        "Num. doc.",        
        "Tipo",
        "Cliente",
        "Moneda",
        "Monto",
        "Estado",
        "Fecha creación",
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }

    const [detalle, setDetalle] = useState<listaDetalle[]>([]);

    const [imprimible, setImprimible] = useState<any[]>([]);


    const navigate = useNavigate();

    const location = useLocation();
  
    const { q = '' } = queryString.parse(location.search);

    const { reporte, reproteFacturacion } = useFacturastore();

    useEffect(() => {
      
        const nuevoDetalle:listaDetalle[] = reporte?.map((item)=> ({
            id: (item.id).toString(),
            campos: [
                `${item.serie}-${item.correlativo}`,
                (item.documento??'').toString(),
                (item.usuario_nombre??'').toString(),
                (item.moneda??'').toString(),
                (parseFloat(item.total??'').toFixed(2)).toString(),
                (item.estado??'').toString(),
                (item.created_at??'').toString(),
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte?.map((item)=>({
            serie:`${item.serie}-${item.correlativo}`,
            documento:(item.documento??'').toString(),
            nombre:(item.usuario_nombre??'').toString(),
            moneda:(item.moneda??'').toString(),
            total:(item.total??'').toString(),
            estado:(item.estado??'').toString(),
            creacion:(item.created_at??'').toString(),
        })))
        
    }, [reporte]);
    
    useEffect(() => {
        
        //listNotaHeladeroEstado();

    }, []);

    const { register, handleSubmit, reset, formState:{ errors } } = useForm<ReporteNotaForm>();

    const onSubmit = async (params:ReporteNotaForm)=>{
        
        await reproteFacturacion(params);
    }

    const resetear = () =>{
        reset();
        setDetalle([]);
    }


    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Generar reporte de Facturas y Boletas">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={eliminar}>
                
                <form onSubmit={handleSubmit(onSubmit)}>                    
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Num. doc facturado</label>
                                <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='F001-01' {...register("documento")}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="nombres" className="form-label">Cliente</label>
                                <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido' {...register("nombre")}/>
                            </div>
                        </div>                       
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Tipo</label>
                                <select id="tipo" className='form-control' {...register("tipo")}>
                                    <option value="2">Factura de venta</option>
                                    <option value="1">Boleta de venta</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de inicio</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion" {...register("fecha_inicio")}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="fecha_fin" className="form-label">Fecha fin</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_fin" aria-describedby="fechafin" {...register("fecha_fin")}/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3 w-100 d-flex d-flex flex-column flex-md-row gap-2">                                
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Generar reportes</button>
                                {
                                    ((detalle.length) > 0) &&
                                    (
                                        <>
                                        <CSVLink filename={`reporte-facturacion-${moment().format()}.csv`} className="text-decoration-none btn btn-success text-center w-100" type="button" data={imprimible}><i className="bi bi-cloud-arrow-down"></i> Descargar</CSVLink>
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
