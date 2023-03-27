import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';


import { BuscarPersonas, listaDetalle, paginationInterface, PersonalList, FormBuscarPersonasValues } from '../../interfaces'
import { List } from '../List'
import { useAlert, usePersonasStore } from '../../../hooks';
import { Loader } from '../Loader';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidateDate } from '../../helpers';
import Swal from 'sweetalert2';


export const ListPersonal = ({ page, category, tipo = 4 }:PersonalList) => {

    const [pageActive, setPageActive] = useState<string | null>("1");
    
    const [buscar, setBuscar] = useState<BuscarPersonas>({
        documento: null,
        nombres:null,
        fechaCreacion: null,
        buscar:false
    });

    const buttonPrev = useRef<any>();
    const buttonNext = useRef<any>();

    const { status, personas, nextPage, prevPage, loadPersonas, deletePersona } = usePersonasStore();

    const { warningDelete } = useAlert();

    useEffect(() => {
        
        loadPersonas(tipo, pageActive!=null ? pageActive : "1", buscar);
        
    }, [pageActive, buscar]);

    
    
    const cabecera = [
        "Documento",
        "Nombre",
        "Fecha de creación"
    ];

    const eliminar = (id:number) => {

        warningDelete(async function(){
            
                const result = await deletePersona(id);                

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

    const detalle:listaDetalle[] = personas.map(({ id, documento, name, apellidos, created_at}) => ({
            id: id.toString(),
            campos: [
                documento.toString(),
                `${name} ${apellidos}`,
                created_at.toString()
            ]
        
    }));

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

    const navigate = useNavigate();

    const location = useLocation();
  
    const { q = '' } = queryString.parse(location.search);
    
    const { register, handleSubmit, reset, formState:{ errors } } = useForm<FormBuscarPersonasValues>();

    const onSubmit: SubmitHandler<FormBuscarPersonasValues> = ({ documento, nombres, fechaCreacion }) => {
      
        
        if(documento != '' || nombres!= '' || fechaCreacion?.toString() !== "") 
        {
            setPageActive(null);
            setBuscar({documento, nombres, fechaCreacion, buscar:true})

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
            fechaCreacion:null,
            nombres:null
        });

        const buscar = {documento:null, nombres:null, fechaCreacion:null, buscar:true};
        
        loadPersonas(tipo, "1", buscar);
    }

  return (
    <>
        {
            (status === true) &&
            (

                <Loader />
            )
            
        }
        <List 
                page={page} 
                category={category}
                cabecera={cabecera} 
                detalle={detalle}               
                eliminar={eliminar}
                next={next}
                prev={prev}>
            <>
            <form onSubmit={handleSubmit(onSubmit)} > 
                <div className="row">
                    <div className="col-xs-12">
                        <h5>Buscador</h5>
                    </div>
                </div>
                <div className="row">

                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="documento" className="form-label">Documento</label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="documento" 
                                    aria-describedby="Buscador" 
                                    placeholder='Documento'
                                    {...register('documento')}/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                        <div className="mb-3">
                            <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="nombres" 
                                    aria-describedby="Buscador" 
                                    placeholder='Nombre y/o apellido'
                                    {...register('nombres')}/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="mb-3">
                            <label htmlFor="fecha_creacion" className="form-label">Fecha de creaci&oacute;n</label>
                            <input  type="date" 
                                    placeholder="dd-mm-yyyy" 
                                    className="form-control" 
                                    id="fecha_creacion" 
                                    aria-describedby="fechacreacion"
                                    {...register('fechaCreacion', { validate :  ValidateDate  })}/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
                        <div className="w-100">                                
                            <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Buscar</button>
                            <button onClick={resetQuery} className="btn btn-secondary text-center w-100 mt-1"><i className="bi bi-x-lg"></i> Resetear</button>
                        </div>
                    </div>

                </div>
            </form>
            </>
        </List>
    </>
  )
}
