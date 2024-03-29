// Generated by https://quicktype.io

export interface StockBaterias {
    data:          StockBateria[];
    next_page:     null;
    previous_page: null;
}

export interface StockBateria {
    id:                number;
    codigo_movimiento: string;
    numero_documento:  string;
    fecha_movimiento:  string;
    cantidad:          number;
    movimiento:        null;
    documento:         string;
    created_at:        string;
    updated_at:        string;
}

export interface intialStateStockBateria {
    status: boolean;
    StockBateria:StockBateria[];
    nextPage: string | null;
    prevPage: string | null;
    active: StockBateria | null;
    errorMessage: string | null | undefined;
}
