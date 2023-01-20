export interface ContainerInterface  {
    children:  React.ReactElement 
}
export interface breadcrumbInterface {
    breadcrumb : breadcrumb[],
    titulo: String,
    mensaje?: String
}
export interface Breadcrumb {
    id:number;
    titulo: string;
    enlace: string;
}

// types
export type breadcrumb = {
    id:number;
    titulo: string;
    enlace: string;
}