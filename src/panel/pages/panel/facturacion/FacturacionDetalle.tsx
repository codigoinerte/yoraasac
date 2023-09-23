import React, { useEffect, useRef, useState } from 'react'
import { ContainerInner, FormControls } from '../../../components';
import { BuscarProducto, FormFacturacionValues, breadcrumb as bread } from '../../../interfaces';
import { useFacturastore, useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SelectPicker } from 'rsuite';
import { Toaster, toast } from 'react-hot-toast';
import { DateNow } from '../../../helpers';
import { NotaHeladero } from '../../../../interfaces';
import { toastMessage } from '../../../../helpers';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Facturación', enlace: '/facturacion' },
    { id:2, titulo: 'Facturación detalle', enlace: '' },
];


export const FacturacionDetalle = () => {

    const [selectProducto, setSelectProducto] = useState<BuscarProducto>();

    const refId = useRef<any>('0')

    const {  saveFacturacion, updateFacturacion, getFacturacion, active  } = useFacturastore();

    const {  active:nota_heladero_info, getNotaHeladero  } = useNotaHeladeroStore();

    const { listEstadosFactura ,listBuscarProducto, listUsuario, loadBuscarUsuario, loadBuscarProducto, loadFacturaEstados, loadDocumentoSerie } = useHelpers();

    

    const { register, handleSubmit, formState, setValue, getValues, control } = useForm<FormFacturacionValues>({
        defaultValues:{       
            productos: []
        }
    });

    const { fields, append, remove,} = useFieldArray({
        control,
        name: "productos"
    });

    const { errors } = formState;

    const { id = 0 } = useParams(); 

    const queryParameters = new URLSearchParams(window.location.search)
    const from = queryParameters.get("gf")??'';
    const from_id = queryParameters.get("id")??0;
    
    const loadDocumento = (tipo = 1) => {

        loadDocumentoSerie(tipo)
        .then((data)=>{
           
            let serie = data!.serie??'';
            let correlativo = parseInt((data!.correlativo??0).toString());

            setValue('serie', serie);
            setValue('correlativo', correlativo);
        });
    }
    
    useEffect(() => {
        
        refId.current = id;

        loadFacturaEstados();
            
        if(from == '' && parseInt(from_id.toString()) == 0)
        {    //console.log('cargando guardado');
            if(refId.current == 0)
            {
                const dateNow = DateNow();
                
                loadDocumento();
                setValue('fecha_emision', dateNow);
                setValue('fecha_pago', dateNow);
                setValue('id_estado', 1);
            }
            else
            {            
                getFacturacion(refId.current)
                .then((factura)=>{

                    setValue('fecha_emision', active?.fecha_emision ?? '');
                    setValue('fecha_pago', active?.fecha_pago ?? '');
                    setValue('tipo', active?.tipo ?? 0);
                    setValue('serie', active?.serie ?? '');
                    setValue('correlativo', active?.correlativo ?? 0);
                    setValue('user_id', active?.user_id ?? 0);
                    setValue('tipo_transaccion', active?.tipo_transaccion ?? 0);
                    setValue('id_estado', active?.id_estado ?? 0);
                    setValue('estado', active?.id_estado ?? 0);

                    let detalle = [];

                    if(factura!.detalle != undefined)
                    {
                        detalle = factura!.detalle.map((item)=>({
                            ...item,
                            total: parseFloat((  ((item.cantidad??1) * (item.precio??0) * ( 1 - ((item.descuento??0) / 100))).toFixed(2) ).toString())
                        }))
                    
                        setValue('productos', detalle);
                    }

                    let usuario_id = active?.user_id??0;

                    if(usuario_id != 0){
                        
                        loadBuscarUsuario(usuario_id, "codigo");
                        setValue('user_id', active!.user_id);
                    }

                });
            }
        }
    }, []);

    useEffect(() => {

        if(from =='nota' && from_id!=0 && nota_heladero_info !=null){
            //console.log(`cargando importado desde ${from} y id ${from_id}`);
            if(nota_heladero_info.id == parseInt(from_id.toString())){
                
                printNotaHeladero(nota_heladero_info);
            }
        }else if(from == 'nota' && from_id!=0 && nota_heladero_info == null){
            //console.log(`cargando importado desde ${from} y id ${from_id} y sin previa carga`);
            const current_id_nota = parseInt(from_id.toString());
            getNotaHeladero(current_id_nota)
            .then((nota_heladero_info)=>{

                printNotaHeladero(nota_heladero_info);

            });            
        }
      
    }, [from_id])

    const onSubmit: SubmitHandler<FormFacturacionValues> = (data) => {
        if(fields.length == 0){
            toastMessage({
                data:[],
                message: 'Porfavor ingrese almenos un producto',
                success: true,
                custom:{
                    title : 'Alerta !',
                    icon : '',
                    confirmButtonText: 'ok',
                }
            });
            return false;
        }
        
        if(refId.current == 0){            
            saveFacturacion({
                ...data,
                'estado': data.id_estado,
                productos: data.productos.length > 0 ? data.productos : [],
            })
            .then((e)=>{
                
                refId.current = e!.id;

            })

            
            
        }else{            
            updateFacturacion({
                ...data,
                'estado': data.id_estado,
                productos: data.productos.length > 0 ? data.productos : [],
            });
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
                precio: parseFloat(selectProducto!.precio_venta??0),
                descuento: 0,
                cantidad: 1,
                total: parseFloat(selectProducto!.precio_venta??0),
                id: 0
             });

        }else{
            
            toast.error('El producto ya fue añadido');
        }

    }

    const onChangeTotal = (index:number)=>{

        const cantidad =  getValues(`productos.${index}.cantidad`)??1;
        const precio =  getValues(`productos.${index}.precio`)??0;
        const descuento =  getValues(`productos.${index}.descuento`)??0;

        let subtotal = (cantidad * precio * ( 1 - (descuento / 100))).toFixed(2);
        
        setValue(`productos.${index}.total`, parseFloat(subtotal.toString()));
    }

    const cabecera = [
        "Producto",
        "Cantidad",
        "Precio",
        "Descuento",
        "Total"
    ];

    const buscarUsuarioReserva = async (user:any)=> {

        setValue('user_id', user);

    }

    const updateDataUser = (buscar:string) => {
        
        if(typeof buscar == "undefined") return false;
        
        loadBuscarUsuario(buscar);        
    }

    const updateSerie = (e:any) =>{

        let tipoDoc = parseInt((e.target.value).toString());

        loadDocumento(tipoDoc);
    }
    
    type Nota = NotaHeladero | undefined;

    const printNotaHeladero = (nota_heladero_info:Nota)=>{

        const dateNow = DateNow();
        
        loadDocumento();
        setValue('fecha_emision', dateNow);
        setValue('fecha_pago', dateNow);
        setValue('id_estado', 1);

        setValue('user_id', nota_heladero_info?.user_id ?? 0);

        let usuario_id = nota_heladero_info?.user_id??0;

        if(usuario_id != 0){
            
            loadBuscarUsuario(usuario_id, "codigo");
            setValue('user_id', nota_heladero_info!.user_id);
        }

        let detalle = [];
        
        if(nota_heladero_info?.detalle != undefined)
        {
            detalle = nota_heladero_info!.detalle.map((item)=>({
                id:item.id??0,
                codigo:item.codigo??'',
                Producto:item.producto,
                cantidad: item.vendido??0,
                descuento: 0,
                precio: parseFloat( (item.importe??0).toString() ),
                total: parseFloat(  ((item.vendido??1) * (parseFloat(item.importe??'0'))).toString()),

            }))
        
            setValue('productos', detalle);
        }
    }

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>  
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControls save={()=>console.log(1)} page="facturacion"/>

                <hr className='border border-1 opacity-50'/>

                <h4>Informaci&oacute;n</h4>
                
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        
                        <div className="mb-3">
                            <label htmlFor="fecha_emision" className="form-label">Fecha de emisión</label>
                            <input type="date" 
                                    className={ errors.fecha_emision ? "form-control is-invalid" : "form-control"}
                                    {...register('fecha_emision', { required:true })} 
                                    />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fecha_movimiento" className="form-label">Tipo</label>
                            <div className="d-flex gap-3">                                
                                <select 
                                        className={ errors.tipo ? "form-control is-invalid" : "form-control"}
                                        {...register('tipo', { 
                                            required:true,
                                            onChange: (e)=>{
                                                updateSerie(e);
                                            } 
                                        })}>
                                    <option value="1">Boleta</option>
                                    <option value="2">Factura</option>
                                </select>  
                            </div>
                        </div>                       
                        
                            
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                                                    
                        <div className="mb-3">
                            <label htmlFor="fecha_pago" className="form-label">Fecha de pago</label>
                            <input type="date" 
                                    className={ errors.fecha_pago ? "form-control is-invalid" : "form-control"}
                                    {...register('fecha_pago', { required:true })} />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="fecha_movimiento" className="form-label">Numero de documento</label>
                            <div className="d-flex gap-3">                                
                                <input type="text" 
                                        aria-label="serie" 
                                        placeholder='Serie'
                                        className={ errors.serie ? "form-control is-invalid" : "form-control"}
                                        {...register('serie', { required:true })} readOnly/>-
                                <input type="text" 
                                        aria-label="núm. doc." 
                                        placeholder='nùm doc.' 
                                        className={ errors.correlativo ? "form-control flex-1 is-invalid" : "form-control flex-1"}
                                        {...register('correlativo', { required:true })} readOnly/>
                            </div>
                        </div>
                                    
                        
                    </div>

                </div>  

                <h4>Cliente</h4>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">

                        <Controller
                            name="user_id"
                            control={control}
                            rules={{required:true}}                            
                            render={({ field }) => 
                            
                            <div ref={field.ref}>
                                <SelectPicker   
                                        {...field}                      
                                        data={
                                            listUsuario.map((usuario)=>({
                                                label: `${usuario.documento??''} - ${usuario.name??''}`,
                                                value: usuario.id??''
                                            }))
                                        }
                                        style={{ width: 224 }}                        
                                        onSearch={updateDataUser}
                                        onChange={buscarUsuarioReserva}
                                        placeholder='Buscar Producto'
                                        className={errors.user_id ? "form-control is-invalid p-0" : "form-control p-0"}
                                    />
                            </div>
                            
                            
                    }/>
                        
                    </div>
                </div>

                <h4>Parametros</h4>

                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                        <div className="mb-3">
                            <label htmlFor="tipo_transaccion" className="form-label">Tipo de transacción</label>
                            <select 
                                    className={ errors.tipo_transaccion ? "form-control is-invalid" : "form-control"}
                                    {...register('tipo_transaccion', { required:true })}>
                                <option value="1">Contado</option>
                                <option value="2">Credito</option>
                            </select>                                                
                        </div>

                    </div>
                    
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <select className={ errors.id_estado ? "form-control is-invalid" : "form-control"}
                                    {...register('id_estado', { required:true })}>
                                        {
                                            listEstadosFactura.map(({ id, estado })=>(
                                                <option key={id} value={id}>{estado}</option>
                                            ))
                                        }
                                
                            </select>                                              
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
                                            fields.map((item, index)=>{
                                            return (                                    
                                                
                                                    <tr key={item.id}>                                                                
                                                            <td className='text-left'>
                                                                <p>{item.codigo} <br/> {item.producto}</p>
                                                                <input type="hidden" {...register(`productos.${index}.codigo`)}/>
                                                                <input type="hidden" {...register(`productos.${index}.id`)}/>
                                                                <input type="hidden" {...register(`productos.${index}.facturas_id`)}/>
                                                            </td>
                                                            <td>
                                                                <input type="number" className='form-control' {...register(`productos.${index}.cantidad`, {
                                                                    onChange: ()=> onChangeTotal(index)
                                                                })} />
                                                            </td>
                                                            <td>
                                                                <input type="text" className='form-control' {...register(`productos.${index}.precio`, {
                                                                    onChange: ()=> onChangeTotal(index)
                                                                })}/>
                                                            </td> 
                                                            <td>
                                                                <input type="number" className='form-control' {...register(`productos.${index}.descuento`,{
                                                                    onChange: ()=> onChangeTotal(index)
                                                                })}/>
                                                            </td>                                                            
                                                            <td>
                                                                {/* {item.total} */}
                                                                <input type="text" className='form-control' {...register(`productos.${index}.total`)} readOnly/>
                                                            </td>                                                            
                                                            <td>
                                                                <button type="button" className='btn btn-danger' onClick={() => remove(index)}>
                                                                    Delete
                                                                </button>
                                                            </td>                                                            
                                                    </tr>
                                                
                                            )})
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
