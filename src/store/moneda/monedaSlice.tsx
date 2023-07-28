import { createSlice } from '@reduxjs/toolkit';
import { intialStateNotaHeladero, NotaHeladero, NotaHeladeros } from '../../interfaces';
import { intialStateMoneda, Moneda, Monedas } from '../../panel/interfaces';


const initialState: intialStateMoneda =  {
    status: true,
    monedas: [],
    moneda: null,
    errorMessage: undefined
}

export const monedaSlice = createSlice({
    name: 'moneda',
    initialState,
    reducers: {
        onSetMonedaActive : (state, { payload } : { payload: Moneda | null }) =>
        {   
            state.moneda = payload;
        },
        onMonedaAdd : (state, { payload }) =>
        {
            state.monedas.push(payload);
            state.moneda = null;
        },
        onMonedaEdit : (state, { payload }:{ payload:Moneda }) => 
        {            
            state.monedas = state.monedas.map((stock)=>{

                if(stock.id == payload.id){
                    return payload;
                }

                return stock;
            });
        },
        onMonedaDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.monedas = state.monedas.filter((stock)=> stock.id != payload );
            }
        },
        onMonedaList: (state, { payload }:{ payload: Monedas }) => 
        {
            state.status = false;
            state.monedas = payload.data;

        },
        onMonedaLogout: (state) => 
        {
            state.status = false;
            state.monedas = [];
            state.moneda = null;
        },
        onMonedaAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onMonedaClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onMonedaStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetMonedaActive,
                onMonedaAdd,
                onMonedaEdit,
                onMonedaDelete,
                onMonedaList,
                onMonedaLogout,
                onMonedaAddMessage,
                onMonedaClearMessage,
                onMonedaStatus } = monedaSlice.actions;