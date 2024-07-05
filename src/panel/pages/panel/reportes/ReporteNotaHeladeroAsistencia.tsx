import { useEffect, useState } from 'react'
import { ContainerInner, ListReportes, SearchUser } from '../../../components';
import { breadcrumb as bread, listaDetalle, paramsHeladeroAsistencia } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useHelpers, usePersonasStore } from '../../../../hooks';
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
        "ASISTENCIAS",
        "FALTANTES",
        "PORCENTAJE",
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }

    const [monthsSelected, setMonthsSelected] = useState<number[]>([]);

    const [detalle, setDetalle] = useState<listaDetalle[]>([]);
    const [imprimible, setImprimible] = useState<any[]>([]);
    
    const { listUsuario, loadBuscarUsuario} = useHelpers();

    const { listReporteNotaHeladero: reporte, reporteHeladeroAsistencia } = usePersonasStore();

    useEffect(() => {
      
        const nuevoDetalle:listaDetalle[] = reporte.map((item)=> ({
            id: (item.id).toString(),
            campos: [
                (item.documento??'').toString(),
                (item.heladero_nombre??'').toString(),
                (item.dias_asistidos??'').toString(),
                (item.dias_faltantes??'').toString(),
                (item.porcentaje_asistencia??'').toString()  + '%'
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte.map((item)=>({
            heladero_documento: (item.documento??'').toString(),
            heladero_nombre: (item.heladero_nombre??'').toString(),
            
            dias_asistidos: (item.dias_asistidos??'').toString(),
            dias_faltantes: (item.dias_faltantes??'').toString(),
            porcentaje_asistencia: (item.porcentaje_asistencia??'').toString(),            
        })))
        
    }, [reporte]);
    
    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => currentYear - index);  
    
    const onChangeUser = (user_id:number) =>  setValue("user_id", user_id);
    
    const { register, handleSubmit, reset, setValue, getValues, control } = useForm<paramsHeladeroAsistencia>({
        defaultValues:{
            anio: new Date().getFullYear(),
            mes: new Date().getMonth() + 1,    
        }
    });

    const onSubmit = async (params:paramsHeladeroAsistencia)=>{

        await reporteHeladeroAsistencia(params);
    }

    const resetear = () =>{
        reset();
        setDetalle([]);
    }

    const generateMonthsToRender = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        
        const generateMonths = (year:number) => {
            const months = [];
            const monthLimit = year == currentYear ? currentMonth : 12;
            for (let month = 1; month <= monthLimit; month++) {
              months.push(month);
            }
            return months.reverse();
        };
        
        const selectedYear = getValues("anio") ?? currentYear;
        const months = generateMonths(selectedYear);
        setMonthsSelected(months);
    }

    useEffect(() => {
        generateMonthsToRender();
    }, []);

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Generar reporte de notas de heladeros">        
            <ListReportes                                   
                    cabecera={cabecera}                     
                    detalle={detalle}               
                    descargar={eliminar}>
                
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
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="anio" className="form-label">Año</label>
                                <select className="form-select" { ...register("anio", {
                                    onChange(event) {
                                        generateMonthsToRender();
                                    },
                                })}>
                                    { years.map((year) => (<option key={year} value={year}>{year}</option>)) }
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="mb-3">
                                <label htmlFor="mes" className="form-label">Mes</label>
                                    {
                                        monthsSelected.length > 0 &&
                                        <select className="form-select" { ...register("mes")}>
                                            { monthsSelected.map((month) => (<option key={month} value={month}>{month}</option>)) }
                                        </select>
                                    }
                            </div>
                        </div>
                        
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
                </form>
                
            </ListReportes>
        </ContainerInner>
    )
}
