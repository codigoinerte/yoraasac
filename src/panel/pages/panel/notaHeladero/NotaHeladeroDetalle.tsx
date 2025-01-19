import { useEffect, useRef, useState } from 'react'
import { ContainerInner, FormControls, ModalNotaHeladeroRegister, SearchUser } from '../../../components'
import { FormNotaHeladeroValues, ProductosPublicados, breadcrumb as bread } from '../../../interfaces';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useConfiguration, useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux';
import {  onSetNotaHeladeroActive, onStatus } from '../../../../store';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import NotasComponent from '../../../../prints/Notas';
import toast, { Toaster } from 'react-hot-toast';
import { formatDateForInput } from '../../../../helpers';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Historial de notas', enlace: '/nota-heladero' },
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

    const textUnid = "Unid.";

    const componentRef = useRef(null);

    let navigate = useNavigate();

    const refId = useRef<any>('0');

    const { search } = useLocation();

    const [openModalGuardado, setOpenModalGuardado] = useState<boolean>(false);

    const [orderDirection, setOrderDirection] = useState<order>("asc");

    const [estadoTitulo, setEstadoTitulo] = useState('apertura de cuenta nueva');

    const [codigoTitulo, setCodigoTitulo] = useState('');

    const [isNewRegister, setisNewRegister] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [firstMessage, setfirstMessage] = useState(true);

    const [state, setState] = useState<number|null>(null);

    const [isReadOnlyInputs, setisReadOnlyInputs] = useState({
        isReadOnlyDevolucion : false,
        isReadOnlyPedido : false,
        isReadOnlyVendido : false,
        isReadOnlyImporte : false,
    })

    const { configuration, loadConfiguration } = useConfiguration();

    const { saveNotaHeladero, updateNotaHeladero, getNotaHeladero, setNullNotaHeladero, resetStateNota, active  } = useNotaHeladeroStore();

    const { listEstadoHeladero, listUsuario, listNotaHeladeroEstado, loadProductosDisponibles, loadBuscarUsuario, loadBuscarNotaHeladeroGuardada} = useHelpers();

    const { register, handleSubmit, formState, setValue, getValues, control, reset, setFocus } = useForm<FormNotaHeladeroValues>({
        defaultValues:{

            monto:0,
            pago:0,
            debe:0,
            subtotal: 0,
            deuda_anterior: 0,
            ahorro: 0,
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

    const redirectToFactura = () => navigate(`/facturacion/new?gf=nota&id=${refId.current}`); 

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

    const onSubmit: SubmitHandler<FormNotaHeladeroValues> = async (data) => {
        if(refId.current == 0){
            const response = await saveNotaHeladero({...data});            
            setisNewRegister(false);
            if(response?.id){
                refId.current = response?.id;               
                window.history.pushState(null, '', `/nota-heladero/edit/${response?.id}`);
            }
        }else{
            const response = await updateNotaHeladero({...data, productos: data.productos.map((item) => ({
                ...item,
                vendido : item.vendido && isNaN(parseFloat((item.vendido??'0').toString())) ? 0 : item.vendido
            }))});
            setState(response?.estado);            
            if(response?.id_children)
                setValue("id_children", response.id_children);
        }
    }

    const setCargoBaterias = async () => {
        let cargo_baterias:any = configuration?.cargo_baterias ?? '0.00';
        if(!configuration){
            const data = await loadConfiguration();           
            cargo_baterias = data.cargo_baterias;
        }
        setValue('cargo_baterias', cargo_baterias.toFixed(2))
    }

    // region Buscar Nota por Heladero
    const buscarUsuarioReserva = async (user:any)=> {

        if(user == undefined) return false;
        
        setValue('user_id', user);

        const heladero = await loadBuscarNotaHeladeroGuardada(parseInt(user.toString()));
        
        /* si heladero(toda la info de la nota del headero) existe previamente se completa la data*/
        if(heladero && heladero.hasOwnProperty("id") && heladero.id){
            setisNewRegister(false);
            //setPrincipalId(heladero.id);
            refId.current = heladero.id;

            let detalle = heladero.detalle??[];

            dispatch(onSetNotaHeladeroActive(heladero));

            if(heladero?.estado != undefined) {

                if(heladero.estado == 2){ // si el estado es de apertura (paso 2)
                    setValue('estado', 2); //el estado pasa a cierre (se busca primero cerrar la cuenta del heladero)
                    setEstadoTitulo('reapertura');
                }                             
               
                if(heladero.estado == 1){
                    setEstadoTitulo('apertura de cuenta nueva');
                }

                if(heladero.estado == 3){
                    setEstadoTitulo('cuenta guardada');
                }

               setState(heladero.estado);
            }

            await setCargoBaterias();

            setValue("subtotal", 0);
            setValue("deuda_anterior", heladero.deuda_anterior ?? 0);
            setValue("ahorro", heladero.ahorro);
            setValue("pago", heladero.pago);
            setValue("debe", parseFloat((heladero.debe).toString()).toFixed(2));

            setValue("codigo", heladero.codigo);
            setValue("heladero_nombre", heladero.heladero_nombre);
            setValue("estado_nombre", heladero.estado_nombre);
            setValue("moneda", heladero.moneda);
            setValue("id_children", heladero.id_children);
            setValue("observaciones", heladero.observaciones);
            setValue("yape", heladero.yape);
            setValue("efectivo", heladero.efectivo);
            
            let fecha_operacion:any = null;
            if(heladero.estado == 1 && heladero.fecha_cierre) fecha_operacion = heladero.fecha_cierre
            else if(heladero.estado == 2 && heladero.fecha_apertura) fecha_operacion = heladero.fecha_apertura
            else if(heladero.estado == 3 && heladero.fecha_guardado) fecha_operacion = heladero.fecha_guardado
            else if(heladero.estado == 2 && !heladero.fecha_apertura && heladero.created_at) fecha_operacion = formatDateForInput(heladero.created_at)
            else fecha_operacion = new Date();
            
            setValue('fecha_operacion', fecha_operacion);

            if(detalle.length > 0){
                setValue('productos', heladero.detalle.map((item) => ({
                    ...item,
                    vendido : item.is_litro ? parseInt((item.vendido??'').toString()).toFixed(2) : parseInt((item.vendido??'0').toString()).toFixed(0)
                })));
            }
    
            dispatch(onStatus(false));

            window.history.pushState(null, '', `/nota-heladero/edit/${heladero.id}`);

            toast.success('Se importo la nota guardada del heladero correctamente');
        }else{
            /* si heladero(toda la info de la nota del headero) no existe previamente se define estado en reapertura, el cual funciona como un nuevo dia */
            await resetNotaHeladero(getValues("user_id"));
        }

    }

    

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

    const imprimir =  useReactToPrint({
        content: () => componentRef.current,
    });

    const onSortProducts = () => {
        const productos = getValues("productos");
        setValue("productos", (orderDirection == "asc") ? productos.sort((a, b) => b.producto!.localeCompare(a.producto??'')) :  productos.sort((a, b) => a.producto!.localeCompare(b.producto??'')) );
        setOrderDirection(orderDirection == "asc" ? "desc" : "asc");
    }

    const resetNotaHeladero = async (userId = 0) => {
        
        reset();

        setNullNotaHeladero();

        setValue("codigo", undefined);
        setValue("heladero_nombre", undefined);
        setValue("estado_nombre", undefined);
        setValue("moneda", undefined);
        setValue("id_children", 0);
        setValue("fecha_guardado", undefined);
        setValue("observaciones", '');

        setValue("deuda_anterior", "0.00");
        setValue("pago", "0.00");
        setValue("yape", "0.00");
        setValue("efectivo", "0.00");

        const productos = await loadProductosDisponibles();

        if(productos)
        setValue("productos", [
            ...productos.map((item:ProductosPublicados)=>({
                producto: item.nombre,
                precio_operacion: calculo_precio_final(item.heladero_precio_venta, item.heladero_descuento),
                codigo: item.codigo,

                id : item.id,
                devolucion : item.devolucion,
                pedido : 0,
                vendido : item.vendido,
                importe : item.importe,
                nota_heladeros_id : 0,
                created_at : item.created_at,
                updated_at : item.updated_at,
                is_litro: item.is_litro,
                stock_alert_input: item.stock_alert_input
                }))
        ]);            
          

        await setCargoBaterias();
        setValue('estado', 2);
        setValue('user_id', userId);
        setisNewRegister(true);

        let dateNow = moment(new Date()).format("yyyy-MM-DD hh:mm").toString();
        setValue('fecha_operacion', dateNow.replace(" ", "T"));
        setValue(`observaciones`, '');
        setCodigoTitulo('');

        refId.current = 0;

        navigate("/nota-heladero/new");
    }
    /* funcion inicial de carga de nota */
    const onLoadNotaHeladero = async () => {

        refId.current = id;

        await loadConfiguration();

        await listNotaHeladeroEstado();
            
        //si no hay id principal
        if(refId.current == 0)
        {
            await resetNotaHeladero();
        }
        else
        {            
            const heladero = await getNotaHeladero(refId.current);
            
            if(!heladero) return;

            setValue("codigo", heladero.codigo);
            setValue("heladero_nombre", heladero.heladero_nombre);
            setValue("estado_nombre", heladero.estado_nombre);
            setValue("moneda", heladero.moneda);
            setValue("id_children", heladero.id_children);
            setValue("fecha_guardado", heladero.fecha_guardado);
            dispatch(onSetNotaHeladeroActive(heladero));

            let detalle = heladero.detalle??[];
            
            if(heladero?.estado != undefined) {

                let estado = (heladero.estado == 3) ? 2 : heladero.estado;
                
                if(estado == 3){
                    setEstadoTitulo('guardado');
                }else if(estado == 2){
                    setEstadoTitulo('reapertura');
                }else if(estado == 1){
                    setEstadoTitulo('cierre');
                }
                else{
                    setEstadoTitulo('apertura');
                }

                setValue('estado', estado);
            }
            
            setCodigoTitulo(` - codigo: ${heladero.codigo}`);

            setState(heladero.estado);
            
            let fecha_operacion = new Date();
            if(heladero.estado == 1 && heladero.fecha_cierre) fecha_operacion = heladero.fecha_cierre
            else if(heladero.estado == 2 && heladero.fecha_apertura) fecha_operacion = heladero.fecha_apertura
            else if(heladero.estado == 3 && heladero.fecha_guardado) fecha_operacion = heladero.fecha_guardado
            
            let dateNow = moment(fecha_operacion).format("YYYY-MM-DD HH:mm").toString();                        
            setValue('fecha_operacion', dateNow);

            if(detalle.length > 0)
            setValue('productos', heladero.detalle.map((item) => ({
                ...item,
                vendido : item.is_litro ? parseInt((item.vendido??'').toString()).toFixed(2) : parseInt((item.vendido??'0').toString()).toFixed(0)
            })));

            //cargar lista de heladeros

            let heladero_id = heladero.user_id??0;

            if(heladero_id != 0){
                
                await loadBuscarUsuario(heladero_id, "codigo");
                setValue('user_id', heladero_id);
            }

            let cargo_baterias = parseFloat(((heladero.cargo_baterias && heladero.cargo_baterias!=0) ? heladero.cargo_baterias : configuration!.cargo_baterias).toString());
            let monto = parseFloat(((heladero.monto??0)).toString());
            let deuda_anterior = parseFloat((heladero.deuda_anterior??0).toString());
            let subtotal = monto+cargo_baterias;
            let suma = subtotal+deuda_anterior;
            let debe = parseFloat((heladero.debe??"0.00").toString()).toFixed(2);

            setValue('cargo_baterias', parseFloat(`${cargo_baterias}`).toFixed(2));
            setValue(`monto`, monto.toFixed(2));
            setValue(`deuda_anterior`, parseFloat(`${deuda_anterior}`).toFixed(2));
            setValue(`subtotal`, subtotal.toFixed(2));
            setValue(`pago`, (heladero.pago??0));
            setValue(`ahorro`, (heladero.ahorro??0));
            setValue(`yape`, parseFloat((heladero.yape??"0.00").toString()).toFixed(2));
            setValue(`efectivo`, parseFloat((heladero.efectivo??"0.00").toString()).toFixed(2));
            setValue(`debe`, debe);
            setValue(`suma`, suma.toFixed(2));
            setValue(`observaciones`, (heladero.observaciones??''));

        }

         
        // const message = params.get("message") ?? '';
        // const type = params.get("type") ?? 'success';

        const { message, type } = JSON.parse(localStorage.getItem("notification") ?? '{}');
        
        if(message && firstMessage){
            if(type == "success"){
                Swal.fire("Exito!", message, "success");
            }
            localStorage.removeItem("notification");
        }

        setfirstMessage(false);
    }
        
    useEffect(() => {
        onLoadNotaHeladero()      
    }, []);

    useEffect(() => {        
        if(active?.estado)
        {
            setState(active.estado);

            if(active.estado == 3){
                setEstadoTitulo('guardado');
            }else if(active.estado == 2){
                setEstadoTitulo('reapertura');
            }else if(active.estado == 1){
                setEstadoTitulo('cierre');
            }
            else{
                setEstadoTitulo('apertura');
            }

            setCodigoTitulo(` - codigo: ${active.codigo}`);
        }
        
    }, [active?.id, active])
    

    useEffect(() => {
        
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

            const yape = parseFloat((getValues('yape') && !isNaN(parseFloat((getValues('yape')??'0').toString()))?getValues('yape'):0).toString());
            const efectivo = parseFloat((getValues('efectivo') && !isNaN(parseFloat((getValues('efectivo')??'0').toString()))?getValues('efectivo'):0).toString());

            const pago = parseFloat((getValues('pago') && !isNaN(parseFloat((getValues('pago')??'0').toString()))?getValues('pago'):0).toString());
            const deuda_anterior = parseFloat((getValues('deuda_anterior') && !isNaN(parseFloat((getValues('deuda_anterior')??'0').toString()))? parseFloat(getValues('deuda_anterior').toString()) : 0).toString());
            const ahorro = parseFloat((getValues('ahorro')??0).toString());
            const cargo_baterias = configuration!.cargo_baterias ?? 0;
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
                if(item.is_litro){
                    let vendidoFixed = parseFloat(vendido.toString()).toFixed(2);                    
                    setValue(`productos.${index}.vendido`,  `${vendidoFixed}`);
                }else{
                    setValue(`productos.${index}.vendido`, vendido);
                }
                setValue(`productos.${index}.importe`, importe.toFixed(2));
                subtotal+=parseFloat(importe.toString());
            })

            if(subtotal < 0) {
                setValue(`monto`, 0);
                setValue(`deuda_anterior`, 0);
                setValue(`subtotal`, 0);
                setValue(`pago`, 0);
                setValue(`ahorro`, 0);
                setValue(`debe`, 0);
                setValue(`yape`, 0);
                setValue(`efectivo`, 0);
            }
            const subtotal_sumas = parseFloat((subtotal+cargo_baterias).toFixed(2));
            let suma = subtotal_sumas+deuda_anterior;
            let debe = ((subtotal+deuda_anterior+cargo_baterias)-pago).toFixed(2);

            setValue(`monto`, subtotal.toFixed(2));
            setValue(`deuda_anterior`, deuda_anterior.toFixed(2));
            setValue(`subtotal`, subtotal_sumas.toFixed(2));
            setValue(`pago`, pago.toFixed(2));
            setValue(`ahorro`, ahorro.toFixed(2));
            setValue(`yape`, yape.toFixed(2));
            setValue(`efectivo`, efectivo.toFixed(2));
            setValue(`suma`, suma.toFixed(2));
            setValue(`debe`, debe);
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

    },[isNewRegister, state, active?.id, active])

    useEffect(() => {

        if(active?.detalle)
            setValue('productos', active.detalle);
      
    }, [active?.detalle])
    
    
    const isPrint = (): boolean => active?.fecha_cierre || getValues("estado") == 1 ? true : false;
    const isFactura = (): boolean => active?.fecha_cierre ? true : false;
    // region acciones

    const onChangePago = () => {
        const cargo_baterias =getValues("cargo_baterias");
        const monto = parseFloat((getValues('monto') ?? 0).toString());
        const deuda_anterior = parseFloat((getValues('deuda_anterior') ?? 0).toString());
        const subtotal = parseFloat(monto.toString())+parseFloat(deuda_anterior.toString())+parseFloat(cargo_baterias.toString());

        const ahorro = 0;
        let pago:any = getValues('pago')??0;
            
        pago = pago == '' ? 0 : pago;
        pago = parseFloat(pago.toString());
        if(pago < 0){
            pago = 0;
            setValue('pago', "0.00");
        }
        if(pago > subtotal){
            pago = subtotal;
            setValue('pago', subtotal.toFixed(2));
        }
        const debe = (subtotal-(pago+ahorro)).toFixed(2);
        setValue('debe', debe);
    }

    const editApertura = () => {
        setisReadOnlyInputs((s) => ({
            ...s,
            isReadOnlyDevolucion : true,
            isReadOnlyPedido : !s.isReadOnlyPedido,
            isReadOnlyVendido : true,
            isReadOnlyImporte : true,
        }));
    }

    const showAlertBack = (state_destino:number) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success ms-2",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });

          swalWithBootstrapButtons.fire({
            title: "Usted esta seguro?",
            text: "Si regresa a estado 'guardado', se eliminara todo el progreso guardado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, regresar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                //llamar al endpoint y recargar la pagina cuando resultado sea success
                try {
                    const response = await resetStateNota( refId.current, state_destino);
                    
                    if(response?.status == 200){
                        localStorage.setItem("notification", JSON.stringify({
                            message : response.data.message ?? '',
                            type : "success"
                        }));
                        location.replace(location.pathname);
                    }
                } catch (error:any) {
                    Swal.fire("Error!", error.response.data.message, "warning");
                }
            }
          });
    }

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo={`Nota heladero - ${estadoTitulo} ${codigoTitulo}`} classContainer='nota-heladero'>
            <>     
                {
                    state == 1 &&
                    <NotasComponent ref={componentRef} currentNota={ getValues() } getValues={getValues}/>
                }
                     
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <FormControls 
                        classContainer={`nota-grid-buttons-${getValues('estado')}`}
                        save={redirectToFactura} 
                        page="nota-heladero" 
                        imprimir={imprimir} 
                        isPrint={isPrint()} 
                        isFactura={isFactura()} 
                        isNew={true} 
                        onNavigateBack = {()=>{
                            window.location.href = '/nota-heladero/';
                        }}
                        funcNew={()=>{
                         window.location.href = '/nota-heladero/new';
                        }}
                        NewComponent={
                            <>
                                {
                                    getValues("estado") == 1 && active?.estado !=1 && 
                                    <button type="button" className="button-edit btn btn-warning flex-fill" onClick={()=>{
                                        setOpenModalGuardado(true);
                                        setOpenModal(true);
                                    }}>Editar guardado</button>
                                }
                                {
                                    getValues("estado") == 1 && active?.estado == 1 &&
                                    (
                                        <div className="dropdown flex-fill">
                                            <button className="btn btn-warning dropdown-toggle flex-fill w-100 h-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Resetear
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><button className="dropdown-item" type="button" onClick={()=> showAlertBack(2)}>resetear a apertura</button></li>
                                                <li><button className="dropdown-item" type="button" onClick={()=> showAlertBack(3)}>resetear a guardado</button></li>
                                            </ul>
                                        </div>
                                    )                                    
                                }
                            </>
                        } />
                    

                    <hr className='border border-1 opacity-50'/>

                    <h4>Informaci&oacute;n</h4>

                    <div className="row">
                        <div className={`col-xs-12 col-sm-12 ${(state == 2 && active?.fecha_apertura) ? 'col-md-9 col-lg-9' : 'col-md-12 col-lg-12'}`}>

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
                        {
                            (state == 2 && active?.fecha_apertura) ? (
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 d-flex align-items-center justify-content-center">
                                    <button type="button" className="btn btn-primary gap-2 d-flex " onClick={editApertura}> 
                                        <i className={`bi ${isReadOnlyInputs.isReadOnlyPedido ? 'bi-pencil-square' : 'bi-x-octagon-fill'}`}></i>
                                        { isReadOnlyInputs.isReadOnlyPedido ? 'Editar Apertura' : 'Cerrar edición'}                                
                                    </button>
                                </div>

                            ) : ''
                        }
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

                                                        let dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm").toString();                
                                                        setValue('fecha_operacion', dateNow.replace(" ","T"));                                                        
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
                                    <table className='table table-nota-heladero'>
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
                                                                <div className="input-group">
                                                                    <span className="input-group-text" id="basic-addon1">
                                                                        <small>S/</small>
                                                                    </span>
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
                                                                <div className="input-group">
                                                                    <span className="input-group-text" id="basic-addon1">
                                                                        <small>{textUnid}</small>
                                                                    </span>
                                                                    <input type="text" 
                                                                            className='form-control' 
                                                                            readOnly={isReadOnlyInputs.isReadOnlyDevolucion}
                                                                            {...register(`productos.${index}.devolucion`)} 
                                                                            tabIndex={isReadOnlyInputs.isReadOnlyDevolucion ? 0 : 1}
                                                                        />
                                                                </div>
                                                            )
                                                        }
                                                        
                                                    </td>                                                     
                                                    <td className={item.is_litro ? 'bg-info': ''}>
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <small>{textUnid}</small>
                                                            </span>
                                                            <input type="number"
                                                                    min={0}
                                                                    className={`form-control ${getValues(`productos.${index}.stock_alert_input`) == 2 ? 'bg-warning' : ''}`}
                                                                    readOnly={isReadOnlyInputs.isReadOnlyPedido || getValues(`productos.${index}.stock_alert_input`) == 1}
                                                                    {...register(`productos.${index}.pedido`,{
                                                                        pattern: /^\d+$/i,
                                                                        onChange: (e) => {
                                                                            const heladero = getValues("user_id") ?? null;
                                                                            if(!heladero){
                                                                                setValue(`productos.${index}.pedido`, 0);
                                                                                e.stopPropagation();
                                                                                e.preventDefault();
                                                                            }
                                                                            let quantity = e.target.value??'0';
                                                                                quantity = quantity == '' || quantity == null ? '0' : quantity;
                                                                                quantity = parseInt(quantity);
                                                                            if(quantity < 0) e.target.value = 0;
                                                                            setValue(`productos.${index}.pedido`, quantity);
                                                                        },
                                                                        min:0,
                                                                    })}

                                                                    tabIndex={isReadOnlyInputs.isReadOnlyPedido ? 0 : 1}
                                                                    onClick={async (e) => {
                                                                        const heladero = getValues("user_id") ?? null;
                                                                        if(!heladero){
                                                                           
                                                                            await Swal.fire(
                                                                                'Alerta!',
                                                                                'Debe completar primero el heladero.',
                                                                                'warning'
                                                                            );

                                                                            document.querySelector("body")?.focus();
                                                                            e.stopPropagation();
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onFocus={async (e)=> {
                                                                        // const heladero = getValues("user_id") ?? null;
                                                                        // if(!heladero){
                                                                           
                                                                        //     Swal.fire(
                                                                        //         'Alerta!',
                                                                        //         'Debe completar primero el heladero.',
                                                                        //         'warning'
                                                                        //     )
                                                                        //     .then(() => {
                                                                        //         setFocus('fecha_operacion');
                                                                        //     });

                                                                        //     e.stopPropagation();
                                                                        //     e.preventDefault();
                                                                        // }
                                                                    }}
                                                                    />
                                                        </div>
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
                                                                <span className="badge bg-dark d-inline-block">helado de 5 litros</span>
                                                            </>) : ''
                                                        }
                                                        <input type="hidden" 
                                                                className='form-control' 
                                                                {...register(`productos.${index}.codigo`)} 
                                                                />
                                                    </td>
                                                    <td  className={item.is_litro ? 'bg-info': ''}>
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <small>{item.is_litro ? 'S/': 'Unid'}</small>
                                                            </span>
                                                            <input type="number" 
                                                                    className='form-control' 
                                                                    {...register(`productos.${index}.vendido`,{
                                                                        onChange: () => calcImporte(index)
                                                                    })}  
                                                                    readOnly={isReadOnlyInputs.isReadOnlyVendido}
                                                                    min={0.00}
                                                                    step={0.01}
                                                                    />
                                                        </div>
                                                    </td> 
                                                    <td  className={item.is_litro ? 'bg-info': ''}> 
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <small>S/</small>
                                                            </span>
                                                            <input type="number" 
                                                                    className='form-control'  
                                                                    {...register(`productos.${index}.importe`,{
                                                                        min: 0.00,
                                                                        value: 0.00,

                                                                        pattern: /^\d+(\.\d{1,2})?$/
                                                                    })} 
                                                                    readOnly={isReadOnlyInputs.isReadOnlyImporte} 
                                                                    step={0.01} 
                                                                    min={0.00}/>
                                                            <input type="hidden" className='form-control'  {...register(`productos.${index}.precio_operacion`)}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                            })

                                        }
                                        {   
                                            (state == 1 && active?.fecha_apertura && active.fecha_guardado) &&
                                            (
                                                <>

                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Cargo por baterias</td>
                                                        <td><input type="number" {...register('cargo_baterias')} className='form-control' step={0.01} readOnly /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Vendido</td>
                                                        <td><input type="text" {...register('monto')} className='form-control' readOnly /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} style={{background: '#dedede'}}>&nbsp;</td>
                                                        <td align='center' style={{background: '#dedede'}}>Cuenta (hoy)</td>
                                                        <td style={{background: '#dedede'}}><input type="text" {...register('subtotal')} className='form-control' readOnly /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3}>&nbsp;</td>
                                                        <td align='center'>Deuda anterior</td>
                                                        <td><input type="number" {...register('deuda_anterior', {
                                                            min:0,
                                                            onChange: (e) => {  
                                                                let cargo_baterias = parseFloat((getValues("cargo_baterias") ?? 0).toString()); //getValues('cargo_baterias');
                                                                let deuda_anterior = parseFloat((getValues("deuda_anterior") ?? 0).toString());
                                                                let value = isNaN(deuda_anterior) ? 0 : deuda_anterior;
                                                                    //value = value == '' ? 0 : value;
                                                                    value = parseFloat((value).toString());              
                                                                    
                                                                const monto = parseFloat((getValues('monto') ?? 0).toString());
                                                                
                                                                const subtotal = monto+cargo_baterias;
                                                                
                                                                setValue("deuda_anterior", value);
                                                                setValue("subtotal", subtotal.toFixed(2));

                                                                onChangePago();

                                                                const suma = subtotal + value;
                                                                setValue("suma", suma.toFixed(2));
                                                            }
                                                        })} className='form-control' step={0.01} readOnly={active.estado == 1 ? true : false}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} style={{background: '#dedede'}}>&nbsp;</td>
                                                        <td align='center' style={{background: '#dedede'}}><b>Suma</b></td>
                                                        <td style={{background: '#dedede'}}><input type="text" {...register('suma')} className='form-control' readOnly /></td>
                                                    </tr>
                                                    {
                                                        active.estado == 1  ?
                                                        (
                                                            <>                                                            
                                                                <tr>
                                                                    <td colSpan={3}>&nbsp;</td>
                                                                    <td align='center'>Pago</td>
                                                                    <td><input type="number" {...register('pago')} 
                                                                        className='form-control'
                                                                        id='pago'
                                                                        onKeyUp={(e) => {
                                                                            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 110 || e.keyCode == 46 || (e.ctrlKey && e.key === 'v')) { 

                                                                                const yape = parseFloat((getValues("yape") ? getValues("yape") : '0.00').toString());
                                                                                const subtotal = parseFloat((getValues("subtotal") ? getValues("subtotal") : '0.00').toString());
                                                                                const storePago = parseFloat((getValues("pago") ? getValues("pago") : '0.00').toString());
                                                                                const pago:number = parseFloat(((e.target as HTMLInputElement).value ? (e.target as HTMLInputElement).value : "0.00").toString());
                                                                                
                                                                                // if(pago < yape || pago == 0){
                                                                                // }
                                                                                setValue('yape', "0.00");
                                                                                setValue('efectivo', "0.00");
                                                                                // if(yape > 0 && pago > 0){
                                                                                //     let efectivo = pago - yape;
                                                                                //         efectivo = efectivo < 0 ? 0 : efectivo;
                                                                                //     setValue('efectivo', efectivo.toFixed(2));
                                                                                // }

                                                                                onChangePago();
                                                                            }
                                                                        }}
                                                                    step={0.01} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={3}>&nbsp;</td>
                                                                    <td align='center'>Yape</td>
                                                                    <td><input type="number" {...register('yape',{
                                                                            onChange: (e: React.KeyboardEvent<HTMLInputElement>) => {
                                                                            
                                                                                let yape: string | number = (e.target as HTMLInputElement).value ?? "0";
                                                                                    yape = parseFloat(yape);
                                                                                    yape = isNaN(yape) ? 0 : yape;
                                                                                    
                                                                                const subtotal = parseFloat((getValues('subtotal') ? getValues('subtotal') : '0').toString());
                                                                                const pago = parseFloat((getValues('pago') ? getValues('pago'): '0').toString()) ;
    
                                                                                if(yape > 0 && pago == 0){
                                                                                    e.stopPropagation();
                                                                                    e.preventDefault();
                                                                                    setValue("pago", "0.00");
                                                                                    setValue("efectivo", "0.00");
                                                                                    setValue("yape", "0.00");
                                                                                    return;
                                                                                }
                                                                               
                                                                                if(pago == 0 && yape > 0){
                                                                                    setValue("pago", yape);
                                                                                    onChangePago();                                                                                    
                                                                                }else if(yape > 0 && yape < pago){
                                                                                    let efectivo = 0;
                                                                                    if(pago != yape){
                                                                                        efectivo = pago - yape;
                                                                                    }
                                                                                    setValue("efectivo", efectivo.toFixed(2));
                                                                                }else if(yape > subtotal || yape > pago){
                                                                                    setValue("yape", pago.toFixed(2));
                                                                                    setValue("efectivo", "0.00");
                                                                                    
                                                                                }else if(yape == 0 && subtotal > 0){
                                                                                    setValue("efectivo", pago.toFixed(2));
                                                                                    setValue("yape", "0.00");
                                                                                }else if(yape > 0 && yape == pago){
                                                                                    let efectivo = 0;
                                                                                    setValue("efectivo", efectivo.toFixed(2));
                                                                                }
                                                                            }
                                                                        })} 
                                                                        className='form-control'
                                                                        id='yape'
                                                                        step={0.01} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={3}>&nbsp;</td>
                                                                    <td align='center'>Efectivo</td>
                                                                    <td><input type="number" {...register('efectivo')} 
                                                                        className='form-control'
                                                                    step={0.01} readOnly={true} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={3}>&nbsp;</td>
                                                                    <td align='center'>Ahorro</td>
                                                                    <td><input type="number" {...register('ahorro', {
                                                                        required: false,
                                                                        min: 0,
                                                                        onChange(event) {
                                                                            const ahorro = parseFloat(event.currentTarget.value ?? 0);
                                                                            setValue("ahorro", ahorro);
                                                                        },                                                            
                                                                    })} 
                                                                    step={0.01}
                                                                    className='form-control'/></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={3}>&nbsp;</td>
                                                                    <td align='center'>Debe</td>
                                                                    <td><input type="text" {...register('debe')} className='form-control' readOnly={true} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={5}>
                                                                        <strong>Observaciones</strong>
                                                                        <textarea {...register('observaciones')} className='form-control'/>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ) : ''
                                                    }
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
                    ((state==3 && !getValues('fecha_guardado')) || openModalGuardado) &&
                    (<ModalNotaHeladeroRegister
                            openModal={openModal}
                            handlerOpenModal={setOpenModal}
                            setValueOrigin={setValue}
                            getValuesOrigin={getValues}
                            updateStateHeladero={setState}
                            setOpenModalGuardado={setOpenModalGuardado}
                            idChildren={getValues("id_children")??0}
                        />)
                }
                <Toaster position="top-center" reverseOrder={true} />
            </>
        </ContainerInner>
    )
}
