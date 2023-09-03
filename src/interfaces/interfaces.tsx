import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, configurationSlice, destacadoSlice, localesSeriesSlice, marcaSlice, monedaSlice, personasSlice, stockBarquillosSlice, stockBateriasSlice, stockHeladosSlice } from "../store";
import { generalSlice } from "../store/personas/generalSlice";
import { productosSlice } from "../store/productos/productosSlice";
import { notaHeladeroSlice } from "../store/notaHeladeros/notaHeladerosSlice";
import { facturacionSlice } from "../store/facturacion/facturacionSlice";

/* interfaces */
export interface loginInterface  {
    email: string,
    password: string,
}

export interface payloadInteface {
    payload: string | undefined
}

export interface authSliceInterface {
    status      : 'checking' |'authenticated' | 'not-authenticated',
    user        : AuhtUserObject
    errorMessage: string | undefined
}

export interface AuhtUserObject {
    name            ?:string,
    surname         ?:string,
    email           ?:string,
    celular         ?:string,
    pais            ?:number,
    departamento    ?:number,
    provincia       ?:number,
    distrito        ?:number,
    direccion       ?:string,
    user            ?:string,
    password        ?:string,
    true            ?:boolean
    uid             ?:number
}

// Generated by https://quicktype.io

export interface UpdateAccount {
    success: boolean;
    message: string;
    data:    AuhtUserObject;
}

/* types */
export type Auth = 'auth' | 'no-auth';

/* store typing */

const rootReducer = combineReducers({ 
    auth: authSlice.reducer,
    personas: personasSlice.reducer,
    general: generalSlice.reducer,
    productos: productosSlice.reducer,
    stockHelados: stockHeladosSlice.reducer,
    stockBaterias: stockBateriasSlice.reducer,
    stockBarquillos: stockBarquillosSlice.reducer,
    notaHeladero: notaHeladeroSlice.reducer,
    facturacion: facturacionSlice.reducer,
    moneda: monedaSlice.reducer,
    marca: marcaSlice.reducer,
    configuration: configurationSlice.reducer,
    series: localesSeriesSlice.reducer,
    destacados: destacadoSlice.reducer,
}) 

export type IRootState = ReturnType<typeof rootReducer>;