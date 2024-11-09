import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List } from '../../../components'
import { BuscarFacturas, FormBuscarFacturasValues, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useAlert, useFacturastore, useHelpers } from '../../../../hooks';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CurrencyConvert } from '../../../helpers/CurrencyConvert';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Facturación', enlace: '' },
  ];

  
export const Facturacion = () => {

/*
    const cabecera = [
        "num. doc.",
        "Documento",        
        "Cliente",
        "Moneda",
        "Monto",
        "Fecha de creación"
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }

    const detalle:listaDetalle[] = [
      {
        id:1,
        campos: ["B001-1", "70035156", "BRIGITTE MERIDA PONCE VALENTIN", "Soles", "20.00", "15/06/2022"]        
      },
      {
        id:2,
        campos: ["B001-1", "70035156", "BRIGITTE MERIDA PONCE VALENTIN", "Soles", "10.00", "15/06/2022"]        
      },
      {
        id:3,
        campos: ["F001-1", "70035156", "BRIGITTE MERIDA PONCE VALENTIN", "Soles", "15.00", "15/06/2022"]        
      },
      
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
*/


    const buttonPrev = useRef<any>();
    const buttonNext = useRef<any>();

    const [pageActive, setPageActive] = useState<string | null>("1");

    const [buscar, setBuscar] = useState<BuscarFacturas>({
        documento: null,
        nombre:null,
        fecha: null,
        buscar:false
    });
 
    const cabecera = [
        "num. doc.",
        "Documento",        
        "Cliente",
        "Moneda",
        "Monto",
        "Estado",
        "Fecha de creación"
    ];

    const { warningDelete } = useAlert();


    const { listEstadoHeladero, listNotaHeladeroEstado} = useHelpers();

    const { status, facturas, nextPage, prevPage, loadFacturacion, deleteFacturacion } = useFacturastore();

    useEffect(() => {
    
        loadFacturacion(pageActive!=null ? pageActive : "1", buscar);        
        
    }, [pageActive, buscar]);

    useEffect(() => {
        listNotaHeladeroEstado();        
    }, [])


    const detalle:listaDetalle[] = facturas.map(({ id,serie, correlativo, usuario_nombre, created_at, estado, documento, moneda, total}) => {

        let monto = '';
        if(!isNaN(parseFloat(total)))
        {
            monto = new Intl.NumberFormat('es-PE', 
            {
                style: 'currency',
                currency: 'PEN'
            })
            .format(parseFloat(total));
        }

        return {
            id: id.toString(),
            campos: [    
                `${serie}-${correlativo}`,
                documento,
                usuario_nombre??''.toString(),
                moneda??''.toString(),
                monto??''.toString(),
                estado??''.toString(),
                (created_at??'').toString()
            ]
    
        }
    });

    const eliminar = (id:number) => {
        warningDelete(async function(){
            
        const result = await deleteFacturacion(id);                

        if(result){
            Swal.fire(
                'Eliminado!',
                'Tu registro fue eliminado con exito.',
                'success'
            )
        }else{
            Swal.fire(
                'Error',
                'Hubo un error al momento de ejecutar el proceso vuelva a intentarlo mas tarde',
                'question'
                )
        }

    
        });
    }

    const next = (e:paginationInterface) => {

        buttonNext.current = e.target;

        if(nextPage == null) 
        {
            // e.currentTarget.setAttribute("disabled", "true");
        }
        else
        {
            // e.currentTarget.removeAttribute("disabled");
            setPageActive(nextPage);
        }

        if(prevPage == null)
        {
            // buttonPrev.current?.removeAttribute("disabled");
        }                 
    }

    const prev = (e:paginationInterface) => {
        
        buttonPrev.current = e.target;

        if(prevPage == null) 
        {
            // e.currentTarget.setAttribute("disabled", "true");
        }
        else
        {
            // e.currentTarget.removeAttribute("disabled");
            setPageActive(prevPage);
        }

        if(nextPage == null)
        {
            // buttonNext.current?.removeAttribute("disabled");
        }
    }

    const { register, handleSubmit, reset, formState:{ errors } } = useForm<FormBuscarFacturasValues>();

    const onSubmit: SubmitHandler<FormBuscarFacturasValues> = ({ documento, nombre, fecha }) => {

        if(documento != '' || nombre!= '' || fecha?.toString() != '') 
        {
            setPageActive(null);
            setBuscar({documento, nombre, fecha, buscar:true})

        }
        else
        {
            false
            // agregar toast booostrap in version react, buscar alternativa solo codigo

        }
    };

    const resetQuery = () => {
    
        reset({
            documento:null,
            nombre:null,
            fecha:null
        });

        const buscar = {documento:null, nombre:null, fecha:null, buscar:true};
        
        loadFacturacion("1", buscar);
    }

    return (
        <ContainerInner breadcrumb={breadcrumb}>
           <List 
                    page="facturacion"                
                    cabecera={cabecera} 
                    
                    detalle={detalle}               
                    eliminar={eliminar}
                    next={next}
                    prev={prev}
                    
                    routeBack={'/'}
                    routeBackLabel={'Volver a la home'}>
                <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-xs-12">
                            <h5>Buscador</h5>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Num doc.</label>
                                <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='Documento' {...register('documento')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                                <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido' {...register('nombre')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de creaci&oacute;n</label>
                                <input type="date" placeholder="dd-mm-yyyy" className="form-control" id="fecha_creacion" aria-describedby="fechacreacion" {...register('fecha')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
                            <div className="mb-3 w-100">                                
                                <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Buscar</button>
                                <button onClick={resetQuery} className="btn btn-secondary text-center w-100 mt-1"><i className="bi bi-x-lg"></i> Resetear</button>
                            </div>
                        </div>

                    </div>
                </form>
                </>
            </List>
        </ContainerInner>
    )
}
