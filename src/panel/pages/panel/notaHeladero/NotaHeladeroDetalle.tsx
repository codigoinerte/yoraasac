import React, { useEffect, useRef, useState } from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { FormNotaHeladeroValues, ProductosPublicados, breadcrumb as bread, listaDetalle} from '../../../interfaces';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { useParams } from 'react-router-dom';
import { DatePicker, SelectPicker } from 'rsuite';
import { useDispatch } from 'react-redux';
import { onSetNotaHeladeroActive, onStatus } from '../../../../store';
import moment from 'moment';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Nota heladero', enlace: '/nota-heladero' },
    { id:2, titulo: 'Nota heladero detalle', enlace: '' },
  ];


export const NotaHeladeroDetalle = () => {

    //const [principalId, setPrincipalId] = useState<any>("0");

    const refId = useRef<any>('0')

    const [estadoTitulo, setEstadoTitulo] = useState('Nueva cuenta');

    const {  saveNotaHeladero, updateNotaHeladero, getNotaHeladero, active  } = useNotaHeladeroStore();

    const { listEstadoHeladero, listUsuario, listProductosPublicados, listNotaGuardada, listNotaHeladeroEstado, loadProductosDisponibles, loadBuscarUsuario, loadBuscarNotaHeladeroGuardada} = useHelpers();

    const [selectUsuario, setSelectUsuario] = useState<ProductosPublicados>();    

    const { register, handleSubmit, reset, formState, setValue, getValues, control } = useForm<FormNotaHeladeroValues>({
        defaultValues:{       
            productos: []
        }
    });

    const { fields, append, prepend, remove, swap, move, insert, replace} = useFieldArray({
        control,
        name: "productos"
    });

    const { errors } = formState;

    const { id = 0 } = useParams(); 
    
    // useEffect(() => {
    //     console.log(id);
        
    // }, [id])

    
    useEffect(() => {
        
        refId.current = id;
        //console.log(id);
        //setPrincipalId(id);

        listNotaHeladeroEstado();

        loadProductosDisponibles()
        .then((productos)=>{
            
            if(productos!= undefined){

                setValue("productos", [
                    ...productos.map(({ nombre, codigo }:ProductosPublicados)=>({
                        producto: nombre,
                        codigo
                    }))
                ]);
            }
        });

        
        //si no hay id principal
        if(refId.current == 0)
        {
            let dateNow = moment(new Date()).format("yyyy-MM-DD hh:mm").toString();
            setValue('fecha_operacion', dateNow.replace(" ", "T"));
        }
        else
        {            
            getNotaHeladero(refId.current)
            .then((heladero)=>{

                if(heladero != undefined){
                    

                  

                    let detalle = heladero.detalle??[];
        
                    if(heladero?.estado != undefined) {
        
                        let estado = (heladero.estado == 3) ? 2 : heladero.estado;
        
                        if(estado == 3){
                            setEstadoTitulo('Reserva');
                        }else if(estado == 1){
                            setEstadoTitulo('Cierre');
                        }else{
                            setEstadoTitulo('Apertura');
                        }

                        setValue('estado', estado);
                    }
        
                    if(heladero?.fecha_cierre && heladero.estado == 1){
        
                        const dateNow = heladero.fecha_cierre??new Date();
                        const dateCurrent = moment(dateNow).format("YYYY-MM-DD HH:mm").toString();
                        setValue('fecha_operacion', dateCurrent);

                    }else{
                        let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                        
                        setValue('fecha_operacion', dateNow);
                    }
        
                    if(detalle.length > 0){
                        setValue('productos', heladero.detalle);
                    }

                    //cargar lista de heladeros

                    let heladero_id = heladero.user_id??0;

                    if(heladero_id != 0){
                        
                        loadBuscarUsuario(heladero_id, "codigo");
                        setValue('user_id', heladero?.user_id);
                    }
                                
                }

            });
        }
      
    }, []);

    const onSubmit: SubmitHandler<FormNotaHeladeroValues> = (data) => {
        
        if(refId.current == 0){            
            saveNotaHeladero({...data});
        }else{            
            updateNotaHeladero({...data});
        }
    }

    const updateData = (buscar:string) => {
        
        if(typeof buscar == "undefined") return false;
        
        loadBuscarUsuario(buscar);        
    }

    const cabecera = [
        "Devolucion",
        "Pedido",
        "Producto",
        "Vendido",
        "Importe"
    ];

    const dispatch = useDispatch();

    const buscarUsuarioReserva = async (user:any)=> {

        if(user == undefined) return false;
        
        setValue('user_id', user);

        const heladero = await loadBuscarNotaHeladeroGuardada(parseInt(user.toString()));
        
        if(heladero != undefined && heladero !== false && heladero.id != undefined){

            //setPrincipalId(heladero.id);
            refId.current = heladero.id;

            let detalle = heladero.detalle??[];

            dispatch(onSetNotaHeladeroActive(heladero));

            if(heladero?.estado != undefined) {

               if(heladero.estado == 3){ // si el estado es de guardado (nuevo o paso 1)
                    setValue('estado', 2); // el estado pasa  a apertura (se busca aperturar lo que el dia anterior se guardo)
                    setEstadoTitulo('Reabriendo cuenta guardada');
               }
               
               if(heladero.estado == 2 && heladero.fecha_cierre == null){ // si el estado es de apertura (paso 2)
                    setValue('estado', 1); //el estado pasa a cierre (se busca primero cerrar la cuenta del heladero)
                    setEstadoTitulo('Cerrando cuenta del dia');
               }
               
               if(heladero.estado == 2 && heladero.fecha_cierre != null){
                    setEstadoTitulo('Cuenta cerrada');
               }
            }

            if(heladero?.fecha_cierre && heladero.estado == 1){
                const dateNow = heladero.fecha_cierre??new Date();
                const dateCurrent = moment(dateNow).format("YYYY-MM-DD HH:mm").toString();
                setValue('fecha_operacion', dateCurrent.replace(" ","T"));
            }else if(heladero.estado == 2 || heladero.estado == 3){
                let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                
                setValue('fecha_operacion', dateNow.replace(" ","T"));
            }

            if(detalle.length > 0){
                setValue('productos', heladero.detalle);
            }
    
            dispatch(onStatus(false));
        }else{

            refId.current = 0;
            setValue('estado', 3);
            let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                
            setValue('fecha_operacion', dateNow.replace(" ","T"));            
            setEstadoTitulo('Guardando productos del dia');

            fields.map((item, index) => {
                setValue(`productos.${index}.pedido`, 0);
                setValue(`productos.${index}.devolucion`, 0);                
                setValue(`productos.${index}.vendido`, 0);
                setValue(`productos.${index}.importe`, '');
            });
        }

    }

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo={`Nota heladero - ${estadoTitulo}`}>
            <>            
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <FormControls save={()=>console.log(1)} page="nota-heladero"/>

                    <hr className='border border-1 opacity-50'/>

                    <h4>Informaci&oacute;n</h4>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                            <div className="mb-3">
                                <label htmlFor="tipo_movimiento" className="form-label">Heladero</label>
                                
                                 
                    <div className="d-block">
                      

                        <Controller
                            name="user_id"
                            control={control}
                            rules={{required:true}}                            
                            render={({ field }) => 

                            <SelectPicker   
                                    {...field}                      
                                    data={
                                        listUsuario.map((usuario)=>({
                                            label: `${usuario.documento??''} - ${usuario.name??''}`,
                                            value: usuario.id??''
                                        }))
                                    }
                                    style={{ width: 224 }}                        
                                    onSearch={updateData}
                                    onChange={buscarUsuarioReserva}
                                    placeholder='Buscar Producto'
                                    className={errors.user_id ? "form-control is-invalid p-0" : "form-control p-0"}
                                />
                            
                            
                        }/>

                 


                    </div>
                                

                            </div>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            
                            <div className="mb-3">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <select 
                                className={errors.estado ? "form-control is-invalid" : "form-control"}
                                {...register('estado', {required: true})} >
                                <option value="">Seleccione una opci&oacute;n</option>
                                    {
                                        listEstadoHeladero.map(({ id, nombre })=>(
                                            <option key={id} value={id}>{nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                                                
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        
                            <div className="mb-3">
                                <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                                <input type="datetime-local" 
                                    className={errors.fecha_operacion ? "form-control is-invalid" : "form-control"}
                                    {...register('fecha_operacion', {required: true})}/>

                               
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
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                {
                                                    cabecera.map((titulo)=>(
                                                        <th key={titulo} scope="col">{ titulo }</th>
                                                    ))
                                                }                                                    
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        {
                                            fields.map((item, index) => {
                                                return (
                                                <tr key={item.id}>                                                    
                                                    <td>
                                                        <input type="text" className='form-control' {...register(`productos.${index}.devolucion`)} />
                                                    </td>                                                     
                                                    <td>
                                                        <input type="text" className='form-control' {...register(`productos.${index}.pedido`)} />
                                                    </td>                                                     
                                                    <td>
                                                        { item.producto }
                                                        <input type="hidden" className='form-control' {...register(`productos.${index}.codigo`)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className='form-control' {...register(`productos.${index}.vendido`)}/>
                                                    </td> 
                                                    <td>
                                                        <input type="text" className='form-control'  {...register(`productos.${index}.importe`)}/>
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
