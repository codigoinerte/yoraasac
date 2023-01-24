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
    tipo: modulos,
    ruta: string
}
export interface PersonalList{
    tipo:modulos
}
export interface TablalList{
    children: React.ReactElement,
    modulo?:string,
    cabecera: string[],
    detalle:listaDetalle[],    
    eliminar: Function,
    next: Function,
    prev: Function
}
export interface paginationInterface extends SyntheticEvent {   
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