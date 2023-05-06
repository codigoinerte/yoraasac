import { createSlice } from '@reduxjs/toolkit';
import { StockBarquillos , StockBarquillo, intialStateStockBarquillos } from '../../interfaces';


const initialState: intialStateStockBarquillos =  {
    status: true,
    StockBarquillo: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const stockBarquillosSlice = createSlice({
    name: 'stockBarquillos',
    initialState,
    reducers: {
        onSetStockBarquilloActive : (state, { payload } : { payload: StockBarquillo | null }) =>
        {   
            state.active = payload;
        },
        onStockBarquilloAdd : (state, { payload }) =>
        {
            state.StockBarquillo.push(payload);
            state.active = null;
        },
        onStockBarquilloEdit : (state, { payload }:{ payload:StockBarquillo }) => 
        {
            
            state.StockBarquillo = state.StockBarquillo.map((stock)=>{

                if(stock.id == payload.id){
                    return payload;
                }

                return stock;
            });
        },
        onStockBarquilloDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.StockBarquillo = state.StockBarquillo.filter((stock)=> stock.id != payload );
            }
        },
        onStockBarquilloList: (state, { payload }:{ payload: StockBarquillos }) => 
        {
            state.status = false;
            state.StockBarquillo = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onStockBarquilloLogout: (state) => 
        {
            state.status = false;
            state.StockBarquillo = [];
            state.active = null;
        },
        onStockBarquilloAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onStockBarquilloClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onStockBarquilloStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetStockBarquilloActive,
                onStockBarquilloAdd,
                onStockBarquilloEdit,
                onStockBarquilloDelete,
                onStockBarquilloList,
                onStockBarquilloLogout,
                onStockBarquilloAddMessage,
                onStockBarquilloClearMessage,
                onStockBarquilloStatus } = stockBarquillosSlice.actions;