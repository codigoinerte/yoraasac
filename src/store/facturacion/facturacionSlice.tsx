import { createSlice } from '@reduxjs/toolkit';
import { intialStateFacturas, Facturas, Facturaciones } from '../../interfaces';


const initialState: intialStateFacturas =  {
    status: true,
    facturas: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const facturacionSlice = createSlice({
    name: 'facturacion',
    initialState,
    reducers: {
        onSetFacturacionActive : (state, { payload } : { payload: Facturas | null }) =>
        {   
            state.active = payload;
        },
        onFacturacionAdd : (state, { payload }) =>
        {
            state.facturas.push(payload);
            state.active = null;
        },
        onFacturacionEdit : (state, { payload }:{ payload:Facturas }) => 
        {
            
            state.facturas = state.facturas.map((stock)=>{

                if(stock.id == payload.id){
                    return payload;
                }

                return stock;
            });
        },
        onFacturacionDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.facturas = state.facturas.filter((factura)=> factura.id != payload );
            }
        },
        onFacturacionList: (state, { payload }:{ payload: Facturaciones }) => 
        {
            state.status = false;
            state.facturas = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onFacturacionLogout: (state) => 
        {
            state.status = false;
            state.facturas = [];
            state.active = null;
        },
        onFacturacionAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onFacturacionClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onFacturacionStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetFacturacionActive,
                onFacturacionAdd,
                onFacturacionEdit,
                onFacturacionDelete,
                onFacturacionList,
                onFacturacionLogout,
                onFacturacionAddMessage,
                onFacturacionClearMessage,
                onFacturacionStatus } = facturacionSlice.actions;