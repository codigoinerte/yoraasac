import { SyntheticEvent } from "react";

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
    breadcrumb : breadcrumb[]
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

export type modulos = string | 'clientes' | 'heladeros' | 'personal' | 'proveedores';