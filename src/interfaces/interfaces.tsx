export interface ContainerInterface  {
    children:  React.ReactElement 
}
export interface breadcrumbInterface {
    breadcrumb : String[],
    titulo: String,
    mensaje?: String
}
export interface Breadcrumb {
    titulo: string;
    enlace:Function;
}
