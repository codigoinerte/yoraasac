import React, { useEffect } from 'react'
import { ContainerInner, FormControls, FormStock } from '../../../components'
import { FormStockBarquilloValues, Breadcrumb as bread } from '../../../interfaces';
import { useHelpers, useStockBarquillosStore } from '../../../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock barquillos', enlace: '/stock/barquillos' },
  { id:3, titulo: 'Stock barquillos detalle', enlace: '' }
];

export const StockBarquillosDetalle = () => {

    const { listMovimiento,
            listTipoDocumento,

            loadMovimientos,
            loadTipoDocumento,
            loadBuscarProducto,} = useHelpers();

    const { register, handleSubmit, reset, formState, setValue, getValues, control } = useForm<FormStockBarquilloValues>();

    const { errors } = formState;

    const { id = 0 } = useParams();   

    const { saveStockBarquillo, updateStockBarquillo, getStockBarquillo  } = useStockBarquillosStore();

    useEffect(() => {
      
        loadMovimientos();
        loadTipoDocumento();
        loadBuscarProducto();

        if(id != 0)
        {
            getStockBarquillo(parseInt(id))
            .then((stock)=>{
                
                setValue('movimientos_id', stock?.movimientos_id);
                setValue('tipo_documento_id', stock?.tipo_documento_id);
                setValue('fecha_movimiento', stock?.fecha_movimiento);
                setValue('numero_documento', stock?.numero_documento);
                setValue('cantidad', stock?.cantidad);


            });
        }
      
    }, []);

    const onSubmit: SubmitHandler<FormStockBarquilloValues> = (data) => {
        
        if(id == 0){
            saveStockBarquillo({...data});
        }else{
            updateStockBarquillo({...data});
        }
    }
    
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
          
            <form onSubmit={handleSubmit(onSubmit)}>

            <FormControls category="stock" save={()=>console.log(1)} page="barquillos"/>

            <hr className='border border-1 opacity-50'/>

            <h4>Informaci&oacute;n</h4>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    
                    <div className="mb-3">
                        <label htmlFor="tipo_movimiento" className="form-label">Tipo de movimiento</label>
                        <select className='form-control'
                                {...register('movimientos_id', {required: true})} >
                            <option value="">-seleccione una opcion-</option>
                            {
                                listMovimiento.map(({ id, movimiento })=>(
                                    
                                    <option value={id} key={id}>{movimiento}</option>
                                    
                                ))
                            }
                        </select>
                    </div>    

                    <div className="mb-3">
                        <label htmlFor="tipo_documento" className="form-label">Tipo de Documento</label>
                        <select className='form-control'
                                {...register('tipo_documento_id')}>
                            <option value="">-seleccione una opcion-</option>
                            {
                                listTipoDocumento.map(({id, documento})=>(
                                    <option value={id} key={id}>{documento}</option>
                                ))
                            }
                        </select>
                    </div>                               

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                
                    <div className="mb-3">
                        <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                        <input  type="date" 
                                className="form-control" 
                                aria-describedby="fecha_movimiento"
                                {...register('fecha_movimiento', { required:true })} />
                    </div>    

                    <div className="mb-3">
                        <label htmlFor="num_documento" className="form-label">N&uacute;m de documento</label>
                        <input  type="text" 
                                className="form-control" 
                                aria-describedby="num_documento"
                                {...register('numero_documento')} />
                    </div>                                               

                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    
                    <div className="mb-3">
                        <label htmlFor="cantidad" className="form-label">Cantidad</label>
                        <input  type="text" 
                                className="form-control" 
                                id="cantidad" 
                                aria-describedby="cantidad"
                                {...register('cantidad')} />
                    </div>     

                </div>  


            </div> 
                
            </form>

        </>
    </ContainerInner>
  )
}
