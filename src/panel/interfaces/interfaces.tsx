import { SyntheticEvent } from "react";
import { ListDetail } from '../components/ListDetail';

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
    next: Function,
    prev: Function
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

export interface baseArray{
    id:number,
    nombre:string
}


export interface FormPersonasValuesSave extends FormPersonasValues {
    documento_tipo : number,
    usuario_tipo : number | undefined
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
};

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


/************************* */