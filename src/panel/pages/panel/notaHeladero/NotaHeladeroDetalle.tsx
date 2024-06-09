import { useEffect, useRef, useState } from 'react'
import { ContainerInner, FormControls, ModalNotaHeladeroRegister } from '../../../components'
import { FormNotaHeladeroValues, ProductosPublicados, breadcrumb as bread } from '../../../interfaces';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectPicker } from 'rsuite';
import { Tooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux';
import {  onSetNotaHeladeroActive, onStatus } from '../../../../store';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import NotasComponent from '../../../../prints/Notas';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Nota heladero', enlace: '/nota-heladero' },
    { id:2, titulo: 'Nota heladero detalle', enlace: '' },
];

type order = 'asc' | 'desc';
/*
    Estados : {
        1: 'Cierre'
        2: 'Reapertura',
        3: 'Guardado',
    }
*/

export const NotaHeladeroDetalle = () => {

    //const [principalId, setPrincipalId] = useState<any>("0");
    let navigate = useNavigate();

    const refId = useRef<any>('0');

    const [orderDirection, setOrderDirection] = useState<order>("asc");

    const [estadoTitulo, setEstadoTitulo] = useState('Nueva cuenta');

    const [isNewRegister, setisNewRegister] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [state, setState] = useState<number|null>(null);

    const [isReadOnlyInputs, setisReadOnlyInputs] = useState({
        isReadOnlyDevolucion : false,
        isReadOnlyPedido : false,
        isReadOnlyVendido : false,
        isReadOnlyImporte : false,
    })

    const {  saveNotaHeladero, updateNotaHeladero, getNotaHeladero, setNullNotaHeladero, active  } = useNotaHeladeroStore();

    const { listEstadoHeladero, listUsuario, listNotaHeladeroEstado, loadProductosDisponibles, loadBuscarUsuario, loadBuscarNotaHeladeroGuardada} = useHelpers();

    const { register, handleSubmit, formState, setValue, getValues, control } = useForm<FormNotaHeladeroValues>({
        defaultValues:{   
            estado: 2,    
            productos: []
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "productos"
    });

    const dispatch = useDispatch();

    const { errors } = formState;

    const { id = 0 } = useParams(); 

    const calcImporte = (index:number)=> {

        let vendido = (!getValues(`productos.${index}.vendido`)) ? 0 : parseFloat(getValues(`productos.${index}.vendido`)!.toString());
        let precio_operacion = (!getValues(`productos.${index}.precio_operacion`)) ? 0 : parseFloat(getValues(`productos.${index}.precio_operacion`)!.toString());
        let precio_final = precio_operacion * parseInt(vendido.toString());        
        setValue(`productos.${index}.importe`, precio_final.toString());
    }
    const calculo_precio_final = (precio_venta:string, descuento:string) => {
        let p = precio_venta==""?0: parseFloat(precio_venta);
        let d = descuento==""?0: parseFloat(descuento);
        
        let precio_final = p - (p*(d/100));
        
        
       return (precio_final < 0 ?  0 : precio_final);
    }

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
        {
            desk: "Devolucion",
            print: "Dev."
        },
        {
            desk: "Pedido",
            print: "Ped."
        },
        {
            desk: "Producto",
            print: "Prod."
        },
        {
            desk: "Vendido",
            print: "Vend"
        },
        {
            desk: "Importe",
            print: "Imp."
        },
    ];

    // region Buscar Nota por Heladero
    const buscarUsuarioReserva = async (user:any)=> {

        if(user == undefined) return false;
        
        setValue('user_id', user);

        const heladero = await loadBuscarNotaHeladeroGuardada(parseInt(user.toString()));
        
            /* si heladero(toda la info de la nota del headero) existe previamente se completa la data*/
        if(heladero != undefined && heladero !== false && heladero.id != undefined){
            setisNewRegister(false);
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
               setState(heladero.estado);
            }


            if(heladero?.fecha_cierre && heladero.estado == 1){
                const dateNow = heladero.fecha_cierre;
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
            /* si heladero(toda la info de la nota del headero) no existe previamente se define estado en reapertura, el cual funciona como un nuevo dia */
            refId.current = 0;
            
            setState(2);
            setValue('estado', 2);
            setisNewRegister(true);

            let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                
            setValue('fecha_operacion', dateNow.replace(" ","T"));            
            setEstadoTitulo('Guardando productos del dia');

            fields.map((_, index) => {
                setValue(`productos.${index}.pedido`, 0);
                setValue(`productos.${index}.devolucion`, 0);
                setValue(`productos.${index}.vendido`, 0);
                setValue(`productos.${index}.importe`, '');
                setValue(`productos.${index}.precio_operacion`, 0);
            });
        }

    }

    const redirectToFactura = () => navigate(`/facturacion/new?gf=nota&id=${refId.current}`); 

    const getDisableDate = (id:number) => ((id == 1 && active?.fecha_cierre) || (id == 2 && active?.fecha_apertura) || (id == 3 && active?.fecha_guardado)) ? true : false;

    const componentRef = useRef(null);

    const imprimir =  useReactToPrint({
        content: () => componentRef.current,
    });

    const onSortProducts = () => {
        const productos = getValues("productos");
        setValue("productos", (orderDirection == "asc") ? productos.sort((a, b) => b.producto!.localeCompare(a.producto??'')) :  productos.sort((a, b) => a.producto!.localeCompare(b.producto??'')) );
        setOrderDirection(orderDirection == "asc" ? "desc" : "asc");
    }

    const onLoadNotaHeladero = async () => {

        refId.current = id;

        await listNotaHeladeroEstado();
    
        const listProductosPublicados = await loadProductosDisponibles();
                            
        //si no hay id principal
        if(refId.current == 0)
        {
            setNullNotaHeladero();
              
            if(listProductosPublicados!= undefined)                
            setValue("productos", [
                ...listProductosPublicados.map((item:ProductosPublicados)=>({
                    producto: item.nombre,
                    precio_operacion: calculo_precio_final(item.heladero_precio_venta, item.heladero_descuento),
                    codigo: item.codigo,

                    id : item.id,
                    devolucion : 0,
                    pedido : 0,
                    vendido : 0,
                    importe : "0",
                    nota_heladeros_id : 0,
                    created_at : item.created_at,
                    updated_at : item.updated_at,
                    
                    }))
            ]);            
                        
            setValue('estado', 2);
            setValue('user_id', 0);
            setisNewRegister(true);
    
            let dateNow = moment(new Date()).format("yyyy-MM-DD hh:mm:ss").toString();
            setValue('fecha_operacion', dateNow.replace(" ", "T"));
        }
        else
        {            
            const heladero = await getNotaHeladero(refId.current);
            
            if(!heladero) return;
            
            dispatch(onSetNotaHeladeroActive(heladero));

            let detalle = heladero.detalle??[];
            
            if(heladero?.estado != undefined) {

                let estado = (heladero.estado == 3) ? 2 : heladero.estado;
                
                if(estado == 3){
                    setEstadoTitulo('Guardado');
                }else if(estado == 2){
                    setEstadoTitulo('Reapertura');
                }else if(estado == 1){
                    setEstadoTitulo('Cierre');
                }
                else{
                    setEstadoTitulo('Apertura');
                }

                setValue('estado', estado);
            }
            
            setState(heladero.estado);
            
            let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                        
            setValue('fecha_operacion', dateNow);

            if(detalle.length > 0)
            setValue('productos', heladero.detalle);

            //cargar lista de heladeros

            let heladero_id = heladero.user_id??0;

            if(heladero_id != 0){
                
                loadBuscarUsuario(heladero_id, "codigo");
                setValue('user_id', heladero?.user_id);
            }

            setValue(`monto`, (heladero.monto??0).toString());
            setValue(`pago`, (heladero.pago??0).toString());
            setValue(`ahorro`, (heladero.ahorro??0).toString());
            setValue(`debe`, (heladero.debe??0).toString());
        }
    }
        
    useEffect(() => {
        
        onLoadNotaHeladero();
      
    }, []);


    useEffect(() => {
        if(state == null){
            setisReadOnlyInputs((s) => ({
                ...s,
                isReadOnlyDevolucion : true,
                isReadOnlyPedido : false,
                isReadOnlyVendido : true,
                isReadOnlyImporte : true,
            }));
            setValue('estado', 2);
            return;
        }

        if(isNewRegister == true || state == 2){ // activar apertura | reapertura
            setisReadOnlyInputs((s) => ({
                ...s,
                isReadOnlyDevolucion : true,
                isReadOnlyPedido : false,
                isReadOnlyVendido : true,
                isReadOnlyImporte : true,
            }));
            return;
        }
       
        if(state == 3){ // activar guardado
            setisReadOnlyInputs((s) => ({
                ...s,
                isReadOnlyDevolucion : true,
                isReadOnlyPedido : true,
                isReadOnlyVendido : true,
                isReadOnlyImporte : true,
            }));
            setOpenModal(true);
            /* abrir modal para guardar helados*/
            return;
        }

        if(state == 1){ // activar cierre
            setisReadOnlyInputs((s) => ({
                ...s,
                isReadOnlyDevolucion : true,
                isReadOnlyPedido : true,
                isReadOnlyVendido : true,
                isReadOnlyImporte : true,
            }));

            let subtotal = 0;
            fields.forEach((item, index) => {
                
                const pedido = getValues(`productos.${index}.pedido`)??0;
                const devolucion = getValues(`productos.${index}.devolucion`)??0;
                const devolucion_today = getValues(`productos.${index}.devolucion_today`) ?? 0;
                const precio_operacion = getValues(`productos.${index}.precio_operacion`)??0;

                const vendido = ((devolucion + pedido) - devolucion_today);
                const importe = (vendido * precio_operacion).toFixed(2);

                setValue(`productos.${index}.vendido`, vendido);
                setValue(`productos.${index}.importe`, importe.toString());
                subtotal+=parseFloat(importe);
            })

            if(subtotal < 0) {
                setValue(`monto`, (0.00).toString());
                setValue(`pago`, (0.00).toString());
                setValue(`ahorro`, (0.00).toString());
                setValue(`debe`, (0.00).toString());
            }
            
            setValue(`monto`, subtotal.toString());
            setValue(`pago`, (0.00).toString());
            setValue(`ahorro`, (0.00).toString());
            setValue(`debe`, subtotal.toString());           
            return;
        }


    },[isNewRegister, state])
    
    const isPrint = (): boolean => active?.fecha_cierre ? true : false;

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo={`Nota heladero - ${estadoTitulo}`}>
            <>     
                
                <NotasComponent ref={componentRef} />
                     
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <FormControls save={redirectToFactura} page="nota-heladero" imprimir={imprimir} isPrint={isPrint()} isNew={true}/>

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
                                    placeholder='Buscar Usuario'
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
                                {...register('estado', {
                                    required: true,
                                    onChange: (e) => {
                                        setState(parseInt(e.target.value));
                                        setValue("estado", e.target.value);
                                    },
                                })
                                } >
                                    {
                                        listEstadoHeladero.map(({ id, nombre })=>(
                                            <option key={id} value={id} disabled={getDisableDate(id)}>{nombre}</option>
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
                                                        <th key={titulo.desk} scope="col">
                                                            <span className="desktop">
                                                                {
                                                                    (titulo.desk == 'Producto') ?
                                                                    (
                                                                        <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            
                                                                            onSortProducts();                                                                                                                                       
                                                                        }}>
                                                                            { titulo.desk }

                                                                            <i className={ orderDirection == "asc" ? 'bi bi-arrow-up' : 'bi bi-arrow-down' }></i>
                                                                        </button>

                                                                    )
                                                                    :
                                                                    (
                                                                        titulo.desk
                                                                    )
                                                                }
                                                            </span>
                                                            <span className="print">{ titulo.print }</span>
                                                        </th>
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
                                                        <input type="text" className='form-control' {...register(`productos.${index}.devolucion`)} readOnly={isReadOnlyInputs.isReadOnlyDevolucion}/>
                                                    </td>                                                     
                                                    <td>
                                                        <input type="text" className='form-control' {...register(`productos.${index}.pedido`)} readOnly={isReadOnlyInputs.isReadOnlyPedido}/>
                                                    </td>                                                     
                                                    <td data-tooltip-id={`tooltip-html-${index}`}
                                                        data-tooltip-html={`
                                                        <div style="text-align:left">
                                                            <b>Precio</b>: S/ ${getValues(`productos.${index}.precio_operacion`)??0}
                                                        </div>
                                                        `}>
                                                        <Tooltip id={`tooltip-html-${index}`} />
                                                        { item.producto }
                                                        <input type="hidden" className='form-control' {...register(`productos.${index}.codigo`)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className='form-control' {...register(`productos.${index}.vendido`,{
                                                            onChange: () => calcImporte(index)
                                                        })}  readOnly={isReadOnlyInputs.isReadOnlyVendido}/>
                                                    </td> 
                                                    <td>                                                        
                                                        <input type="hidden" className='form-control'  {...register(`productos.${index}.precio_operacion`)}/>
                                                        <input type="text" className='form-control'  {...register(`productos.${index}.importe`)} readOnly={isReadOnlyInputs.isReadOnlyImporte}/>
                                                    </td> 

                                                </tr>
                                                )
                                            })

                                        }
                                        {
                                            state == 1 &&
                                            (
                                                <>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Monto (subtotal)</td>
                                                        <td><input type="text" {...register('monto')} className='form-control' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Pago</td>
                                                        <td><input type="text" {...register('pago', {
                                                            onChange: (e) =>{
                                                                const monto = parseFloat(getValues('monto') ?? 0);
                                                                const ahorro = parseFloat(getValues('ahorro') ?? 0);
                                                                const pago = parseFloat(e.target.value ?? 0);

                                                                const debe = (monto-(pago+ahorro)).toFixed(2);
                                                                setValue('debe', debe.toString());
                                                                
                                                            }
                                                        })} className='form-control' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Ahorro</td>
                                                        <td><input type="text" {...register('ahorro', {
                                                            onChange: (e) =>{
                                                                const monto = parseFloat(getValues('monto') ?? 0);
                                                                const ahorro = parseFloat(e.target.value ?? 0);
                                                                const pago = parseFloat(getValues('pago') ?? 0);

                                                                const debe = (monto-(pago+ahorro)).toFixed(2);
                                                                setValue('debe', debe.toString());
                                                            }
                                                        })} className='form-control' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Debe</td>
                                                        <td><input type="text" {...register('debe')} className='form-control' readOnly={true} /></td>
                                                    </tr>
                                                </>
                                            )
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

                <ModalNotaHeladeroRegister
                        openModal={openModal}
                        handlerOpenModal={setOpenModal}
                        setValueOrigin={setValue}
                    />
            </>
        </ContainerInner>
    )
}
