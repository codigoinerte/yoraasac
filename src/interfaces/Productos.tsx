// Generated by https://quicktype.io

export interface Productos {
    data:          Producto[];
    next_page:     string;
    previous_page: null;
}

export interface Producto {
    id:            number;
    codigo:        string;
    nombre:        string;
    orden:         number;
    stock_alerta:  number;
    precio_venta:  string;
    descuento:     string;
    destacado:     number;
    estados_id:    number;
    unspsc_id:     number;
    marcas_id:     number;
    unidad_id:     number;
    moneda_id:     number;
    igv_id:        number;
    created_at:    string;
    created_at_spanish:    string;
    updated_at:    null;
    moneda:        string;
    estado:        string;
    simbolo:       string;
    digitos:       number;
    sep_decimales: string;
    sep_miles:     string;
    principal:     number;
    is_barquillo:  boolean;
}

export interface intialStateProductos {
    status: boolean;
    productos:Producto[];    
    nextPage: string | null;
    prevPage: string | null;
    active: Producto | null;
    errorMessage: string | null | undefined;
}
