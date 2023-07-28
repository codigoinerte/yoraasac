import { SyntheticEvent } from "react";
import { ListDetail } from '../components/ListDetail';
import { NotaHeladero } from "../../interfaces";

export interface ContainerInterface  {
    children:  React.ReactElement 
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
    eliminar: Function,
    next: Function,
    prev: Function
}
export interface ReportList{
    children: React.ReactElement,
    cabecera: string[],
    detalle:listaDetalle[],    
    descargar: Function,
    next?: Function,
    prev?: Function
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
}
/***************************************** */
export type FormBuscarStockHeladoValues = {
    codigo: string | null;
    movimiento: string | null;  
    fechaCreacion: Date | null;  
};

export interface FormStockHeladoValues {
    id:                number | null;
    codigo_movimiento: string | null;
    movimientos_id:    number | null;
    tipo_documento_id: number | null;
    numero_documento:  string | null;
    fecha_movimiento:  string | null;
    created_at:        string | null;
    updated_at:        string | null;
    detalle:           DetalleStockHelado[] | null;
}

export interface DetalleStockHelado {
    id?:               number;
    codigo?:           string;
    producto?:         string;
    stock_helados_id?: number;
    cantidad?:         number;
    created_at?:       string;
    updated_at?:       string;
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
    codigo_movimiento: string;
    movimientos_id:    number;
    tipo_documento_id: number;
    cantidad:          number;
    numero_documento:  string;
    fecha_movimiento:  string;
    created_at:        string;
    updated_at:        string;
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
    monto:              string;
    pago:               string;
    debe:               string;
    ahorro:             string;
    estado:             number;
    cucharas:           number;
    conos:              number;
    placas_entregas:    number;
    placas_devueltas:   number;
    fecha_guardado:     null;
    fecha_apertura:     string;
    fecha_cierre:       null;
    fecha_operacion?:   any;
    id_usuario:         number;
    created_at:         string;
    updated_at:         string;
    cucharas_devueltas: number;
    conos_devueltas:    number;
    productos:            FormNotaHeladeroDetalleValues[];
}

export interface FormNotaHeladeroDetalleValues {
    id?:                number;
    devolucion?:        number;
    pedido?:            number;
    vendido?:           number;
    importe?:           string;
    nota_heladeros_id?: number;
    created_at?:        string;
    updated_at?:        string;
    codigo?:            string;
    producto?:          string;
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
    campos?: string[] | undefined   
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
    fecha_inicio:   Date;
    fecha_fin:      Date;
}

export interface ReporteNotaHeladero {
    data: ReporteItemNota[];
}

export interface ReporteItemNota {
    id:                 number;
    user_id:            number;
    moneda_id:          number;
    id_sucursal:        number;
    monto:              string;
    pago:               string;
    debe:               string;
    ahorro:             string;
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
}

/* REPORTE FACTURACOIN */

// Generated by https://quicktype.io

export interface ReporteNotaForm{
    documento?:     string;
    nombre?:        string;
    estado?:        number;
    tipo?:          number;
    fecha_inicio:   Date;
    fecha_fin:      Date;
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

