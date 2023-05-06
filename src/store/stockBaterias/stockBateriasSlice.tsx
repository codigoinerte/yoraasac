import { createSlice } from '@reduxjs/toolkit';
import { StockBaterias , StockBateria, intialStateStockBateria } from '../../interfaces';


const initialState: intialStateStockBateria =  {
    status: true,
    StockBateria: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const stockBateriasSlice = createSlice({
    name: 'stockBaterias',
    initialState,
    reducers: {
        onSetStockBateriaActive : (state, { payload } : { payload: StockBateria | null }) =>
        {   
            state.active = payload;
        },
        onStockBateriaAdd : (state, { payload }) =>
        {
            state.StockBateria.push(payload);
            state.active = null;
        },
        onStockBateriaEdit : (state, { payload }:{ payload:StockBateria }) => 
        {
            
            state.StockBateria = state.StockBateria.map((stock)=>{

                if(stock.id == payload.id){
                    return payload;
                }

                return stock;
            });
        },
        onStockBateriaDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.StockBateria = state.StockBateria.filter((stock)=> stock.id != payload );
            }
        },
        onStockBateriaList: (state, { payload }:{ payload: StockBaterias }) => 
        {
            state.status = false;
            state.StockBateria = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onStockBateriaLogout: (state) => 
        {
            state.status = false;
            state.StockBateria = [];
            state.active = null;
        },
        onStockBateriaAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onStockBateriaClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onStockBateriaStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetStockBateriaActive,
                onStockBateriaAdd,
                onStockBateriaEdit,
                onStockBateriaDelete,
                onStockBateriaList,
                onStockBateriaLogout,
                onStockBateriaAddMessage,
                onStockBateriaClearMessage,
                onStockBateriaStatus } = stockBateriasSlice.actions;