import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, personasSlice, stockBarquillosSlice, stockBateriasSlice, stockHeladosSlice } from "../store";
import { generalSlice } from "../store/personas/generalSlice";
import { productosSlice } from "../store/productos/productosSlice";
import { notaHeladeroSlice } from "../store/notaHeladeros/notaHeladerosSlice";

/* interfaces */
export interface loginInterface  {
    email: string,
    password: string,
}

export interface payloadInteface {
    payload: string | undefined
}

export interface authSliceInterface {
    status : 'checking' |'authenticated' | 'not-authenticated',
    user : object
    errorMessage: string | undefined
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
    notaHeladero: notaHeladeroSlice.reducer}) 

export type IRootState = ReturnType<typeof rootReducer>;