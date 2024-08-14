import { useEffect, useRef, useState } from 'react'

import { ContainerInner, FormControls } from '../../../components'
import { BuscarProducto, FormStockHeladoValues, Breadcrumb as bread } from '../../../interfaces';
import { useHelpers, useStockHeladosStore } from '../../../../hooks';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SelectPicker } from 'rsuite';
import toast , { Toaster } from 'react-hot-toast';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock helados', enlace: '/stock/helados' },
  { id:3, titulo: 'Stock helados detalle', enlace: '' }
];

type idorigin = string | 0;

export const StockHeladosDetalle = () => {

    const [selectProducto, setSelectProducto] = useState<BuscarProducto>();
    const [tipo, setTipo] = useState(1);

    const cabecera = [
        "codigo",
        "Producto",
        "cantidad"
    ];  
  
    const { listMovimiento,
            listTipoDocumento,
            listBuscarProducto,

            loadMovimientos,
            loadTipoDocumento,
            loadBuscarProducto,} = useHelpers();

    const { register, handleSubmit, setValue, getValues, control } = useForm<FormStockHeladoValues>({
        defaultValues:{
            codigo_movimiento:'',
            fecha_movimiento:'',            
            detalle: []
        }
    });

    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;

    const { id: idOrigin = 0 } = useParams();   

    const [id, setId] = useState<idorigin>(idOrigin);

    const { saveStockHelado, updateStockHelado, getStockHelado, deleteImagenStockHelado } = useStockHeladosStore();

    useEffect(() => {
      
        loadMovimientos();
        loadTipoDocumento();
        loadBuscarProducto();

        if(id == 0)
        {
            /* */
        }
        else
        {
            getStockHelado(parseInt(id))
            .then((stock)=>{
                
                setValue('movimientos_id', stock?.movimientos_id);
                setValue('tipo_documento_id', stock?.tipo_documento_id);
                setValue('fecha_movimiento', stock?.fecha_movimiento);
                setValue('numero_documento', stock?.numero_documento);
                setValue('image_file', stock?.imagen);
                setValue('detalle', stock?.detalle);
                setTipo(stock?.movimientos_id);

            });
        }
      
    }, []);

    const { fields, append, remove } = useFieldArray({
                                                        control,
                                                        name: "detalle"
                                                    });

                        

    const onSubmit: SubmitHandler<FormStockHeladoValues> = async (data) => {
        
        if(id == 0){
            const response = await saveStockHelado({...data});
            if(response.id){
                window.history.pushState(null, '', `/stock/helados/${response.id}`);
                setId(response.id);

                if(response.detalle){
                    setValue("detalle", null);

                    let i = 0;
                    for(let i of response.detalle){
                        setValue(`detalle.${i}.caja`, i.caja);
                        setValue(`detalle.${i}.caja_cantidad`, i.caja_cantidad);
                        setValue(`detalle.${i}.cantidad`, i.cantidad);
                        setValue(`detalle.${i}.id`, i.id);
                        setValue(`detalle.${i}.codigo`, i.codigo);
                        setValue(`detalle.${i}.producto`, i.producto);

                        i++;
                    }
                    console.log(i);
                }
            }
        }else{
            await updateStockHelado({...data});
        }
    }
    
    const updateData = (buscar:string) => {
        
        if(typeof buscar == "undefined") return false;
        
        loadBuscarProducto(buscar);
    }

    const loadProducto = ()=>{
        
        let item = fields.filter((detail)=>detail.codigo == selectProducto?.codigo);

        if(item.length == 0){

            append({ 
                codigo: selectProducto?.codigo,
                producto: selectProducto?.nombre,
                caja_cantidad: selectProducto!.cantidad_caja,
                caja: 0,
                cantidad: 0,
             });

        }else{
            
            toast.error('El producto ya fue añadido');
        }

    }

    const deleteImageHelado = async () => {

        if(!getValues("image_file") || getValues("image_file") == undefined) return;

        deleteImagenStockHelado(parseInt(id.toString()), getValues("image_file")??'');

        setValue("image_file", "");
        
    }
    

  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
          {/* <FormStock page='helados' category='stock' /> */}

          <form onSubmit={handleSubmit(onSubmit)}>
          
            <FormControls category="stock" save={()=>handleSubmit(onSubmit)} page="helados"/>

            <hr className='border border-1 opacity-50'/>

            <h4>Informaci&oacute;n</h4>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    
                    <div className="mb-3">
                        <label htmlFor="tipo_movimiento" className="form-label">Tipo de movimiento</label>
                        <select   className='form-control'
                                    {...register('movimientos_id', {
                                        required: true,
                                        onChange: (e) => {
                                            setTipo(e.target.value);
                                        }

                                    })} >
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
                        <input    type="date" 
                                    className="form-control" 
                                    aria-describedby="fecha_movimiento" 
                                    {...register('fecha_movimiento', { required:true })}/>
                    </div>            
                    
                    <div className="mb-3">
                        <label htmlFor="num_documento" className="form-label">N&uacute;m de documento</label>
                        <input    type="text" 
                                    className="form-control" 
                                    aria-describedby="num_documento"
                                    {...register('numero_documento')} />
                    </div>            

                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                    <div className="input-group">
                        <input type="file" className="form-control" placeholder="subir documento" aria-label="subir documento" {...register('image_input')} />
                        {
                            getValues("image_file") ?
                            (
                                <>
                                    <a className="btn btn-info btn-sm" role='button' target='_blank' href={`${URL_IMAGENES}${getValues("image_file")}`}><i className="bi bi-cloud-arrow-down"></i> Descargar imagen</a>
                                    <button className="btn btn-danger btn-sm" type="button" onClick={deleteImageHelado}><i className="bi bi-x"></i> Eliminar</button>
                                </>
                            ) : ''
                        }
                    </div>
                </div>            

            </div>  

            <h4>Productos o items del movimiento</h4>

            <div className="row">
                
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="input-group mb-3">
                        <SelectPicker                        
                            data={
                                listBuscarProducto.map((producto)=>({
                                    label: `${producto.codigo??''} - ${producto.nombre??''}`,
                                    value: producto.id??''
                                }))
                            }
                            style={{ width: 224 }}                        
                            onSearch={updateData}
                            onChange={(e)=>{
                                setSelectProducto(listBuscarProducto.filter((producto)=>producto.id == e)[0]);
                            }}
                            placeholder='Buscar Producto'
                            className="form-control p-0 w-auto no-width"
                        />
                        <button onClick={loadProducto} className="btn btn-primary" type="button"><i className="bi bi-plus"></i> Agregar</button>
                        <Toaster />
                    </div>

                </div>

                <div className='px-3'>
                {
                    fields.length > 0 ?
                    (
                        <>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        {
                                            cabecera.map((titulo)=>(
                                                <th key={titulo} scope="col">{ titulo }</th>
                                            ))
                                        }
                                            <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {
                                        fields.map((item, index) => {
                                            return (
                                            <tr key={item.id}>

                                                <td data-label="Codigo">{item.codigo}</td> 
                                                <td data-label="Producto">{item.producto}</td>
                                                <td data-label="Cantidad" className='d-flex'>

                                                    {
                                                        tipo == 1 ?
                                                        (
                                                            <>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text" id="basic-addon1">Cajas</span>
                                                                    <input type='text' {...register(`detalle.${index}.caja`, { 
                                                                        required: true,
                                                                        onChange : () => {
                                                                            const cajas = getValues(`detalle.${index}.caja`);
                                                                            const cajas_cantidad = getValues(`detalle.${index}.caja_cantidad`);

                                                                            const cantidad = cajas*cajas_cantidad;

                                                                            setValue(`detalle.${index}.cantidad` ,cantidad)
                                                                        }
                                                                    })}  className='form-control' tabIndex={1}  />
                                                                    
                                                                </div>
                                                                <input type='hidden' {...register(`detalle.${index}.cantidad`, { required: true })}/>
                                                            </>

                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text" id="basic-addon1">Unid.</span>
                                                                    <input type='text'
                                                                    {...register(`detalle.${index}.cantidad`, { required: true })} 
                                                                    className='form-control' tabIndex={1}  />
                                                                    
                                                                </div>
                                                                <input type='hidden' {...register(`detalle.${index}.caja`)}/>
                                                            </>
                                                        )
                                                    }

                                                        <input type='hidden' {...register(`detalle.${index}.caja_cantidad`, { required: true })} />
                                                        <input type='hidden' {...register(`detalle.${index}.id`)}/>
                                                    </td>
                                                <td data-label="Acciones">
                                                        <button type="button" className='btn btn-danger' onClick={() =>  remove(index)}>
                                                            Delete
                                                        </button>
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
