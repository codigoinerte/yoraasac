import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List, ListSave } from '../../../components'
import { breadcrumb as bread, formMarca, listaDetalle, paginationInterface } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useAlert, useMarca } from '../../../../hooks';
import Swal from 'sweetalert2';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Marcas', enlace: '' },
];


export const Marca = () => {

    const cabecera = [
        "#",
        "Marca",    
        "Fecha de creación",          
    ];

    const { register, handleSubmit, setValue, reset, formState:{ errors } } = useForm<formMarca>();

    const { marcas, marca, detalle, loadMarca, saveMarca, updateMarca, getMarca, deleteMarca, } = useMarca();

    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
      
        loadMarca();

    }, []);

    const { warningDelete } = useAlert();
    

    const eliminar = async (id:number) => {

        warningDelete(async function(){
            
            const result = await deleteMarca(id);
    
            await loadMarca();
      
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
 
    const editar = async (id:number) => {
        
        if(id==0 && id==null)  return false;

        try {
            
            const marca = await getMarca(id);
    
            setValue("nombre", marca.nombre);

        } catch (error) {
            console.warn(error);
        }
    }

    const onSubmit = async (data:formMarca)=>{
        
        if(marca){
            await updateMarca(data);
        }else{
            await saveMarca(data);
        }

        await loadMarca();
      
        reset();
    }
    

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Marcas"> 
            <ListSave                
                cabecera={cabecera}                 
                detalle={detalle}               
                eliminar={eliminar}                
                editar={editar}                
            >
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" aria-describedby="nombre" placeholder='nombre' {...register("nombre", { required:true})}/>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3">
                                <button className="btn btn-primary text-center w-100" type="submit">Guardar Marca</button>
                            </div>
                        </div>
                        
                       

                    </div>
                </form>
            </>
            </ListSave>
        </ContainerInner>
    )
}
