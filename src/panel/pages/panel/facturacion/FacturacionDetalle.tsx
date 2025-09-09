import { useEffect, useRef, useState } from 'react'
import { ContainerInner, FormControls } from '../../../components';
import { BuscarProducto, FormFacturacionValues, breadcrumb as bread } from '../../../interfaces';
import { useFacturastore, useHelpers, useNotaHeladeroStore } from '../../../../hooks';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SelectPicker } from 'rsuite';
import { Toaster, toast } from 'react-hot-toast';
import { DateNow, Round } from '../../../helpers';
import { NotaHeladero } from '../../../../interfaces';
import { toastMessage } from '../../../../helpers';
import { useReactToPrint } from 'react-to-print';
import FacturasComponent from '../../../../prints/Facturas';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Facturación', enlace: '/facturacion' },
    { id:2, titulo: 'Facturación detalle', enlace: '' },
];

interface productItem 
{
    label: string;
    value: number;
}
type productList = productItem[];

type strnum = string | number;

export const FacturacionDetalle = () => {

    const [disableFromImport, setdisableFromImport] = useState(false);

    const { id = 0 } = useParams(); 

    const [selectProducto, setSelectProducto] = useState<BuscarProducto>();

    const [typeOperation, setTypeOperation] = useState(1);

    const componentRef = useRef(null);

    const refId = useRef<any>('0');

    const [disablePriceType, setDisablePriceType] = useState(false);

    const [isPrint, setIsPrint] = useState(false);

    const {  saveFacturacion, updateFacturacion, getFacturacion, active  } = useFacturastore();

    const {  active:nota_heladero_info, getNotaHeladero  } = useNotaHeladeroStore();

    const { listEstadosFactura ,listBuscarProducto, listUsuario, loadBuscarUsuario, loadBuscarProducto, loadFacturaEstados, loadDocumentoSerie } = useHelpers();

    

    const { register, handleSubmit, formState, setValue, getValues, control, watch } = useForm<FormFacturacionValues>({
        defaultValues:{       
            productos: []
        }
    });

    const { fields, append, remove,} = useFieldArray({
        control,
        name: "productos"
    });

    const { errors } = formState;

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

    const loadDataSavedById = (ID: any) => {
        getFacturacion(ID)
        .then((factura)=>{
            setDisablePriceType(true);

            setValue('fecha_emision', factura?.fecha_emision ?? '');                    
            setValue('cargo_baterias', factura?.cargo_baterias ?? '');
            setValue('deuda_anterior', factura?.deuda_anterior ?? '');

            setValue('importado_tipo', factura?.importado_tipo ?? '');
            setValue('importado_codigo', factura?.importado_codigo ?? '');

            setValue('fecha_pago', factura?.fecha_pago ?? '');
            setValue('tipo', factura?.tipo ?? 1);
            setValue('serie', factura?.serie ?? '');
            setValue('correlativo', factura?.correlativo ?? 0);
            setValue('user_id', factura?.user_id ?? 0);
            setValue('tipo_transaccion', factura?.tipo_transaccion ?? 0);
            setValue('id_estado', factura?.id_estado ?? 0);
            setValue('estado', factura?.id_estado ?? 0);

            setValue('documento_tipo', factura?.documento_tipo??'');
            setValue('usuario_documento', factura?.usuario_documento??'');
            setValue('creador', factura?.creador??'');
            setValue('sucursal', factura?.sucursal??'');
            setValue('moneda', factura?.moneda??'');
            setValue('transaccion', factura?.transaccion??'');
            setValue('usuario_nombre', factura?.usuario_nombre??'');
            setValue('documento', factura?.documento??'');
            setValue('total_monto', factura?.total_monto??0);
            setValue('total_descuento', factura?.total_descuento??0);

            setValue('precio_tipo', factura?.precio_tipo??0);

            setValue('subtotal', factura?.subtotal??0);
            setValue('descuento', factura?.descuento??0);
            setValue('igv', factura?.igv??0);
            setValue('total', factura?.total??0);

            setTypeOperation(factura?.tipo ?? 1)
            
            let detalle = [];

            if(factura!.detalle != undefined)
            {
                detalle = factura!.detalle.map((item)=>({
                    ...item,
                    precio: parseFloat(((item.precio??0).toString())).toFixed(item.is_litro || item.is_barquillo ? 3 : 2),
                    total: parseFloat((  ((item.cantidad??1) * (item.precio??0) * ( 1 - ((item.descuento??0) / 100))).toFixed(2) ).toString())
                }))
            
                setValue('productos', detalle);
            }

            let usuario_id = factura?.user_id??0;

            if(usuario_id != 0){
                loadBuscarUsuario(usuario_id, "codigo", 4);
                setValue('user_id', factura!.user_id);
            }

        });
    }
    
    const loadData = (ID: any) => {
        
        if(from == '' && parseInt(from_id.toString()) == 0)
        {

            if(ID == 0)
            {
                const dateNow = DateNow();
                
                loadDocumento();
                setValue('fecha_emision', dateNow);
                setValue('fecha_pago', dateNow);
                setValue('id_estado', 1);
                setTypeOperation(1);
            }
            else
            {   
                loadDataSavedById(ID);
            }
        }
    }

    useEffect(() => {
        refId.current = (id != undefined && id != null && id != 0) ? id : 0;
        const idNum = parseInt(refId.current);
        if( idNum > 0){
            refId.current = idNum;
            setIsPrint(idNum ? true : false);
        }
        
        loadFacturaEstados();

        loadData(refId.current);
    }, []);

    useEffect(() => {
        
        
        if(from=='nota' && from_id!=0 && nota_heladero_info !=null){
            setdisableFromImport(true);
            //console.log(`cargando importado desde ${from} y id ${from_id}`);
            if(nota_heladero_info.id == parseInt(from_id.toString())){
                const from_codigo = nota_heladero_info.codigo ?? '';
                setValue('importado_codigo', from_codigo);
                printNotaHeladero(nota_heladero_info);
            }
            setValue('importado_tipo', from);
        }else if(from=='nota' && from_id!=0 && nota_heladero_info == null){
            setdisableFromImport(true);
            //console.log(`cargando importado desde ${from} y id ${from_id} y sin previa carga`);
            const current_id_nota = parseInt(from_id.toString());
            getNotaHeladero(current_id_nota)
            .then((nota_heladero_info)=>{
                const from_codigo = nota_heladero_info?.codigo ?? '';
                setValue('importado_codigo', from_codigo);
                printNotaHeladero(nota_heladero_info);

            });            
            setValue('importado_tipo', from);              
        }

    }, [from_id])

    useEffect(() => {
        onChangeTotal();
        const productos = getValues('productos');
        if(productos.length == 0){
            setValue('subtotal', 0);
            setValue('descuento', 0);
            setValue('igv', 0);
            setValue('total', 0);
            setDisablePriceType(false);
        }else{
            setDisablePriceType(true);
        }
    }, [getValues('productos')])
    

    const onSubmit: SubmitHandler<FormFacturacionValues> = (data) => {
        if(fields.length == 0){
            toastMessage({
                data:[],
                message: 'Porfavor ingrese almenos un producto',
                success: true,
                custom:{
                    title : 'Alerta!',
                    icon : '',
                    confirmButtonText: 'Ok',
                }
            });
            return false;
        }
        
        // console.log(data);
        // return;

        if(refId.current == 0){            
            saveFacturacion({
                ...data,
                'estado': data.id_estado,
                productos: data.productos.length > 0 ? data.productos : [],
            })
            .then((e)=>{                
                window.history.pushState(null, '', `/facturacion/edit/${e!.id}`);

                refId.current = e!.id;
                setIsPrint(true);
                
                let total_monto = e!.total_monto;
                let total_descuento = e!.total_descuento;
                let igv = e!.igv;
                let total = e!.total;

                let importado_tipo = e!.importado_tipo;
                let importado_codigo = e!.importado_codigo;

                
                setValue('importado_tipo', importado_tipo);
                setValue('importado_codigo', importado_codigo);

                setValue('total_monto', total_monto);
                setValue('total_descuento', total_descuento);
                setValue('igv', igv);
                setValue('total', total);

                loadDataSavedById(e!.id);

                
            });
            
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
        const type = getValues("precio_tipo") ?? 0;
        loadBuscarProducto(buscar, type);
    }

    const loadProducto = ()=>{
        
        let item = fields.filter((detail)=>detail.codigo == selectProducto?.codigo);

        if(item.length == 0 && !!selectProducto){
            
            let is_box = selectProducto.is_box??false;
            let original_precio_venta = parseFloat(selectProducto.precio_venta ?? 0);
            let original_descuento = parseFloat(selectProducto.descuento ?? 0);
            let original_precio_venta_mayor = parseFloat(selectProducto.precio_venta_cajas ?? 0);
            let original_descuento_mayor = parseFloat(selectProducto.descuento_cajas ?? 0);

            let total: strnum = is_box ? original_precio_venta_mayor : original_precio_venta;

            append({ 
                codigo: selectProducto!.codigo,
                producto: selectProducto!.nombre,
                precio: parseFloat(total.toFixed(3)),
                descuento: 0,
                cantidad: 1,
                total : total.toFixed(2),
                id: 0,
                original_precio_venta,
                original_descuento,
                original_precio_venta_mayor,
                original_descuento_mayor,
                is_box,
                is_barquillo: selectProducto.is_barquillo,
                is_litro: selectProducto.is_litro,
                is_unit: selectProducto.is_unit,
            });

            // Limpiar el valor seleccionado
            setSelectProducto(undefined);

        }else if(selectProducto == undefined){
            toast.error('Seleccione un producto');
        }else{            
            toast.error('El producto ya fue añadido');
        }
    }

    const onChangeSubTotal = (index:number)=>{

        const cantidad =  getValues(`productos.${index}.cantidad`)??1;
        const precio =  parseFloat((getValues(`productos.${index}.precio`)??0).toString());
        const descuento =  getValues(`productos.${index}.descuento`)??0;

        let subtotal = (cantidad * precio * ( 1 - (descuento / 100))).toFixed(2);
       
        setValue(`productos.${index}.total`, subtotal);
    }
    /*
    igv = parseFloat((subtotal * 0.18).toFixed(2));
    total = parseFloat((subtotal + igv).toFixed(2));
    idTipo : 1, 2
        1 : boleta
        2 : factura
    if idTipo == 1 igv discount subtotal, meanwhile if idTipo == 2 igv add more to subttoal
    */
    const onChangeTotal = () =>{
        
        let subtotal = 0;
        let descuento = 0;
        let igv = 0;
        let total = 0;
        let idTipo = getValues("tipo") ?? 1;
        
        let deuda_anterior = parseFloat((getValues('cargo_baterias')??'0').toString()) ?? 0;
        let cargo_baterias = parseFloat((getValues('deuda_anterior')??'0').toString()) ?? 0;

        const fields = getValues('productos');
        fields.forEach((item, index)=>{

            let _cantidad = getValues(`productos.${index}.cantidad`)??1;
            let _precio = parseFloat((getValues(`productos.${index}.precio`)??0).toString());
            let _descuento = getValues(`productos.${index}.descuento`)??0;
            
            
            subtotal += parseFloat((_cantidad * _precio * ( 1 - (_descuento / 100))).toFixed(2));
            descuento += parseFloat((_cantidad * _precio * (_descuento / 100)).toFixed(2));        
        });

        
        if(idTipo == 1){
            subtotal = parseFloat((subtotal).toFixed(2));
            igv = parseFloat((subtotal * 0.18).toFixed(2));
            total = parseFloat((subtotal + deuda_anterior + cargo_baterias).toFixed(2));
        }else{
            igv = parseFloat((subtotal * 0.18).toFixed(2));
            total = parseFloat((subtotal + igv + deuda_anterior + cargo_baterias).toFixed(2));
        }

        subtotal = subtotal+descuento;

        let _subtotal = ((subtotal).toFixed(2));
        let _descuento = ((descuento).toFixed(2));
        let _igv = ((igv).toFixed(2));
        let _total = ((total).toFixed(2));
        
        setValue('subtotal', _subtotal);
        setValue('descuento', _descuento);
        setValue('igv', _igv);
        setValue('total', _total);
    }

    const imprimir =  useReactToPrint({
        content: () => componentRef.current,
    });

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
        
        loadBuscarUsuario(buscar, '', 4);        
    }

    const updateSerie = (e:any) =>{

        let tipoDoc = parseInt((e.target.value).toString());

        loadDocumento(tipoDoc);

        setTypeOperation(tipoDoc);

        onChangeTotal();
    }
    
    type Nota = NotaHeladero | undefined;

    const printNotaHeladero = (nota_heladero_info:Nota)=>{

        const dateNow = DateNow();
        
        loadDocumento();
        setValue('fecha_emision', dateNow);
        setValue('fecha_pago', dateNow);
        setValue('id_estado', 1);
        setValue('precio_tipo', 2);
        setValue('user_id', nota_heladero_info?.user_id ?? 0);

        let usuario_id = nota_heladero_info?.user_id??0;

        if(usuario_id != 0){
            
            loadBuscarUsuario(usuario_id, "codigo", 4);
            setValue('user_id', nota_heladero_info!.user_id);
        }

        let detalle = [];

        const isImportFromNota = getValues('importado_tipo') == 'nota' || getValues('importado_tipo') == "1";
        
        if(nota_heladero_info?.detalle != undefined)
        {
            detalle = nota_heladero_info!.detalle.map((item)=>{

                const isLitro = item.is_litro? parseFloat((item.is_litro).toString()) : 0;
                const isBarquillo = item.is_barquillo? parseFloat((item.is_barquillo).toString()) : 0;

                const vendido =item.vendido? parseFloat((item.vendido).toString()) :1;
                const precio_operacion = item.precio_operacion? parseFloat((item.precio_operacion).toString()) : 0;
                const importe = item.importe? parseFloat((item.importe).toString()) : 0;
                const cantidad = parseFloat((item.vendido??0).toString());

                const monto_operacion = isLitro && isImportFromNota && (cantidad > 0)  ? importe : precio_operacion;
                
                return {
                    id:item.id??0,
                    codigo:item.codigo??'',
                    producto:item.producto,
                    cantidad:(cantidad>0 && isLitro && isImportFromNota) ? 1 : cantidad,
                    descuento: 0,
                    precio: parseFloat(monto_operacion.toString()),
                    total: parseFloat(((monto_operacion*vendido).toString())).toFixed(isLitro || isBarquillo ? 3 : 2),
                    is_litro :item.is_litro ?? false,
                    is_barquillo:item.is_barquillo ?? false,
                    original_precio_venta: 0,
                    original_descuento: 0,
                    original_precio_venta_mayor: 0,
                    original_descuento_mayor: 0,
                }
            })
        
            setValue('productos', detalle.map((item) => {
                return {
                    ...item,
                    cantidad: item.cantidad ? parseInt((item.cantidad).toString()) : 0
                }
            }));

            setValue('cargo_baterias', nota_heladero_info?.cargo_baterias ?? 0);
            setValue('deuda_anterior', nota_heladero_info?.deuda_anterior ?? 0);
                        
            
            onChangeTotal();
        }
    }

    const getDataFromListProducts = (): productItem[] => {
        const productList =  (listBuscarProducto || []);
        let responseProductList : productItem[] = [];
        
        for(let producto of productList){
            responseProductList.push({
                label: `${producto.codigo??''} - ${producto.nombre??''}`,
                value: producto.id??''
            });
        }
                                                    
        return responseProductList;
    }

    // Observa los cambios en el valor de `is_unit` para cada producto
    const isBox = (index: number) => watch(`productos.${index}.is_box`);

    const setPriceByType = (index:number) => {
        const is_box = getValues(`productos.${index}.is_box`) ?? false;
        const precio_venta = getValues(`productos.${index}.original_precio_venta`) ?? 0;
        const precio_venta_cajas = getValues(`productos.${index}.original_precio_venta_mayor`) ?? 0;
        
        setValue(`productos.${index}.is_box`, !is_box ,{
            shouldTouch: true,
            shouldDirty: true
        });

        let original_precio_venta = parseFloat((precio_venta ?? '0').toString());
        let original_precio_venta_mayor = parseFloat((precio_venta_cajas ?? '0').toString());

        let total: strnum = !is_box ? original_precio_venta_mayor : original_precio_venta;

        setValue(`productos.${index}.precio`, parseFloat(total.toFixed(3)))
        setValue(`productos.${index}.total`, total.toFixed(2))

        onChangeSubTotal(index);
        onChangeTotal();
    }

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>  
            {
                refId.current > 0 &&
                <FacturasComponent ref={componentRef} currentNota={ getValues() } getValues={getValues}/>
            }

            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControls 
                    isPrint={isPrint}
                    save={()=>console.log(1)} 
                    page="facturacion" 
                    onNavigateBack = {()=>{
                        window.location.href = '/facturacion/';
                    }}
                    funcNew={()=>{
                        window.location.href = '/facturacion/new';
                    }}
                    imprimir={imprimir} 
                />

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
                                    <option value="1" key={"Boleta"}>Boleta</option>
                                    <option value="2" key={"Factura"}>Factura</option>
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
                                        placeholder='Buscar producto'
                                        className={errors.user_id ? "form-control is-invalid p-0" : "form-control p-0"}
                                        disabled={disableFromImport}
                                    />
                            </div>
                            
                            
                    }/>
                        
                    </div>
                </div>

                <h4>Parametros</h4>

                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">

                        <div className="mb-3">
                            <label htmlFor="tipo_transaccion" className="form-label">Tipo de transacción</label>
                            <select 
                                    className={ errors.tipo_transaccion ? "form-control is-invalid" : "form-control"}
                                    {...register('tipo_transaccion', { required:true })}>
                                <option value="1" key={"Contado"}>Contado</option>
                                <option value="2" key={"Credito"}>Credito</option>
                            </select>                                                
                        </div>

                    </div>
                    
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">

                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <select className={ errors.id_estado ? "form-control is-invalid" : "form-control"}
                                    {...register('id_estado', { required:true })}>
                                        {
                                            listEstadosFactura.map(({ id, estado })=>(
                                                <option key={id+estado} value={id}>{estado}</option>
                                            ))
                                        }
                                
                            </select>                                              
                        </div>

                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">

                        <div className="mb-3">
                            <label htmlFor="precio_tipo" className="form-label">Precio tipo</label>
                            <select className={ errors.precio_tipo ? "form-control is-invalid" : "form-control"}
                                    disabled={disablePriceType}
                                    {...register('precio_tipo', { required:true })}>
                                <option value="0" key={"Precio 0"}>Precio publico</option>
                                <option value="1" key={"Precio 1"}>Precio por mayor</option>
                                <option value="2" key={"Precio 2"}>Precio heladero</option>
                            </select>                                              
                        </div>

                    </div>


                </div>

                <h4>Productos o items del movimiento</h4>

                <div className="row">
                    {
                        disableFromImport == false && (
                            <>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="input-group mb-3">
                                        <SelectPicker                        
                                            data={ getDataFromListProducts() }
                                            style={{ width: 224 }}
                                            onSearch={updateData}
                                            onChange={(e)=>{
                                                if (listBuscarProducto && listBuscarProducto.length > 0) {
                                                    setSelectProducto(listBuscarProducto.filter((producto)=>producto.id == e)[0]);
                                                }
                                            }}
                                            value={selectProducto?.id ?? null} // Controla el valor del SelectPicker
                                            cleanable={true}
                                            placeholder='Buscar producto'
                                            className="form-control p-0 w-auto no-width"
                                        />
                                        <button onClick={loadProducto} className="btn btn-primary" type="button"><i className="bi bi-plus"></i> Agregar</button>
                                        <Toaster />
                                    </div>

                                </div>                            
                            </>
                        )
                    }

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
                                                
                                                    <tr key={`facturacion-detalle-list-${item.id}-${index}`}>
                                                            <td className='text-left'>
                                                                <p>{item.codigo} <br/> {item.producto}</p>
                                                                <input type="hidden" {...register(`productos.${index}.codigo`)}/>
                                                                <input type="hidden" {...register(`productos.${index}.id`)}/>
                                                                <input type="hidden" {...register(`productos.${index}.facturas_id`)}/>
                                                            </td>
                                                            <td>
                                                                <div className="input-group">
                                                                    {
                                                                        <button 
                                                                            className="btn btn-primary" 
                                                                            type="button" 
                                                                            onClick={()=> setPriceByType(index) }
                                                                            disabled={!!id}
                                                                            >{ isBox(index) ? `Cajas` : `Unit.` }</button>                                                                        
                                                                    }
                                                                    <input type="number" className='form-control' {...register(`productos.${index}.cantidad`, {
                                                                        onChange: (i)=> {
                                                                            
                                                                            let value = i.target.value ?? 0;
                                                                            if(value == 0) setValue(`productos.${index}.cantidad`, 1);

                                                                            onChangeSubTotal(index);
                                                                            onChangeTotal();
                                                                        }
                                                                    })} min={getValues('precio_tipo') == 2 ? 0 : 1} readOnly={disableFromImport} onWheel={(e) => e.currentTarget.blur()}/>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">S/</span>
                                                                    <input className='form-control' 
                                                                        type="number" 
                                                                        disabled={true}
                                                                        value={Round(watch(`productos.${index}.precio`), 2)}/>
                                                                </div>
                                                            </td> 
                                                            <td>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">%</span>
                                                                    <input type="number" className='form-control' {...register(`productos.${index}.descuento`,{
                                                                        onChange: ()=> {
                                                                            onChangeSubTotal(index);
                                                                            onChangeTotal();
                                                                        }
                                                                    })} readOnly={disableFromImport} onWheel={(e) => e.currentTarget.blur()}/>
                                                                </div>
                                                                    
                                                            </td>                                                            
                                                            <td>
                                                                {/* {item.total} */}
                                                                <div className="input-group">
                                                                    <span className="input-group-text">S/</span>
                                                                    <input type="text" className='form-control' {...register(`productos.${index}.total`)} readOnly/>
                                                                </div>
                                                            </td>                                                            
                                                            <td>
                                                                {
                                                                    disableFromImport == false && (
                                                                        <button type="button" className='btn btn-danger' onClick={() => remove(index)}>
                                                                            Delete
                                                                        </button>
                                                                    )
                                                                }
                                                            </td>                                                            
                                                    </tr>
                                                
                                            )})
                                        }

                                        {
                                           (getValues('importado_tipo') == 'nota' || getValues('importado_tipo') == "1") && getValues('importado_codigo') && (
                                                <>
                                                    <tr>
                                                        <td colSpan={4} align='left' className={`text-end bg-secondary`}><b>Cargo baterias</b></td>
                                                        <td className='bg-secondary'>
                                                            <div className="input-group">
                                                                <span className="input-group-text">S/</span>
                                                                <input type="text" className='form-control' {...register('cargo_baterias')} disabled/>
                                                            </div>
                                                        </td>
                                                        <td className='bg-secondary'>&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} align='left' className={`text-end bg-secondary`}><b>Deuda anterior</b></td>
                                                        <td className='bg-secondary'>
                                                            <div className="input-group">
                                                                <span className="input-group-text">S/</span>
                                                                <input type="text" className='form-control' {...register('deuda_anterior')} disabled/>
                                                            </div>
                                                        </td>
                                                        <td className='bg-secondary'>&nbsp;</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                        <tr>
                                            <td colSpan={4} align='left' className='text-end bg-secondary'><b>Subtotal</b></td>
                                            <td className="bg-secondary">
                                                <div className="input-group">
                                                    <span className="input-group-text">S/</span>
                                                    <input type="text" className='form-control' {...register('subtotal')} disabled/>
                                                </div>
                                            </td>
                                            <td className="bg-secondary">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} align='left' className='text-end bg-secondary'><b>Descuento</b></td>
                                            <td className='bg-secondary'>
                                                <div className="input-group">
                                                    <span className="input-group-text">S/</span>
                                                    <input type="text" className='form-control' {...register('descuento')} disabled/>
                                                </div>
                                            </td>
                                            <td className='bg-secondary'>&nbsp;</td>
                                        </tr>
                                        <tr className={`${typeOperation == 1 ? 'd-none' : ''}`}>
                                            <td colSpan={4} align='left' className={`text-end bg-secondary`}><b>IGV</b></td>
                                            <td className='bg-secondary'>
                                                <div className="input-group">
                                                    <span className="input-group-text">S/</span>
                                                    <input type="text" className='form-control' {...register('igv')} disabled/>
                                                </div>
                                            </td>
                                            <td className='bg-secondary'>&nbsp;</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colSpan={4} align='left' className='text-end bg-info'><b>Total</b></td>
                                            <td className='bg-info'>
                                                <div className="input-group">
                                                    <span className="input-group-text">S/</span>
                                                    <input type="text" className='form-control' {...register('total')} disabled/>
                                                </div>
                                            </td>
                                            <td className='bg-info'>&nbsp;</td>
                                        </tr>
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
