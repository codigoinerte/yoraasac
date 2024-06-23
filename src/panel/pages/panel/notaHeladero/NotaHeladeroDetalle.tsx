import { useEffect, useRef, useState } from 'react'
import { ContainerInner, FormControls, ModalNotaHeladeroRegister, SearchUser } from '../../../components'
import { FormNotaHeladeroValues, ProductosPublicados, breadcrumb as bread } from '../../../interfaces';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux';
import {  onSetNotaHeladeroActive, onStatus } from '../../../../store';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import NotasComponent from '../../../../prints/Notas';
import toast, { Toaster } from 'react-hot-toast';

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

    const [estadoTitulo, setEstadoTitulo] = useState('Apertura de cuenta nueva');

    const [isNewRegister, setisNewRegister] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [state, setState] = useState<number|null>(null);

    const [isReadOnlyInputs, setisReadOnlyInputs] = useState({
        isReadOnlyDevolucion : false,
        isReadOnlyPedido : false,
        isReadOnlyVendido : false,
        isReadOnlyImporte : false,
    })

    const {  status, saveNotaHeladero, updateNotaHeladero, getNotaHeladero, setNullNotaHeladero, active  } = useNotaHeladeroStore();

    const { listEstadoHeladero, listUsuario, listNotaHeladeroEstado, loadProductosDisponibles, loadBuscarUsuario, loadBuscarNotaHeladeroGuardada} = useHelpers();

    const { register, handleSubmit, formState, setValue, getValues, control, reset } = useForm<FormNotaHeladeroValues>({
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
        setValue(`productos.${index}.importe`, precio_final);
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
            setisNewRegister(false);
            refId.current = active?.id;
        }else{            
            updateNotaHeladero({...data});
        }
        console.log(status);
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

                if(heladero.estado == 2){ // si el estado es de apertura (paso 2)
                    setValue('estado', 2); //el estado pasa a cierre (se busca primero cerrar la cuenta del heladero)
                    setEstadoTitulo('Reapertura');
                }                             
               
                if(heladero.estado == 1){
                    setEstadoTitulo('Apertura de cuenta nueva');
                }

                if(heladero.estado == 3){
                    setEstadoTitulo('Cuenta guardada');
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

            toast.success('Se importo la nota guardada del heladero correctamente');
        }else{
            /* si heladero(toda la info de la nota del headero) no existe previamente se define estado en reapertura, el cual funciona como un nuevo dia */
            refId.current = 0;
            
            setState(2);
            setValue('estado', 2);
            setisNewRegister(true);

            let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                
            setValue('fecha_operacion', dateNow.replace(" ","T"));            
            setEstadoTitulo('Apertura de cuenta nueva');

            fields.map((_, index) => {
                setValue(`productos.${index}.pedido`, 0);
                setValue(`productos.${index}.devolucion`, 0);
                setValue(`productos.${index}.vendido`, 0);
                setValue(`productos.${index}.importe`, 0);
            });
        }

    }

    const redirectToFactura = () => navigate(`/facturacion/new?gf=nota&id=${refId.current}`); 

    const getDisableDate = (id:number) => {
        if(
            (id == 1 && active?.fecha_cierre) || 
            (id == 2 && active?.fecha_apertura) || 
            (id == 3 && (active?.fecha_guardado || active?.estado == 3 || (!active?.fecha_apertura && active?.estado == 2))) || 
            (id == 1 && active?.estado == 2 && active.fecha_cierre == null) ||
            ((id == 1 || id == 3) && !active)
        ) return true;
        
        return false;
    }

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
                    importe : 0,
                    nota_heladeros_id : 0,
                    created_at : item.created_at,
                    updated_at : item.updated_at,
                    is_litro: item.is_litro,
                    
                    }))
            ]);            
                        
            setValue('estado', 2);
            setValue('user_id', 0);
            setisNewRegister(true);
    
            let dateNow = moment(new Date()).format("yyyy-MM-DD hh:mm").toString();
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
                
                await loadBuscarUsuario(heladero_id, "codigo");
                setValue('user_id', heladero_id);
            }

            setValue(`monto`, (heladero.monto??0));
            setValue(`pago`, (heladero.pago??0));
            setValue(`ahorro`, (heladero.ahorro??0));
            setValue(`debe`, (heladero.debe??0));
        }
    }
        
    useEffect(() => {
        
        onLoadNotaHeladero();
      
    }, []);


    useEffect(() => {
        let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                
            setValue('fecha_operacion', dateNow.replace(" ","T"));       
        
        if(active?.fecha_apertura && (state == 2)){
            setisReadOnlyInputs((s) => ({
                ...s,
                isReadOnlyDevolucion : true,
                isReadOnlyPedido : true,
                isReadOnlyVendido : true,
                isReadOnlyImporte : true,
            }));
            return;
        }
        if(active?.fecha_apertura && active?.fecha_guardado && (state == null || state == 3)){
            setisReadOnlyInputs((s) => ({
                ...s,
                isReadOnlyDevolucion : true,
                isReadOnlyPedido : true,
                isReadOnlyVendido : true,
                isReadOnlyImporte : true,
            }));
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
       
        if(state == 3 && !active?.fecha_guardado){ // activar guardado
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

                const devolucion_today_saved = (active) ? ( active.detalle.find((item) => item.codigo == getValues(`productos.${index}.codigo`))!.devolucion_today ?? 0) : 0;
                
                setValue(`productos.${index}.devolucion_today`, devolucion_today_saved);
                
                const pedido = parseInt((getValues(`productos.${index}.pedido`)??0).toString());
                               
                const precio_operacion = getValues(`productos.${index}.precio_operacion`)??0;

                let vendido = 0;
                let importe = 0;

                if(item.is_litro){
                    
                    const devolucion = parseFloat((getValues(`productos.${index}.devolucion`)??0).toString()); 
                    const devolucion_today = parseFloat((getValues(`productos.${index}.devolucion_today`) ?? devolucion_today_saved).toString());
                    
                    
                    let pedidoOperacion = pedido*precio_operacion;
                    let llevado =devolucion+pedidoOperacion;
                    vendido = importe = parseFloat((llevado-devolucion_today).toFixed(2));
                }else{
                    const devolucion = parseInt((getValues(`productos.${index}.devolucion`)??0).toString()); 
                    const devolucion_today = parseInt((getValues(`productos.${index}.devolucion_today`) ?? devolucion_today_saved).toString());
                    vendido = ((devolucion+pedido)-devolucion_today);
                    importe = parseFloat((vendido * precio_operacion).toFixed(2));
                }

                setValue(`productos.${index}.vendido`, vendido);
                setValue(`productos.${index}.importe`, importe);
                subtotal+=parseFloat(importe.toString());
            })

            if(subtotal < 0) {
                setValue(`monto`, 0);
                setValue(`pago`, 0);
                setValue(`ahorro`, 0);
                setValue(`debe`, 0);
            }
            
            setValue(`monto`, parseFloat(subtotal.toFixed(2)));
            setValue(`pago`, 0);
            setValue(`ahorro`, 0);
            setValue(`debe`, parseFloat(subtotal.toFixed(2)));
            return;
        }

        if(state == null){
            //*abriendo  el detalle de un estado
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

    },[isNewRegister, state, active?.id])

    useEffect(() => {

        if(active?.detalle)
            setValue('productos', active.detalle);
      
    }, [active?.detalle])
    
    
    const isPrint = (): boolean => active?.fecha_cierre ? true : false;

    const funcNew = async () => {
        reset();
        
        setNullNotaHeladero();

        const listProductosPublicados = await loadProductosDisponibles();
              
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
                importe : 0,
                nota_heladeros_id : 0,
                created_at : item.created_at,
                updated_at : item.updated_at,
                
                }))
        ]);            
                    
        setValue('estado', 2);
        setValue('user_id', 0);
        setisNewRegister(true);

        let dateNow = moment(new Date()).format("yyyy-MM-DD hh:mm").toString();
        setValue('fecha_operacion', dateNow.replace(" ", "T"));
        refId.current = 0;

        navigate("/nota-heladero/edit/new");
    }

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo={`Nota heladero - ${estadoTitulo}`} classContainer='nota-heladero'>
            <>     
                {
                    state == 1 &&
                    <NotasComponent ref={componentRef} />
                }
                     
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <FormControls save={redirectToFactura} page="nota-heladero" imprimir={imprimir} isPrint={isPrint()} isNew={true} funcNew={funcNew}/>

                    <hr className='border border-1 opacity-50'/>

                    <h4>Informaci&oacute;n</h4>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                            <div className="mb-3">
                                <label htmlFor="tipo_movimiento" className="form-label">Heladero</label>
                                
                                 
                                    <div className="d-block">
                                    
                                        <SearchUser 
                                            control={control}
                                            onChange={buscarUsuarioReserva}
                                            className={errors.user_id ? "form-control is-invalid p-0" : "form-control p-0"}
                                            required={true}
                                            listUsuario = {listUsuario}
                                            loadBuscarUsuario = {loadBuscarUsuario}
                                        />

                                    </div>                                

                            </div>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            
                            <div className="mb-3">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <div className="btn-group d-block" role="group">
                                    {
                                        listEstadoHeladero.map(({ id, nombre })=>(
                                            <button className="btn btn-primary"
                                                    type="button"
                                                    key={id} 
                                                    value={id} 
                                                    disabled={getDisableDate(id)}
                                                    onClick={(e)=>{
                                                        setState(parseInt(e.currentTarget.value));
                                                        setValue("estado", parseInt(e.currentTarget.value));
                                                    }}
                                                    >
                                                        {
                                                            parseInt((getValues('estado')??0).toString()) == id &&
                                                            <i className="bi bi-check"></i>
                                                        }
                                                        {nombre}
                                                    </button>
                                        ))
                                    }
                                </div>
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
                                                    <td className={item.is_litro ? 'bg-info': ''}>
                                                        {
                                                            item.is_litro ?
                                                            (
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text" id="basic-addon1">S/</span>
                                                                    <input type="text" 
                                                                            className='form-control' 
                                                                            readOnly={isReadOnlyInputs.isReadOnlyDevolucion}
                                                                            {...register(`productos.${index}.devolucion`)} 
                                                                            tabIndex={isReadOnlyInputs.isReadOnlyDevolucion ? 0 : 1}
                                                                        />
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <input type="text" 
                                                                        className='form-control' 
                                                                        readOnly={isReadOnlyInputs.isReadOnlyDevolucion}
                                                                        {...register(`productos.${index}.devolucion`)} 
                                                                        tabIndex={isReadOnlyInputs.isReadOnlyDevolucion ? 0 : 1}
                                                                    />
                                                            )
                                                        }
                                                        
                                                    </td>                                                     
                                                    <td className={item.is_litro ? 'bg-info': ''}>
                                                        <input type="number" 
                                                                className='form-control' 
                                                                readOnly={isReadOnlyInputs.isReadOnlyPedido}
                                                                {...register(`productos.${index}.pedido`,{
                                                                    pattern: /^\d+$/i,
                                                                    onChange: (e) => {
                                                                        e.target.value = parseInt((e.target.value).toString());
                                                                    }
                                                                })}
                                                                tabIndex={isReadOnlyInputs.isReadOnlyPedido ? 0 : 1}
                                                                />
                                                    </td>                                                     
                                                    <td data-tooltip-id={`tooltip-html-${index}`}
                                                        data-tooltip-html={`
                                                        <div style="text-align:left">
                                                            <b>Codigo</b>:${getValues(`productos.${index}.codigo`)??0}<br/>
                                                            <b>Precio</b>: S/ ${getValues(`productos.${index}.precio_operacion`)??0}
                                                        </div>
                                                        `}
                                                        className={item.is_litro ? 'bg-info': ''}
                                                       >
                                                        <Tooltip id={`tooltip-html-${index}`} />
                                                        { item.producto }
                                                        {
                                                            item.is_litro ? (<>
                                                                <br/>
                                                                <span className="badge bg-dark d-inline-block">Helado de Litro</span>
                                                            </>) : ''
                                                        }
                                                        <input type="hidden" 
                                                                className='form-control' 
                                                                {...register(`productos.${index}.codigo`)} 
                                                                />
                                                    </td>
                                                    <td  className={item.is_litro ? 'bg-info': ''}>
                                                        <input type="text" className='form-control' 
                                                                {...register(`productos.${index}.vendido`,{
                                                                    onChange: () => calcImporte(index)
                                                                })}  
                                                                readOnly={isReadOnlyInputs.isReadOnlyVendido}
                                                                />
                                                    </td> 
                                                    <td  className={item.is_litro ? 'bg-info': ''}>                                                        
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
                                                        <td><input type="text" {...register('monto')} className='form-control' readOnly /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Pago</td>
                                                        <td><input type="number" {...register('pago')} 
                                                            className='form-control'
                                                            onKeyUp={(e) => {
                                                                const monto = parseFloat((getValues('monto') ?? 0).toString());
                                                                const ahorro = 0;
                                                                let pago:any = e.currentTarget.value??0;
                                                                    
                                                                pago = pago == '' ? 0 : pago;
                                                                pago = parseFloat(pago.toString());
                                                                if(pago < 0){
                                                                    pago = 0;
                                                                    setValue('pago', 0);
                                                                }
                                                                if(pago > monto){
                                                                    pago = monto;
                                                                    setValue('pago', monto);
                                                                }
                                                                
                                                                const debe = (monto-(pago+ahorro)).toFixed(2);
                                                                setValue('debe', parseFloat(debe));
                                                                
                                                        }}
                                                        step={0.01}
                                                        readOnly={active?.fecha_cierre ? true : false} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Ahorro</td>
                                                        <td><input type="number" {...register('ahorro')} 
                                                        className='form-control'
                                                        onKeyUp={(e) => {
                                                            let ahorro:any = e.currentTarget.value ?? 0;
                                                                    ahorro = ahorro == '' ? 0 : ahorro;
                                                                    ahorro = parseFloat(ahorro);
                                                                    ahorro = ahorro < 0 ? 0 : ahorro;

                                                                    setValue('ahorro', ahorro);

                                                                //const monto = parseFloat((getValues('monto') ?? 0).toString());
                                                                //const pago = parseFloat((getValues('pago') ?? 0).toString());

                                                                //const debe = (monto-(pago+ahorro)).toFixed(2);
                                                                //setValue('debe', parseFloat(debe));
                                                        }} 
                                                        readOnly={active?.fecha_cierre ? true : false}/></td>
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

                {

                    (active?.estado!=3) &&
                    (<ModalNotaHeladeroRegister
                            openModal={openModal}
                            handlerOpenModal={setOpenModal}
                            setValueOrigin={setValue}
                            getValuesOrigin={getValues}
                            updateStateHeladero={setState}
                        />)
                }
                <Toaster position="top-center" reverseOrder={true} />
            </>
        </ContainerInner>
    )
}
