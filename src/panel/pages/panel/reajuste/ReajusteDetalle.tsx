import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread, ProductosPublicados} from '../../../interfaces';
import { FormReajustesValues, FormReajusteValues } from '../../../../interfaces';
import { useEffect, useRef } from 'react';
import { useHelpers, useReajusteStore } from '../../../../hooks';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const breadcrumb:bread[] = [
    { id:1, titulo: 'Stock', enlace: '/stock' },    
    { id:2, titulo: 'Reajuste', enlace: '/stock/reajuste' },
    { id:3, titulo: 'Reajuste detalle', enlace: '' }
];
const cabecera = [
  "Producto",
  "Cantidad ingreso",
  "Cantidad salida",
];

export const ReajusteDetalle = () => {

  const { id = 0 } = useParams();

  const refId = useRef<any>(0);

  const { active, saveReajuste, updateReajuste, geReajuste } = useReajusteStore();

  const { loadProductosDisponibles } = useHelpers();

  const currentDate = moment(new Date()).format("yyyy-MM-DD").toString(); 

  const { register, handleSubmit, formState, setValue, getValues, control, reset } = useForm<FormReajusteValues>({
      defaultValues:{
          codigo: null,
          codigo_ingreso: null,
          codigo_salida: null,
          user_id: 1,
          fecha_reajuste: currentDate,
          detalle: []
      }
  });

  const { errors } = formState;

  const { fields } = useFieldArray({
      control,
      name: "detalle"
  });

  const newRegister = () => {
    window.location.href = '/stock/reajuste/new';
  }

  const onSubmit: SubmitHandler<FormReajusteValues> = async (data) => {
    if(refId.current == 0){
      const response = await saveReajuste({...data});
      refId.current = response?.id;

      if(response?.id)
        window.history.pushState(null, '', `/stock/reajuste/edit/${response.id}`);
      if(response?.detalle)
        setValue("detalle", response.detalle);
    }else{
      const response = await updateReajuste({...data});
      
      if(response?.detalle)
        setValue("detalle", response.detalle);
    }
  }

  const loadReajusteDetalle = async () => {

    refId.current = id;

    reset();
    
    if(refId.current == 0){

      const productos = await loadProductosDisponibles();

      if(productos)
        setValue("detalle", [
            ...productos.map((item:ProductosPublicados)=>({
              id : 0,
              producto : item.nombre,
              codigo: item.codigo,
              cantidad_ingreso: 0,
              cantidad_salida: 0,
              reajuste_id: 0,
              created_at: new Date("yyyy-MM-dd"),
              updated_at: new Date("yyyy-MM-dd"),
              stock: item.stock ?? 0
            }))
        ]);     

      return;
    }

    const reajuste = await geReajuste(refId.current);

    setValue("id", reajuste?.id ?? 0);
    setValue("codigo", reajuste?.codigo ?? '');
    setValue("codigo_ingreso", reajuste?.codigo_ingreso ?? '');
    setValue("codigo_salida", reajuste?.codigo_salida ?? '');
    setValue("user_id", reajuste?.user_id ?? 0);
    setValue("fecha_reajuste", reajuste?.fecha_reajuste ?? moment(new Date()).format("yyyy-MM-DD hh:mm").toString());
    setValue("detalle", reajuste?.detalle ?? []);
  }

  useEffect(() => {

    loadReajusteDetalle()
    .then();
    
  }, []);

  return (
    <ContainerInner breadcrumb={breadcrumb} titulo={active?.codigo ? `Reajuste detalle : ${active?.codigo}` : ''}>
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <FormControls page="reajuste" funcNew={newRegister} isNew={true}/>

                    <hr className='border border-1 opacity-50'/>

                    <h4>Informaci&oacute;n</h4>

                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        
                            <div className="mb-3">
                                <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                                <input type="date" 
                                    className={errors.fecha_reajuste ? "form-control is-invalid" : "form-control"}
                                    {...register('fecha_reajuste', {required: true})}/>

                               
                            </div>

                        </div>

                    </div>  

                    <h4>Productos o items del movimiento</h4>

                    <div className="row">
                        
                        <div className='px-3'>
                        {
                            fields.length > 0 ?
                            (
                                <>
                                    <table className='table table-nota-heladero'>
                                        <thead>
                                            <tr>{ cabecera.map((titulo)=>(<th key={titulo} scope="col">{ titulo }</th>)) }</tr>
                                        </thead>
                                        <tbody>
                                            
                                        {
                                            fields.map((item, index) => {
                                                return (
                                                <tr key={item.id}>
                                                    <td>
                                                        { item.producto }
                                                        <span className={`badge ms-2 ${getValues(`detalle.${index}.stock`)<0?'bg-danger':(getValues(`detalle.${index}.stock`)>0?'bg-success':'bg-warning')}`}>{getValues(`detalle.${index}.stock`)}</span>
                                                        <input type="hidden" 
                                                                className='form-control' 
                                                                {...register(`detalle.${index}.codigo`)} 
                                                                />
                                                        <input type="hidden" 
                                                                className='form-control' 
                                                                {...register(`detalle.${index}.id`)}
                                                                />
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <small>Unid.</small>
                                                            </span>
                                                            <input type="text" className='form-control' 
                                                                    {...register(`detalle.${index}.cantidad_ingreso`)} tabIndex={1}/>
                                                        </div>
                                                    </td> 
                                                    <td>
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <small>Unid.</small>
                                                            </span>
                                                            <input type="text" className='form-control' 
                                                                    {...register(`detalle.${index}.cantidad_salida`)} tabIndex={2}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                            })

                                        }
                                        </tbody>
                                    </table>   
                                    
                                </>
                            )
                            :
                            (
                                <>
                                    <div className="alert alert-warning d-flex justify-content-center gap-3 fs-2 mt-5" role="alert">
                                        <i className="bi bi-exclamation-triangle"></i>
                                        <div>
                                            <b>No se añadio ningun producto</b>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        </div>

                    </div>
                
                </form>
        </>
    </ContainerInner>
  )
}
