import React, { useEffect, useRef, useState } from 'react'

import { ContainerInner, List } from '../../../components'
import { BuscarNotasHeladeros, FormBuscarNotaHeladeroValues, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useAlert, useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Nota heladero', enlace: '' },
  ];


export const NotaHeladero = () => {

    const buttonPrev = useRef<any>();
    const buttonNext = useRef<any>();

    const [pageActive, setPageActive] = useState<string | null>("1");

    const [buscar, setBuscar] = useState<BuscarNotasHeladeros>({
        documento: null,
        nombre:null,
        estado: null,
        buscar:false
    });

    const cabecera = [
        "Documento",
        "Nombre",
        "Estado",
        "Fecha de Creación",
        "Fecha de Apertura",
        "Fecha de Guardado",
        "Fecha de Cierre"
    ];

    const { warningDelete } = useAlert();


    const { listEstadoHeladero, listNotaHeladeroEstado} = useHelpers();

    const { Heladeros, nextPage, prevPage, loadNotaHeladero, deleteNotaHeladero } = useNotaHeladeroStore();

    useEffect(() => {
      
        loadNotaHeladero(pageActive!=null ? pageActive : "1", buscar);        
          
    }, [pageActive, buscar]);

    useEffect(() => {
        listNotaHeladeroEstado();        
    }, [])
    
    const detalle:listaDetalle[] = Heladeros.map(({ id, heladero_documento,heladero_nombre, created_at, fecha_cierre, fecha_guardado, estado, fecha_apertura}) => ({
        id: id.toString(),
        campos: [
            heladero_documento??''.toString(),
            heladero_nombre??''.toString(),
            estado??''.toString(),
            (created_at??'').toString(),
            (fecha_apertura??'').toString(),
            (fecha_guardado??'').toString(),
            (fecha_cierre??'').toString(),
        ]
  
    }));
    
    const eliminar = (id:number) => {
        warningDelete(async function(){
            
          const result = await deleteNotaHeladero(id);                
    
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

    const { register, handleSubmit, reset } = useForm<FormBuscarNotaHeladeroValues>();

    const onSubmit: SubmitHandler<FormBuscarNotaHeladeroValues> = ({ documento, nombre, estado }) => {

        if(documento != '' || nombre!= '' || estado != 0) 
        {
            setPageActive(null);
            setBuscar({documento, nombre, estado, buscar:true})
    
        }
        else
        {
            return false;
            // agregar toast booostrap in version react, buscar alternativa solo codigo
    
        }
    };
    
    const resetQuery = () => {
      
        reset({
            documento:null,
            nombre:null,
            estado:null
        });
  
        const buscar = {documento:null, nombre:null, estado:null, buscar:true};
        
        loadNotaHeladero("1", buscar);
    }
  

    return (
        <ContainerInner breadcrumb={breadcrumb}>

            <List 
                    page="nota-heladero"                
                    cabecera={cabecera} 
                    
                    detalle={detalle}               
                    eliminar={eliminar}
                    next={next}
                    prev={prev}>
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
                                <label htmlFor="documento" className="form-label">Documento</label>
                                <input type="text" className="form-control" id="documento" aria-describedby="Buscador" placeholder='Documento'  {...register('documento')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                                <input type="text" className="form-control" id="nombres" aria-describedby="Buscador" placeholder='Nombre y/o apellido'  {...register('nombre')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Estado</label>                                
                                <select id="estado" className='form-control'  {...register('estado')}>
                                    <option value="">Seleccione una opci&oacute;n</option>
                                    {
                                        listEstadoHeladero.map(({ id, nombre })=>(
                                            <option key={id} value={id}>{nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 d-flex align-items-end">
                            <div className="mb-3 w-100">                                
                                <button className="btn btn-primary text-center w-100 flex-fill" type="submit"><i className="bi bi-search"></i> Buscar</button>
                                <button onClick={resetQuery} className="btn btn-secondary text-center w-100 mt-1 flex-fill"><i className="bi bi-x-lg"></i> Resetear</button>
                            </div>
                        </div>

                    </div>
                </form>
                </>
            </List>

        </ContainerInner>
    )
}
