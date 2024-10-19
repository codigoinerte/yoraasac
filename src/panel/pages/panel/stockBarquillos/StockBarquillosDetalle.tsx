import React, { useEffect, useState } from 'react'
import { ContainerInner, FormControls, FormStock, SearchNota } from '../../../components'
import { BuscarProducto, FormStockBarquilloValues, Breadcrumb as bread } from '../../../interfaces';
import { useHelpers, useStockBarquillosStore } from '../../../../hooks';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../interfaces';
import { SelectPicker } from 'rsuite';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Movimientos', enlace: '/movimiento' },
  { id:2, titulo: 'Barquillos', enlace: '/movimiento/barquillos' },
  { id:3, titulo: 'Barquillos detalle', enlace: '' }
];
type idorigin = string | 0;
type order = 'asc' | 'desc';
interface cabecera {
    key: string,
    keyDetail: string,
    titulo: string,
    order: order,
    active: boolean,
}

export const StockBarquillosDetalle = () => {

    const [cabecera, setCabecera] = useState<cabecera[]>([
        {
            key: "col-1",
            titulo: "codigo",
            order: "asc",
            keyDetail: "codigo",
            active: false,
        },
        {
            key: "col-2",
            keyDetail: "producto",
            titulo: "Producto",
            order: "asc",
            active: false,
        },
        {
            key: "col-3",
            keyDetail: "cantidad",
            titulo: "cantidad",
            order: "asc",
            active: false,
        },
    ]);
    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;
    const [selectProducto, setSelectProducto] = useState<BuscarProducto>();
    const [TipoDocumentoItem, setTipoDocumentoItem] = useState(3);
    const [unidades, setUnidades] = useState(1);
    const [tipo, setTipo] = useState(1);

    const { listMovimiento,
            listTipoDocumento,
            listBuscarProducto,

            loadMovimientos,
            loadTipoDocumento,
            loadBuscarProducto,} = useHelpers();

    const { register, handleSubmit, reset, formState, setValue, getValues, control  } = useForm<FormStockBarquilloValues>();


    const { fields, append, remove } = useFieldArray({
        control,
        name: "detalle"
    });

    const { errors } = formState;

    const { id: idOrigin = 0 } = useParams();  
    
    const [id, setId] = useState<idorigin>(idOrigin);

    const { active, saveStockBarquillo, updateStockBarquillo, getStockBarquillo, deleteImagenBarquillo  } = useStockBarquillosStore();

    const initLoadContent = async () => {
        const idStock = parseInt(id.toString());

        await loadMovimientos();
        await loadTipoDocumento();
        await loadBuscarProducto();

        if(idStock == 0) return;

        const stock = await getStockBarquillo(idStock);

        setUnidades(stock?.unidades);
        setValue('unidades', stock?.unidades);
        setValue('movimientos_id', stock?.movimientos_id);
        setValue('tipo_documento_id', stock?.tipo_documento_id);
        setValue('fecha_movimiento', stock?.fecha_movimiento);
        setValue('numero_documento', stock?.numero_documento);
        setValue('image_file', stock?.imagen);
        setValue('detalle', stock?.detalle);
        setTipo(stock?.movimientos_id);
        setTipoDocumentoItem(stock?.tipo_documento_id);

        console.log(active?.movimientos_id);
    }

    useEffect(() => {
      
        initLoadContent();
      
    }, []);

    const onSubmit: SubmitHandler<FormStockBarquilloValues> = async (data) => {
        
        if(id == 0){
            const response = await saveStockBarquillo({...data});
            if(response.id){
                window.history.pushState(null, '', `/movimiento/barquillos/${response.id}`);
                setId(response.id);

                if(response.detalle){
                    setValue("detalle", response.detalle);
                }
            }
        }else{
            const response = await updateStockBarquillo({...data});
            if(response.detalle){
                setValue("detalle", response.detalle);
            }
        }
    }

    const getDisableInput = () => {        
        return parseInt(id.toString()) > 0 && active?.movimientos_id == 5 && TipoDocumentoItem == 5 ? true : false
    }

    const deleteImageHelado = async () => {

        if(!getValues("image_file") || getValues("image_file") == undefined) return;

        deleteImagenBarquillo(parseInt(id.toString()), getValues("image_file")??'');

        setValue("image_file", "");
        
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
    const onSortProducts = (key:string) => {
        const detalle = getValues("detalle");
        const objectSorter = cabecera.find((item) => item.key == key);

        const keyDetail  = objectSorter!.keyDetail;
        const orderDirection = objectSorter!.order;

        if(!detalle) return;

        let order = null;        
        if (orderDirection == "asc") {
            order = detalle.sort((a, b) => b[keyDetail]!.localeCompare(a[keyDetail]??'')) 
        }else{
            order =  detalle.sort((a, b) => a[keyDetail]!.localeCompare(b[keyDetail]??''))
        }

        setValue("detalle", order);
        
        setCabecera(cabecera.map((item)=>{
            if(item.key == key){
                return {
                    ...item,
                    order: item.order == "asc" ? "desc" : "asc",
                    active: true
                    
                }
            }else{
                return {
                    ...item,
                    active: false,
                };
            }
        }));
    }
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
          
            <form onSubmit={handleSubmit(onSubmit)}>

            <FormControls category="movimiento" save={()=>console.log(1)} page="barquillos"/>

            <hr className='border border-1 opacity-50'/>

            <h4>Informaci&oacute;n</h4>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="tipo_movimiento" className="form-label">Unidades de transferencia</label>
                        
                        <div className="btn-group d-block" role="group">
                            <button type="button" className={`btn btn-primary ${unidades == 1 ? 'active' : ''}`} onClick={() => {
                                setUnidades(1);
                                setValue("unidades", 1);
                            }}>
                                Unidades { unidades == 1 && <i className="bi bi-check"></i> }
                            </button>
                            <button type="button" className={`btn btn-primary ${unidades == 2 ? 'active' : ''}`} onClick={() => {
                                setUnidades(2);
                                setValue("unidades", 2);
                            }} disabled={ TipoDocumentoItem == 5 ? true : false }>
                                Cajas { unidades == 2 && <i className="bi bi-check"></i> }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="tipo_movimiento" className="form-label">Tipo de movimiento</label>
                        <select className={errors.movimientos_id ? "form-control is-invalid" : "form-control"}
                                    {...register('movimientos_id', {
                                        required: true,
                                        onChange: (e) => {
                                            setTipo(e.target.value);
                                        }

                                    })}
                                    disabled={getDisableInput()}
                                    >
                            <option value="">-seleccione una opcion-</option>                          
                            {
                                listMovimiento.map(({ id, movimiento })=>(
                                    
                                    <option value={id} key={id}>{movimiento}</option>
                                    
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="tipo_documento" className="form-label">Tipo de Documento</label>
                        <select className='form-control'
                                    {...register('tipo_documento_id', {
                                        onChange: (e) => {
                                            setTipoDocumentoItem(e.target.value);
                                            if(e.target.value == 5){
                                                setUnidades(1);
                                                setValue("unidades", 1);
                                            }
                                        }
                                    })}
                                    disabled={getDisableInput()}>
                            <option value="">-seleccione una opcion-</option>                          
                            {
                                listTipoDocumento
                                .filter((item)=> (item.tipo == getValues("movimientos_id") || item.tipo == 0))
                                .map(({id, documento})=>(
                                    <option value={id} key={id}>{documento}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>               
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">                                
                    <div className="mb-3">
                        <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                        <input type="date" 
                                    className={errors.fecha_movimiento ? "form-control is-invalid" : "form-control"}
                                    aria-describedby="fecha_movimiento" 
                                    {...register('fecha_movimiento', { required:true, onChange: (e) => {
                                        setTipoDocumentoItem(e.target.value);
                                    } })}/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="num_documento" className="form-label">N&uacute;m de documento</label>
                        {
                            <input  type="text" 
                                    className="form-control" 
                                    aria-describedby="num_documento"
                                    {...register('numero_documento')} />
                        }
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="num_documento" className="form-label">Documento adjunto</label>
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
            </div>  

            <h4>Productos o items del movimiento</h4>

            <div className="row">
                
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="input-group mb-3">
                        <SelectPicker                        
                            data={
                                listBuscarProducto
                                .filter((item)=> item.is_barquillo == true)
                                .map((producto)=>({
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
                                            cabecera.map((item)=>(
                                                <th key={item.key} scope="col">
                                                    {
                                                        (item.key == 'col-1' || item.key == 'col-2') ?
                                                        (
                                                            <button
                                                                className={ (item.active ? 'bg-success' : '') }
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    
                                                                    onSortProducts(item.key);                                                                                                                                       
                                                                }}>
                                                                { item.titulo }
                                                                <i className={ (item.order == "asc" ? 'bi bi-arrow-up' : 'bi bi-arrow-down') }></i>
                                                            </button>
                                                        )                                            
                                                        :
                                                        (
                                                            item.titulo
                                                        )
                                                        
                                                        
                                                    }
                                                </th>
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
                                                        unidades == 2 ?
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
                                                                    })}  
                                                                    className={errors.detalle ? "form-control is-invalid" : "form-control"} 
                                                                    tabIndex={1}
                                                                    readOnly={getDisableInput()}  />
                                                                    
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
                                                                    {...register(`detalle.${index}.cantidad`, { 
                                                                        required: true,
                                                                        onChange: (e) => {
                                                                            const is_litro = getValues(`detalle.${index}.is_litro`) ?? 0;
                                                                            const cantidad = getValues(`detalle.${index}.cantidad`) ?? 0;
                                                                            const cantidad_max = getValues(`detalle.${index}.min_cantidad`) ?? null;
                                                                            
                                                                            if(cantidad_max){
                                                                                if(is_litro == 1){
                                                                                    setValue(`detalle.${index}.cantidad`, cantidad > 0 ? 1 : 0);
                                                                                    return;
                                                                                }

                                                                                if(cantidad > cantidad_max){
                                                                                    setValue(`detalle.${index}.cantidad`, cantidad_max);
                                                                                }
                                                                            }
                                                                        }
                                                                     })} 
                                                                    className='form-control' 
                                                                    tabIndex={1}
                                                                    readOnly={getDisableInput()}
                                                                    />
                                                                    
                                                                </div>
                                                                <input type='hidden' {...register(`detalle.${index}.caja`)}/>
                                                            </>
                                                        )
                                                    }

                                                        <input type='hidden' {...register(`detalle.${index}.caja_cantidad`, { required: true })} />
                                                        <input type='hidden' {...register(`detalle.${index}.id`)}/>
                                                    </td>
                                                <td data-label="Acciones">
                                                    {
                                                        TipoDocumentoItem != 5 ?
                                                        (
                                                            <button type="button" className='btn btn-danger' onClick={() =>  remove(index)}>
                                                                Delete
                                                            </button>

                                                        ) : ''
                                                    }
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
