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
       "nombre":"Movimientos",
       "alias":"/movimiento",
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
       "alias":"/configuracion",
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
       "nombre":"Movimiento de Helados",
       "alias":"/movimiento/helados",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Movimiento de Barquillos",
       "alias":"/movimiento/barquillos",
       "icono":"bi bi-app"
    },
    {
       "nombre":"Movimiento de Baterias",
       "alias":"/movimiento/baterias",
       "icono":"bi bi-app"
    },
    {
      "nombre":"Movimiento de Reajuste",
      "alias":"/movimiento/reajuste",
      "icono":"bi bi-app"
    }  
 ];

 export const MenuReportes:MenuInterface[] = [
   {
      "nombre":"Notas heladeros",
      "alias":"/reportes/nota-heladeros",
      "icono":"bi bi-app"
   },    
   {
      "nombre":"Reporte Heladero asistencia",
      "alias":"/reportes/heladeros-asistencia",
      "icono":"bi bi-app"
   },
   {
      "nombre":"Stock",
      "alias":"/reportes/stock-restante",
      "icono":"bi bi-app"
   },
   {
      "nombre":"Historial Movimientos (Helados)",
      "alias":"/reportes/historial-helados",
      "icono":"bi bi-app"
   },
];
 
export const MenuConfiguracion:MenuInterface[] = [
   {
      "nombre":"Moneda",
      "alias":"/configuracion/monedas",
      "icono":"bi bi-app"
   },
   {
      "nombre":"Marcas",
      "alias":"/configuracion/marcas",
      "icono":"bi bi-app"
   },
   {
      "nombre":"Configuración principal",
      "alias":"/configuracion/principal",
      "icono":"bi bi-app"
   },
   {
      "nombre":"Locales y series",
      "alias":"/configuracion/locales-series",
      "icono":"bi bi-app"
   },
   {
      "nombre":"Accesos directos",
      "alias":"/configuracion/destacados",
      "icono":"bi bi-app"
   }
   
];
