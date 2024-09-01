export interface Reajustes {
    data: Reajuste[];
}

export interface Reajuste {
    id:             number;
    codigo:         string;
    codigo_ingreso: string;
    codigo_salida:  string;
    user_id:        number;
    fecha_reajuste: Date | string;
    created_at:     Date;
    updated_at:     Date;
}

export interface intialStateReajuste {
    status: boolean;
    Reajustes:Reajuste[];
    active: Reajuste | null;
    errorMessage?: string;
}

export interface ReajusteDetail {
    data: ReajusteData;
}

export interface ReajusteData {
    id:             number;
    codigo:         string;
    codigo_ingreso: string;
    codigo_salida:  string;
    user_id:        number;
    fecha_reajuste: Date | string;
    created_at:     Date;
    updated_at:     Date;
    detalle:        DetalleReajuste[];
}

export interface FormReajusteValues extends ReajusteData {}

export interface FormReajustesValues {
    buscar:         string;
}

export interface DetalleReajuste {
    id:               number;
    producto:         string;
    stock:            number;
    codigo:           string;
    cantidad_ingreso: number;
    cantidad_salida:  number;
    reajuste_id:      number;
    created_at:       Date;
    updated_at:       Date;
}

export type loadReajusteCallback = Reajuste[];