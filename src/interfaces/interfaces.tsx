import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, personasSlice } from "../store";
import { generalSlice } from "../store/personas/generalSlice";

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
    general: generalSlice.reducer
 }) 

export type IRootState = ReturnType<typeof rootReducer>;