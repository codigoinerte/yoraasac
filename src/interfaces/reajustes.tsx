export interface Reajustes {
    data: Reajuste[];
}

export interface Reajuste {
    id:             number;
    codigo:         string;
    codigo_ingreso: string;
    codigo_salida:  null;
    user_id:        number;
    fecha_reajuste: Date;
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
    codigo_salida:  null;
    user_id:        number;
    fecha_reajuste: Date;
    created_at:     Date;
    updated_at:     Date;
    detalle:        Detalle[];
}

export interface FormReajusteValues extends ReajusteData {}

export interface FormReajustesValues {
    buscar:         string;
}

export interface Detalle {
    id:               number;
    codigo:           string;
    cantidad_ingreso: number;
    cantidad_salida:  number;
    reajuste_id:      number;
    created_at:       Date;
    updated_at:       Date;
}

export type loadReajusteCallback = Reajuste[];