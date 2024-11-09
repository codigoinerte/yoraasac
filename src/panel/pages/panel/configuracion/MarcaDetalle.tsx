import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerInner, FormControls } from '../../../components';
import { breadcrumb as bread, formMarca } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useMarca } from '../../../../hooks';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Marcas', enlace: '/configuracion/marcas' },
    { id:3, titulo: 'Marca detalle', enlace: '' }
];

export const MarcaDetalle = () => {
  
    const { id = 0 } = useParams();
    const [primaryId, setprimaryId] = useState<number>(parseInt(id.toString()));
  
    const { register, handleSubmit, setValue, reset, formState:{ errors } } = useForm<formMarca>();

    const { marcas, marca, detalle, loadMarca, saveMarca, updateMarca, getMarca, deleteMarca, } = useMarca();

    useEffect(() => {
        loadMarcaById(primaryId);
    }, []);

    const loadMarcaById = async (id:number) => {
        
        if(id==0 || id==null)  return false;
        
        try {
            
            const marca = await getMarca(id);
    
            setValue("nombre", marca.nombre);

        } catch (error) {
            console.warn(error);
        }
    }
    
    const onSubmit = async (data:formMarca)=>{
        if(primaryId){
            await updateMarca(data);
        }else{
            const response = await saveMarca(data);
            if(response?.data?.id){
                window.history.pushState(null, '', `/configuracion/marcas/edit/${response.data.id}`);
                setprimaryId(response?.data?.id);
                loadMarcaById(response?.data?.id);
            }
            
        }
    }
  
    return (
      <ContainerInner breadcrumb={breadcrumb}>
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControls page="productos" funcNew={()=>{
                    window.location.href = `/configuracion/marcas/new`;
                }}
                onNavigateBack = {()=>{
                    window.location.href = '/configuracion/marcas'
                }}
                routeBackLabel={'Volver al listado'}
                />
  
                <hr className='border border-1 opacity-50'/>
    
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h4>Informaci&oacute;n</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                            
                        <div className="mb-3">
                            <label htmlFor="marca" className="form-label">Marca</label>
                            <input type="text" className="form-control" placeholder='Nombre de marca' {...register("nombre", { required:true})}/>
                        </div>
                            
                    </div>
                </div>
            </form>
          </>
      </ContainerInner>
    )
}
