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
}
export interface PersonalList{
    category?:string;
    page:string;
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
    save: Function ;
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

// types
export type breadcrumb = {
    id:number;
    titulo: string;
    enlace: string;
}

export type listaDetalle = {
    id: number,
    campos: string[]    
}

// ! CRERA EL TIPADO PARA EL DETALLE DE LA NOTA DE HELADERO
export type listaDetalleNotaHeladero = {
    id: number,
    campos: string[]    
}

export type modulos = string | 'clientes' | 'heladeros' | 'personal' | 'proveedores';