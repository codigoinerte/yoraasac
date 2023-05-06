// Generated by https://quicktype.io

export interface StockBarquillos {
    data:          StockBarquillo[];
    next_page:     null;
    previous_page: null;
}

export interface StockBarquillo {
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


export interface intialStateStockBarquillos {
    status: boolean;
    StockBarquillo:StockBarquillo[];
    nextPage: string | null;
    prevPage: string | null;
    active: StockBarquillo | null;
    errorMessage: string | null | undefined;
}

