import { createSlice } from '@reduxjs/toolkit';
import { StockHelados, StockHelado, intialStateStockHelado } from '../../interfaces';


const initialState: intialStateStockHelado =  {
    status: true,
    StockHelado: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const stockHeladosSlice = createSlice({
    name: 'stockHelados',
    initialState,
    reducers: {
        onSetStockHeladoActive : (state, { payload } : { payload: StockHelado | null }) =>
        {   
            state.active = payload;
        },
        onStockHeladoAdd : (state, { payload }) =>
        {
            state.StockHelado.push(payload);
            state.active = null;
        },
        onStockHeladoEdit : (state, { payload }:{ payload:StockHelado }) => 
        {
            
            state.StockHelado = state.StockHelado.map((stock)=>{

                if(stock.id == payload.id){
                    return payload;
                }

                return stock;
            });
        },
        onStockHeladoDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.StockHelado = state.StockHelado.filter((stock)=> stock.id != payload );
            }
        },
        onStockHeladoList: (state, { payload }:{ payload: StockHelados }) => 
        {
            state.status = false;
            state.StockHelado = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onStockHeladoLogout: (state) => 
        {
            state.status = false;
            state.StockHelado = [];
            state.active = null;
        },
        onStockHeladoAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onStockHeladoClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onStockHeladoStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetStockHeladoActive,
                onStockHeladoAdd,
                onStockHeladoEdit,
                onStockHeladoDelete,
                onStockHeladoList,
                onStockHeladoLogout,
                onStockHeladoAddMessage,
                onStockHeladoClearMessage,
                onStockHeladoStatus } = stockHeladosSlice.actions;