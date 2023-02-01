import { MenuInterface } from "../interfaces";

export const Menu:MenuInterface[] = [
    {
       "nombre":"Personas",
       "alias":"/personas",
       "icono":"bi bi-people"
    },
    {
       "nombre":"Productos",
       "alias":"/productos",
       "icono":"bi bi-box-seam"
    },
    {
       "nombre":"Stock",
       "alias":"/stock",
       "icono":"bi bi-ui-checks-grid"
    },
    {
       "nombre":"Notas heladero",
       "alias":"/nota-heladero/new",
       "icono":"bi bi-file-earmark-plus"
    },
    {
       "nombre":"Facturación",
       "alias":"/facturacion",
       "icono":"bi bi-file-text"
    },
    {
       "nombre":"Reportes",
       "alias":"/reportes",
       "icono":"bi bi-graph-down"
    },
    {
       "nombre":"Configuración",
       "alias":"/configuración",
       "icono":"bi bi-gear"
    }
 ];

export const MenuPersonas:MenuInterface[] = [
    {
       "nombre":"Clientes",
       "alias":"/personas/clientes",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Proveedores",
       "alias":"/personas/proveedores",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Personal",
       "alias":"/personas/personal",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Heladeros",
       "alias":"/personas/heladeros",
       "icono":"bi bi-app"
    }
    
 ];

 
export const MenuStock:MenuInterface[] = [
    {
       "nombre":"Helados",
       "alias":"/stock/helados",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Barquillos",
       "alias":"/stock/barquillos",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Baterias",
       "alias":"/stock/baterias",
       "icono":"bi bi-app"
    },    
 ];

 