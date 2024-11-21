import { useEffect, useState } from 'react'
import { ContainerInner, ListReportes, SearchUser } from '../../../components';
import { ReporteNotaForm, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { CSVLink } from "react-csv";
import moment from 'moment';
import { CurrencyConvert } from '../../../helpers';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Nota heladero', enlace: '' },
];


export const ReporteNotaHeladero = () => {

    const cabecera = [
        "Documento",
        "Nombre",
        "Vendido",
        "Deuda pagada",
        "Totales",
        "Pago",
        "Debe",
        "Ahorro",
        "Días asistidos",
        "% Asistencia",
    ];

    const [firstload, setFirstFoad] = useState(false);
    const [detalle, setDetalle] = useState<listaDetalle[]>([]);
    const [imprimible, setImprimible] = useState<any[]>([]);

    const next = (e:paginationInterface) => {
        console.log(e);
    }
    
    const prev = (e:paginationInterface) => {
        console.log(e);
    }
    
    const { listNotaHeladeroEstado, listUsuario, loadBuscarUsuario} = useHelpers();

    const { reporteHeladero, reporte } = useNotaHeladeroStore();

    const getFirstDataQuery = async () => {
        if(firstload) return;

        await reporteHeladero({
            fecha_inicio: moment(new Date().getTime()).format("YYYY-MM-DD"),
            fecha_fin: moment(new Date().getTime()).format("YYYY-MM-DD"),
        });

        setFirstFoad(true);
    }

    useEffect(() => {
      
        const nuevoDetalle:listaDetalle[] = reporte.map((item, i)=> ({
            id: (item.id).toString(),
            popupContent: item.observaciones ?? '',
            popupKey: 1,
            campos: [
                (item.heladero_documento??'').toString(),
                (item.heladero_nombre??'').toString(),
                (CurrencyConvert(item.vendido??'', true)).toString(),
                (CurrencyConvert(item.deuda_pagada??'', true)).toString(),
                (CurrencyConvert(item.total_pagar??'', true)).toString(),
                (CurrencyConvert(item.pago??'', true)).toString(),
                (CurrencyConvert(item.debe??'', true)).toString(),
                (CurrencyConvert(item.ahorro??'', true)).toString(),
                (item.dias_asistidos??'').toString(),
                (item.porcentaje_asistencia??'').toString()
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte.map((item)=>({
            "documento": (item.heladero_documento??'').toString(),
            "nombre": (item.heladero_nombre??'').toString(),
            
            "vendido": (CurrencyConvert(item.vendido??'', true)).toString(),
            "deuda pagada": (CurrencyConvert(item.deuda_pagada??'', true)).toString(),
            "totales": (CurrencyConvert(item.total_pagar??'', true)).toString(),

            "pago": (CurrencyConvert(item.pago??'', true)).toString(),
            "debe": (CurrencyConvert(item.debe??'', true)).toString(),
            "ahorro": (CurrencyConvert(item.ahorro??'', true)).toString(),

            'dias asistidos': (item.dias_asistidos??'').toString(),
            'porcentaje de asistencia': (item.porcentaje_asistencia??'').toString()
        })))
        
    }, [reporte]);
    
    useEffect(() => {
        
        listNotaHeladeroEstado();

    }, []);

    useEffect(() => {
      
        getFirstDataQuery();
        
    }, [])
    
    
    const onChangeUser = (user_id:number) =>  setValue("user_id", user_id);
    const dateNow = moment(new Date()).format("yyyy-MM-DD").toString();

    const { register, handleSubmit, reset, setValue, control } = useForm<ReporteNotaForm>({
        defaultValues: {
            estado: 1,
            fecha_inicio:dateNow,
            fecha_fin:dateNow,
        }
    });

    const onSubmit = async (params:ReporteNotaForm)=>{

        await reporteHeladero({
            ...params,
            fecha_inicio: moment(params.fecha_inicio).format("YYYY-MM-DD"),
            fecha_fin: moment(params.fecha_fin).format("YYYY-MM-DD"),
        });
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
                    descargar={function(){}}
                    next={next}
                    prev={prev}
                    routeBack={'reportes'}
                    routeBackLabel={'Volver a las categorias'}
                    popupKey={0}
                    >
                
                <form onSubmit={handleSubmit(onSubmit)}>                    
                    <div className="row">
                        
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <SearchUser 
                                control={control}
                                className="form-control p-0 mb-3"
                                onChange={onChangeUser}
                                listUsuario = {listUsuario}
                                loadBuscarUsuario = {loadBuscarUsuario}
                            />
                        </div>                        
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de inicio</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion" {...register("fecha_inicio")}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="fecha_fin" className="form-label">Fecha fin</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_fin" aria-describedby="fechafin" {...register("fecha_fin")}/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3 w-100 gap-2 d-flex flex-column flex-md-row">
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Generar reportes</button>
                                {
                                    (detalle.length > 0) &&
                                    (
                                        <>
                                        <CSVLink filename={`reporte-nota-healdero-${moment().format()}.csv`} className="text-decoration-none btn btn-success text-center w-100" type="button" data={imprimible}><i className="bi bi-cloud-arrow-down"></i> Descargar</CSVLink>
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
