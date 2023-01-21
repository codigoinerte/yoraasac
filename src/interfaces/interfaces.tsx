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
// types
export type breadcrumb = {
    id:number;
    titulo: string;
    enlace: string;
}