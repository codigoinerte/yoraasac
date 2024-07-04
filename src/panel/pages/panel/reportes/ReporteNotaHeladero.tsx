import { useEffect, useState } from 'react'
import { ContainerInner, ListReportes, SearchUser } from '../../../components';
import { ReporteNotaForm, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { CSVLink } from "react-csv";
import moment from 'moment';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Nota heladero', enlace: '' },
];


export const ReporteNotaHeladero = () => {

    const cabecera = [
        "DOCUMENTO",
        "NOMBRE",
        "MONTO",
        "PAGO",
        "DEBE",
        "AHORRO",
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
    
    const { listEstadoHeladero, listNotaHeladeroEstado, listUsuario, loadBuscarUsuario} = useHelpers();

    const { reporteHeladero, reporte } = useNotaHeladeroStore();

    useEffect(() => {
      
        const nuevoDetalle:listaDetalle[] = reporte.map((item)=> ({
            id: (item.id).toString(),
            campos: [
                (item.heladero_documento??'').toString(),
                (item.heladero_nombre??'').toString(),
                (item.monto??'').toString(),
                (item.pago??'').toString(),
                (item.debe??'').toString(),
                (item.ahorro??'').toString(),
            ]
        }));
        
        setDetalle(nuevoDetalle);

        setImprimible(reporte.map((item)=>({
            heladero_documento: (item.heladero_documento??'').toString(),
            heladero_nombre: (item.heladero_nombre??'').toString(),
            
            monto: (item.monto??'').toString(),
            pago: (item.pago??'').toString(),
            debe: (item.debe??'').toString(),
            ahorro: (item.ahorro??'').toString()
        })))
        
    }, [reporte]);
    
    useEffect(() => {
        
        listNotaHeladeroEstado();

    }, []);
    
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
                    descargar={eliminar}
                    next={next}
                    prev={prev}>
                
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
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Estado</label>                                
                                <select id="estado" className='form-control'  {...register('estado')}>
                                    {
                                        listEstadoHeladero.map(({ id, nombre })=>(
                                            <option key={id} value={id}>{nombre}</option>
                                        ))
                                    }
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
