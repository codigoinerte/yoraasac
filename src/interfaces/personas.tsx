// Generated by https://quicktype.io

import { FormPersonasValues } from "../panel/interfaces";

/*
export interface Personas {
    current_page:   number;
    data:           Persona[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Persona {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: boolean | null;
    apellidos:         string | null;
    documento:         string;
    documento_tipo:    number;
    usuario_tipo:      number;
    idpais:            number | null;
    iddepartamento:    number | null;
    idprovincia:       number | null;
    iddistrito:        number | null;
    created_at:        string;
    updated_at:        string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}




*/

// Generated by https://quicktype.io

export interface Personas {
    data:          Persona[];
    next_page:     string;
    previous_page: string;
}
/*
export interface Persona {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: string;
    apellidos:         string;
    documento:         string;
    documento_tipo:    number;
    usuario_tipo:      number;
    idpais:            number;
    iddepartamento:    number;
    idprovincia:       number;
    iddistrito:        number;
    created_at:        string;
    updated_at:        string;
}
*/
export interface Persona {
    documento:      string;
    documento_tipo: string;
    name:           string;
    apellidos:      string;
    idpais:         number;
    iddepartamento: number;
    idprovincia:    number;
    iddistrito:     number;
    email:          string;
    password:       string;
    celular:        string;
    direccion:      string;
    usuario_tipo:   string;
    updated_at:     string;
    created_at:     string;
    id:             number;
}


export interface intialStatePersonas {
    status: boolean;
    personas:Persona[];    
    nextPage: string | null;
    prevPage: string | null;
    active: Persona | null;
    errorMessage: string | null | undefined;
}











