import React, { useEffect, useState } from 'react'
import { ContainerInner, ListSave } from '../../../components'
import { breadcrumb as bread, formMoneda, listaDetalle } from '../../../interfaces';
import { useAlert, useMoneda } from '../../../../hooks';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Monedas', enlace: '' },
];


export const Moneda = () => {


    const cabecera = [
        "#",
        "Moneda",    
        "Codigo",    
        "Simbolo",
        "Principal"                
    ];

    const { register, handleSubmit, setValue, reset, formState:{ errors } } = useForm<formMoneda>();

    const { monedas, moneda, detalle, loadMoneda, saveMoneda, updateMoneda, getMoneda, deleteMoneda, } = useMoneda();

    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
      
        loadMoneda();

    }, []);
    

    const { warningDelete } = useAlert();

    const eliminar = async (id:number) => {
       
        warningDelete(async function(){
            
            const result =  await deleteMoneda(id);
    
            await loadMoneda();
      
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
            
            const moneda = await getMoneda(id);
    
            setValue("codigo", moneda.codigo);
            setValue("moneda", moneda.moneda);
            setValue("simbolo", moneda.simbolo);
            setValue("principal", moneda.principal);

        } catch (error) {
            console.warn(error);
        }
    }

    const onSubmit = async (data:formMoneda)=>{
        
        if(moneda){
            await updateMoneda(data);
        }else{
            await saveMoneda(data);
        }

        await loadMoneda();
      
        reset();
    }

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Monedas"> 
            <ListSave                
                cabecera={cabecera}                 
                detalle={detalle}               
                eliminar={eliminar}                
                editar={editar}
            >
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Codigo</label>
                                <input type="text" className="form-control" id="codigo" aria-describedby="codigo" placeholder='PEN' {...register("codigo", { required:true})}/>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="moneda" className="form-label">Moneda</label>
                                <input type="text" className="form-control" id="moneda" aria-describedby="moneda" placeholder='Soles' {...register("moneda", { required:true})}/>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="simbolo" className="form-label">Simbolo</label>
                                <input type="text" className="form-control" id="simbolo" aria-describedby="simbolo" placeholder='S/' {...register("simbolo", { required:true})}/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="simbolo" className="form-label">Principal</label>
                                <select id="principal" className='form-control' {...register("principal")}>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3">
                                <button className="btn btn-primary text-center w-100" type="submit">Guardar Moneda</button>
                            </div>
                        </div>
                        
                       

                    </div>
                </form>
            </>
            </ListSave>
        </ContainerInner>
    )
}
