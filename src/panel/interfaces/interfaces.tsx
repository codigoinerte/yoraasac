import React, { Component, ReactNode, SyntheticEvent } from "react";
import { NotaHeladero } from "../../interfaces";
import { UseFormRegister } from "react-hook-form";

export interface ContainerInterface  {
    children:  React.ReactElement,
    classContainer?: string
}
export interface breadcrumbInterface {
    breadcrumb : breadcrumb[],
    titulo?: String,
    mensaje?: String
}
export interface Breadcrumb {
    id:number;
    titulo: string;
    enlace: string;
}
export interface ContainerInner{
    children: React.ReactElement,
    breadcrumb : breadcrumb[],
    titulo?:string,
    classContainer?:string;
}
export interface PersonalForm{
    category?: string;
    page: string;
    tipo?: number
}
export interface PersonalList{
    category?:string;
    page:string;
    tipo?: number;
}
export interface TablalList{
    children: React.ReactElement,
    category?:string,
    page:string,
    cabecera: string[],
    detalle:listaDetalle[],    
    eliminar?: Function,
    next: Function,
    prev: Function,
    options?: Boolean,
    actions?: Boolean
    NewComponent?: ReactNode,
    routeBack?: String,
    routeBackLabel?: String
}
export interface ReportList{
    children: React.ReactElement,
    cabecera: string[],
    detalle:listaDetalle[],    
    descargar: Function,
    next?: Function,
    prev?: Function,
    routeBack?: String,
    routeBackLabel?: String
    popupKey?:Number;
}

export interface SaveList{
    children: React.ReactElement,
    cabecera: string[],
    detalle:listaDetalle[],    
    editar: Function,
    eliminar: Function
}

export interface paginationInterface extends SyntheticEvent {   
}
export interface MenuInterface {
    nombre: string;
    alias:  string;
    icono:  string;
}
export interface AccessInterface{
    Menu: MenuInterface[]
}
export interface ControlsInterface{
    tipo?: 'new' | 'edit' | 'delete' | 'list'; 
    save?: Function ;
    category?:string;
    imprimir?:Function;
    page:string;
    isPrint?:boolean;
    isFactura?:boolean;
    isNew?:boolean;
    isEdit?:boolean;
    isDelete?:boolean;
    isList?:boolean;
    onNavigateBack?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    funcNew?: Function ;
    NewComponent?:ReactNode;
    routeBackLabel?:String;
    classContainer?:string;
}
export interface ListDetail{
    cabecera: string[],
    detalle:listaDetalle[],
    eliminar: Function,
}

export interface CategoryListInterface{
    name : string,
    id:number,
    alias : string,
    children?: CategoryListInterface[]
}

export interface BuscarPersonas extends FormBuscarPersonasValues {    
    buscar:boolean
}

export interface BuscarProductos extends FormBuscarProductosValues {    
    buscar:boolean
}
export interface BuscarStockHelado extends FormBuscarStockHeladoValues {    
    buscar:boolean
}

export interface BuscarStockBarquillo extends FormBuscarStockBarquilloValues {    
    buscar:boolean
}

export interface BuscarStockBaterias extends FormBuscarStockBateriaValues {    
    buscar:boolean
}

export interface BuscarNotasHeladeros extends FormBuscarNotaHeladeroValues{
    buscar:boolean
}

export interface BuscarFacturas extends FormBuscarFacturasValues{
    buscar:boolean
}

export interface baseArray{
    id:number,
    nombre:string
}


export interface FormPersonasValuesSave extends FormPersonasValues {
    documento_tipo : number,
    usuario_tipo : number | undefined,
    foto_frontal?: string,
    foto_posterior?: string,

    img_frontal?: FileList,
    img_posterior?: FileList,
}

export interface FormProductosValuesSave extends FormProductosValues {

}

// types
export type breadcrumb = {
    id:number;
    titulo: string;
    enlace: string;
}

export type FormBuscarPersonasValues = {
    documento: string | null;
    nombres: string | null;  
    fechaCreacion: Date | null;  
};

export type FormPersonasValues = {
    documento: string | null;
    nombres: string | null;
    apellidos:string | null;
    celular:string | null;
    departamento:number | null;
    provincia:number | null;
    distrito:number | null;
    direccion:string | null;
    email?:string | null;
    password?:string | null;

    img_frontal?:   FileList;
    img_posterior?: FileList;

    foto_frontal?:  string;
    foto_posterior?:string;
    usuario_tipo?:  number;

    departamentos? : Departamento[];
    provincias? : provincia[];
    distritos? : Distrito[];
};
// foto_frontal?:FileList;
// foto_posterior?:FileList;

/**************************************** */
export type FormBuscarProductosValues = {
    codigo: string | null;
    producto: string | null;  
    fechaCreacion: Date | null;  
};

export type FormProductosValues = {
    codigo:       string | null;
    nombre:       string | null;
    orden:        number | null;
    stock_alerta: number | null;
    precio_venta: number | null;
    descuento:    number | null;
    destacado:    number | null;
    estados_id:   number | null;
    unspsc_id:    number | null;
    marcas_id:    number | null;
    unidad_id:    number | null;
    moneda_id:    number | null;
    igv_id:       number | null;
    precio_final: number | null;
    is_litro:     boolean;
    is_barquillo:     boolean;


    heladero_precio_venta: number | null;
    heladero_descuento:    number | null;
    heladero_precio_final: number | null;

    proveedor_precio: number | null;

    cantidad_caja: number | null;
}
/***************************************** */
export type FormBuscarStockHeladoValues = {
    codigo: string | null;
    movimiento: string | null;  
    fechaCreacion: Date | null;  
};

export interface FormStockHeladoValues {
    id:                number | null;
    unidades:          number | null;
    codigo_movimiento: string | null;
    movimientos_id:    number | null;
    tipo_documento_id: number | null;
    numero_documento:  string | null;
    fecha_movimiento:  string | null;
    created_at:        string | null;
    updated_at:        string | null;
    image_file?:       string;
    image_input?:      FileList;
    detalle:           DetalleStockHelado[] | null;
}

export interface DetalleStockHelado {
    [key: string]:      any;
    id?:               number;
    codigo?:           string;
    producto?:         string;
    caja_cantidad:      number;
    caja:               number;
    stock_helados_id?: number;
    cantidad?:         number;
    created_at?:       string;
    updated_at?:       string;
    min_cantidad?:      number;
    id_importado?:      number;
    is_litro?:      number;
}
/***************************************** */
export type FormBuscarStockBateriaValues = {
    codigo: string | null;
    movimiento: string | null;  
    fechaCreacion: Date | null;  
};

export interface FormStockBateriaValues {
    id:                number | null;
    codigo_movimiento: string | null;
    movimientos_id:    number | null;
    tipo_documento_id: number | null;
    cantidad:          number | null;
    numero_documento:  string | null;
    fecha_movimiento:  string | null;
    created_at:        string | null;
    updated_at:        string | null;
}
/***************************************** */
export type FormBuscarStockBarquilloValues = {
    codigo: string | null;
    movimiento: string | null;  
    fechaCreacion: Date | null;  
};

export interface FormStockBarquilloValues {
    id:                number;
    unidades:          number | null;
    codigo_movimiento: string;
    movimientos_id:    number;
    tipo_documento_id: number;
    cantidad:          number;
    numero_documento:  string;
    fecha_movimiento:  string;
    created_at:        string;
    updated_at:        string;
    image_file?:       string;
    image_input?:      FileList;
    detalle:           DetalleBarquillo[] | null;
}
export interface DetalleBarquillo {
    [key: string]:      any;
    id?:               number;
    codigo?:           string;
    producto?:         string;
    caja_cantidad:      number;
    caja:               number;
    stock_helados_id?: number;
    cantidad?:         number;
    created_at?:       string;
    updated_at?:       string;
    min_cantidad?:      number;
    id_importado?:      number;
    is_litro?:      number;
}
/***************************************** */
export type FormBuscarNotaHeladeroValues = {
    documento: string | null;
    nombre: string | null;  
    estado: number | null;  
};

export interface FormNotaHeladeroValues {
    id:                 number;
    user_id:            number;
    moneda_id:          number;
    id_sucursal:        number;
    monto:              number;
    pago:               number | string;
    debe:               number | string;
    deuda_anterior:     number | string;
    cargo_baterias:     number | string;
    subtotal:           number | string;
    suma:               number | string;
    ahorro:             number | string;
    yape:               number | string;
    efectivo:           number | string;
    estado:             number;
    estado_original:    number;
    cucharas:           number;
    conos:              number;
    placas_entregas:    number;
    placas_devueltas:   number;
    fecha_guardado?:     Date;
    fecha_apertura:     string;
    fecha_cierre:       null;
    fecha_operacion?:   any;
    id_usuario:         number;
    created_at:         string;
    updated_at:         string;
    cucharas_devueltas: number;
    conos_devueltas:    number;
    parent_id?:         number;
    observaciones?:     string;

    codigo?:            string;
    heladero_nombre?:   string;        
    estado_nombre?:     string;    
    moneda?:            string;

    id_children:       number;

    productos:            FormNotaHeladeroDetalleValues[];
}

export interface FormNotaHeladeroDetalleValues {
    id?:                number;
    devolucion?:        number | string;
    devolucion_today?:  number;
    pedido?:            number;
    vendido?:           number | string;
    importe?:           number | string;
    nota_heladeros_id?: number;
    created_at?:        string;
    updated_at?:        string;
    codigo:             string;
    producto?:          string;
    precio_operacion?:  number;
    is_litro?:          boolean;
    stock_alert_input?:  number;
}



/***************************************** */
export type FormBuscarFacturasValues = {
    documento: string | null;
    nombre: string | null;  
    fecha: Date | null;  
};

export interface FormFacturacionValues {
    id:               number;
    codigo:           null;
    serie:            string;
    correlativo:      number;
    user_id:          number;
    tipo:             number;
    fecha_pago:       string;
    id_usuario:       number;
    created_at:       string;
    updated_at:       string;
    sucursals_id:     number;
    fecha_emision:    string;
    tipo_transaccion: number;
    id_estado:        number;
    estado?:          number;
    id_moneda:        number;
    productos:          FormFacturacionDetalleValues[];
}
/*
export interface BuscarProducto {
    id:           number;
    codigo:       string;
    nombre:       string;
    orden:        number;
    stock_alerta: number;
    precio_venta: string;
    descuento:    string;
    destacado:    number;
    estados_id:   number;
    unspsc_id:    number;
    marcas_id:    number;
    unidad_id:    number;
    moneda_id:    number;
    igv_id:       number;
    estado:       string;
    moneda:       string;
    created_at:   string;
    updated_at:   string;
}
*/
export interface FormFacturacionDetalleValues {
    id:          number;
    codigo?:      string;
    precio?:      number;
    descuento?:   number;
    cantidad?:    number;
    facturas_id?: number;
    producto?:    string;
    total?:      number;
}


/***************************************** */
export interface listaDetalle  {
    id: string,
    avaibleDelete?: boolean;
    avaibleDeleteMessage?: string;
    campos?: string[] | undefined;
    popupContent?: string;
    popupKey?: number;
};

// ! CRERA EL TIPADO PARA EL DETALLE DE LA NOTA DE HELADERO
export type listaDetalleNotaHeladero = {
    id: number,
    campos: string[]    
}

export type modulos = string | 'clientes' | 'heladeros' | 'personal' | 'proveedores';


/** */

// Generated by https://quicktype.io

export interface Departamentos {
    data: Departamento[];
}

export interface Departamento {
    id:           number;
    departamento: string;
    pais_id:      number;
    created_at:   null;
    updated_at:   null;
}


// Generated by https://quicktype.io

export interface Provincias {
    data: provincia[];
}

export interface provincia {
    id:              number;
    provincia:       string;
    departamento_id: number;
    ubigeo:          string;
    created_at:      null;
    updated_at:      null;
}


// Generated by https://quicktype.io

export interface Distritos {
    data: Distrito[];
}

export interface Distrito {
    id:           number;
    distrito:     string;
    provincia_id: number;
    ubigeo:       string;
    created_at:   null;
    updated_at:   null;
}

// UNSPSC

export interface UnspscList {
    data: UnspscItem[];
}

export interface UnspscItem {
    id:          number;
    codigo:      string;
    descripcion: string;
    created_at:  null;
    updated_at:  null;
}

// Estados

export interface EstadosList {
    data: EstadoItem[];
}

export interface EstadoItem {
    id:         number;
    estado:     string;
    created_at: null;
    updated_at: null;
}

// Marcas

export interface MarcasList {
    data: MarcaItem[];
}

export interface MarcaItem {
    id:         number;
    nombre:     string;
    created_at: null;
    updated_at: null;
}

// Unidades

export interface UniadesList {
    data: UnidadItem[];
}

export interface UnidadItem {
    id:            number;
    simbolo:       string;
    unidad_medida: string;
    created_at:    null;
    updated_at:    null;
}

// Moneda

export interface MonedaList {
    data: MonedaItem[];
}

export interface MonedaItem {
    id:            number;
    moneda:        string;
    simbolo:       string;
    codigo:        string;
    digitos:       number;
    sep_decimales: string;
    sep_miles:     string;
    principal:     number;
    created_at:    null;
    updated_at:    null;
}

// IGV

export interface IgvList {
    data: IgvItem[];
}

export interface IgvItem {
    id:         number;
    nombre:     string;
    valor:      number;
    created_at: null;
    updated_at: null;
}

// Movimiento

export interface MovimientoList {
    data: MovimientoItem[];
}

export interface MovimientoItem {
    id:         number;
    movimiento: string;
    created_at: null;
    updated_at: null;
}

// Tipo de documento

export interface TipoDocumentoList {
    data: TipoDocumentoItem[];
}

export interface TipoDocumentoItem {
    id:         number;
    documento:  string;
    tipo?:       number;
    created_at: null;
    updated_at: null;
}
// Nota heladero estado

export interface NotaHeladeroEstados {
    data: NotaHeladeroEstado[];
}

export interface NotaHeladeroEstado {
    id:         number;
    nombre:     string;
    created_at: null;
    updated_at: null;
}

// Factura estados

export interface FacturaEstados {
    data: FacturaEstado[];
}

export interface FacturaEstado {
    id:         number;
    estado:     string;
}


// Producots publicados

export interface ProductosPublicadosList {
    success: boolean;
    message: string;
    data:    ProductosPublicados[];
}

export interface ProductosPublicados {
    id:           number;
    codigo:       string;
    nombre:       string;
    orden:        number;
    stock_alerta: number;
    precio_venta: string;
    descuento:    string;
    destacado:    number;
    estados_id:   number;
    unspsc_id:    number;
    marcas_id:    number;
    unidad_id:    number;
    moneda_id:    number;
    igv_id:       number;
    created_at:   string;
    updated_at:   string;
    is_litro:     boolean;
    stock_alert_input: number;
    vendido: number,
    importe: number,
    devolucion: number,
    stock?: number;
    heladero_precio_venta: string;
    heladero_descuento:    string;
}


// Buscar usuario

export interface BuscarUsuarioList {
    data: BuscarUsuario[];
}

export interface BuscarUsuario {
    id:                number;
    name:              string;
    email:             null;
    email_verified_at: null;
    apellidos:         string;
    documento:         string;
    documento_tipo:    number;
    usuario_tipo:      number;
    idpais:            number;
    iddepartamento:    number;
    idprovincia:       number;
    iddistrito:        number;
    created_at:        string;
    updated_at:        string;
    celular:           string;
    direccion:         string;
    idestado:          null;
    sucursals_id:      null;
}


// Buscar producto

export interface BuscarProductosList {
    data: BuscarProducto[];
}

export interface BuscarProducto {
    id:           number;
    codigo:       string;
    nombre:       string;
    orden:        number;
    stock_alerta: number;
    cantidad_caja:number;
    precio_venta: string;
    descuento:    string;
    destacado:    number;
    estados_id:   number;
    unspsc_id:    number;
    marcas_id:    number;
    unidad_id:    number;
    moneda_id:    number;
    igv_id:       number;
    estado:       string;
    moneda:       string;
    is_litro:     boolean;
    is_barquillo: boolean;
    created_at:   string;
    updated_at:   string;
}

// Buscar Nota guardada

// Generated by https://quicktype.io

export interface NotaHeladeroGuardadas {
    success: boolean;
    message: string;
    data:    NotaHeladero;
}

export interface NotaHeladeroGuardada extends NotaHeladero {
}
/*
export interface FormFacturacionDetalleValues {
    id:                number;
    devolucion:        number;
    pedido:            number;
    vendido:           number;
    importe:           string;
    nota_heladeros_id: number;
    created_at:        string;
    updated_at:        string;
    codigo:            string;
}
*/

/************************* */

// Generated by https://quicktype.io

export interface SeriesDocumentos {
    serie:       string;
    correlativo: string;
}


export interface deleImagenPersona  {
    id?:number,
    foto_frontal ?: string,
    foto_posterior ?: string,
}


/* REPORTES NOTA HELADERO */

// Generated by https://quicktype.io

export interface ReporteNotaForm{
    documento?:     string;
    nombre?:        string;
    estado?:        number;
    fecha_inicio:   string;
    fecha_fin:      string;
}

export interface ReporteNotaHeladero {
    data: ReporteItemNota[];
}

export interface ReporteItemNota {
    id:                 number;
    user_id:            number;
    moneda_id:          number;
    id_sucursal:        number;
    vendido:            number;
    deuda_pagada:       number;
    total_pagar:        number;
    pago:               number;
    efectivo:           number;
    debe:               number;
    ahorro:             number;
    cucharas:           number;
    conos:              number;
    placas_entregas:    number;
    placas_devueltas:   number;
    fecha_guardado:     string;
    fecha_apertura:     string;
    fecha_cierre:       null | string;
    id_usuario:         number;
    created_at:         string;
    updated_at:         string;
    heladero_documento: string;
    heladero_nombre:    string;
    name:               string;
    nombre:             null;
    estado:             string;
    deuda_total?:           number;
    dias_asistidos:         number;
    porcentaje_asistencia:  string;
    observaciones:      string;
}

/* REPORTE FACTURACOIN */

// Generated by https://quicktype.io
export interface FormNotaFechaOperacion{
    fecha_operacion : any;
    estado: number;
    id: number;
}

export interface ReporteNotaForm{
    user_id?:       number;
    estado?:        number;
    tipo?:          number;
    fecha_inicio:   string;
    fecha_fin:      string;
}

export interface ReporteFacturacion {
    data: ReporteItemFactura[];
}

export interface ReporteItemFactura {
    id:                number;
    codigo:            null;
    serie:             string;
    correlativo:       number;
    user_id:           number;
    tipo:              number;
    fecha_pago:        string;
    id_usuario:        number;
    created_at:        string;
    updated_at:        string;
    sucursals_id:      number;
    fecha_emision:     string;
    tipo_transaccion:  number;
    id_estado:         number;
    id_moneda:         number;
    usuario_documento: string;
    usuario_nombre:    string;
    estado:            string;
    documento:         string;
    moneda:            string;
    total:             string;
}

/* MONEDA */

export interface formMoneda {
    codigo:     string;
    moneda:     string;
    simbolo:    string;
    principal:  number;
}

export interface intialStateMoneda {
    status: boolean;
    monedas:Moneda[];
    moneda: Moneda | null;
    errorMessage: string | null | undefined;
}

export interface Monedas {
    data: Moneda[];
}

export interface Moneda {
    id:            number;
    moneda:        string;
    simbolo:       string;
    codigo:        string;
    digitos:       number;
    sep_decimales: string;
    sep_miles:     string;
    principal:     number;
    created_at:    null | string;
    updated_at:    null | string;
}

/* MARCAS CRUD*/

export interface formMarca {
    nombre:     string;
}

export interface intialStateMarca {
    status: boolean;
    marcas:Marca[];
    marca: Marca | null;
    errorMessage: string | null | undefined;
}

export interface Marcas {
    data: Marca[];
}

export interface Marca {
    id:         number;
    nombre:     string;
    created_at: null | string;
    updated_at: null | string;
}

/* CONFIGURACION CRUD */

export interface formConfiguracion {
    ruc             : string;
    razon_social    : string;
    razon_comercial : string;
    pagina_web      : string;
    email_empresa   : string;
    celular         : string;
    igv             : number;
    cargo_baterias  : number | string;
    logo            : string;
    logo_field?     : FileList;
    contactos       : ContactoConfig[];
}

export interface intialStateConfiguration {
    status: boolean;
    configuration:Configuration | null;
    contacts: ContactoConfig[];
    errorMessage: string | null | undefined;
}

export interface Configurations {
    data: Configuration;
}

export interface Configuration {
    ruc:             string;
    razon_social:    string;
    razon_comercial: string;
    pagina_web:      string;
    email_empresa:   string;
    celular:         string;
    igv:             number;
    cargo_baterias:  number;
    contactos:       ContactoConfig[];
    igvs:            IgvConfig[];
    logo?:           string;
}

export interface ContactoConfig {
    id?:          number;
    key?:         number;
    nombre:       string;
    email:        string;
    celular:      string;
    principal:    number;
    sistemas_id?: number;
}

export interface IgvConfig {
    id:         number;
    nombre:     string;
    valor:      number;
    created_at: null;
    updated_at: null;
}

/* LOCALES Y SERIES */

export interface intialStateLocalesSeries {
    status: boolean;
    sucursal:Sucursal | null,
    sucursales:Sucursal[];
    series: Serie[];
    errorMessage: string | null | undefined;
}

export interface SucursalesSeries {
    sucursales: Sucursal[];
    series:     Serie[];
}
export interface SucursalesSeriesResponse {
    sucursales?: Sucursal[];
    series?:     Serie[];
}

export interface Serie {
    idtipo:      number;
    documento:   string;
    id:          number | null;
    serie:       null | string;
    correlativo: null | string;
}

export interface Sucursal {
    id:           number;
    codigo:       string;
    codigo_sunat: string;
    nombre:       string;
    ubigeo:       string;
    departamento: number;
    provincia:    number;
    distrito:     number;
    direccion:    string;
    pagina_web?:  string;
    created_at:   string;
    updated_at:   string;
}

export interface FormSeries {
    codigo:       string;
    nombre:       string;
    codigo_sunat: string;
    ubigeo:       string;
    departamento: number;
    provincia:    number;
    distrito:     number;
    direccion:    string;
    pagina_web:   string;
    series:       Series[];
    sucursales?:  formSucursales[] | null | undefined;
    id?:          number;
}

interface formSucursales extends Sucursal{
    identify:      number;
    pagina_web?:    string;
}

export interface Series {
    idtipo:      number;
    documento:   string;
    id:          number | null;
    serie:       null | string;
    correlativo: null | string;
}

//! SUCURSALES UPDATED RESPONSE
export interface SucursalesUpdatedResponse {
    success: boolean;
    message: string;
    data:    SucursalesSeries;
}

/* DESTACADOS */

export interface intialStateDestacados {
    status: boolean;
    destacados: DataDestacados | null;
    errorMessage: string | null | undefined;
}

// Generated by https://quicktype.io

export interface Destacados {
    success: boolean;
    message: string;
    data:    DataDestacados;
}

export interface DataDestacados {
    menu?:      Menu[];
    destacado?: Destacado[];
}

export interface Destacado {
    id:         number;
    idusuario:  number;
    idmenu:     number;
    nombre:     string;
    alias:      string;
    orden:      number;
    icono:      string;
    created_at: string;
    updated_at: string;
}

export interface Menu {
    id:       number;
    nombre:   string;
    alias:    string;
    icono:    string;
    idparent?: number;
    children?:Menu[];
    activo?:   boolean; 
    checked?: boolean;
}
export interface MenuMap {
    menu: Menu;
    register?:UseFormRegister<Menu>
}
export interface DestacadoForm {
    destacados: DestForm[];
}
export interface DestForm {
    idmenu: number;
    orden:  number;
    icono: string;
    activo: boolean;
}


export interface StockHistorialHelado {
    data: StockHistorialHeladoData[];
}

export interface StockHistorialHeladoData {
    id:                 number;
    codigo_movimiento:  string;
    id_tipo_movimiento: number;
    movimiento:         Movimiento;
    documento:          string;
    numero_documento:   string;
    fecha_movimiento:   string;
    created_at:         string;
    updated_at:         string;
    user_related:       string | null;
    detalle:            Detalle[];
}

export interface Detalle {
    id:       number;
    codigo:   string;
    nombre:   string | null;
    cantidad: number;
}
export enum Movimiento {
    Ingreso = "Ingreso",
    Salida = "Salida",
}
export interface Stock {
    data: StockData[];
}

export interface StockData {
    id:                    number;
    codigo:                string;
    nombre:                string;
    stock_alerta:          number;
    precio_venta:          string;
    descuento:             string;
    destacado:             number;
    estados_id:            number;
    unspsc_id:             number;
    marcas_id:             number;
    unidad_id:             number;
    moneda_id:             number;
    igv_id:                number;
    heladero_precio_venta: string;
    heladero_descuento:    string;
    cantidad_caja:         number;
    entrantes:             number | null;
    salientes:             number | null;
    total?:                number | null;
    cajas_restantes?:      number | null;
}

/* interface reporte heladero asistencia */
export interface paramsHeladeroAsistencia{
    user_id?: number,
    anio?:  number,
    mes?:   number
}
export interface ReporteHeladeroAsistencia {
    data: DataHeladeroAssistencia[];
}

export interface DataHeladeroAssistencia {
    id:                    number;
    documento:             string;
    heladero_nombre:       string;
    asistencia_apertura:   boolean;
    asistencia_cierre:     boolean;
}

export interface FormImportNota{
    file: FileList
}