import { createSlice } from '@reduxjs/toolkit';
import { intialStateNotaHeladero, NotaHeladero, NotaHeladeros } from '../../interfaces';


const initialState: intialStateNotaHeladero =  {
    status: true,
    Heladeros: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const notaHeladeroSlice = createSlice({
    name: 'notaHeladeros',
    initialState,
    reducers: {
        onSetNotaHeladeroActive : (state, { payload } : { payload: NotaHeladero | null }) =>
        {   
            state.active = payload;
        },
        onNotaHeladeroAdd : (state, { payload }) =>
        {
            state.Heladeros.push(payload);
            state.active = null;
        },
        onNotaHeladeroEdit : (state, { payload }:{ payload:NotaHeladero }) => 
        {
            
            state.Heladeros = state.Heladeros.map((stock)=>{

                if(stock.id == payload.id){
                    return payload;
                }

                return stock;
            });
        },
        onNotaHeladeroDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.Heladeros = state.Heladeros.filter((item)=> item.id != payload );
            }
        },
        onNotaHeladeroList: (state, { payload }:{ payload: NotaHeladeros }) => 
        {
            state.status = false;
            state.Heladeros = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onNotaHeladeroLogout: (state) => 
        {
            state.status = false;
            state.Heladeros = [];
            state.active = null;
        },
        onNotaHeladeroAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onNotaHeladeroClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onNotaHeladeroStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetNotaHeladeroActive,
                onNotaHeladeroAdd,
                onNotaHeladeroEdit,
                onNotaHeladeroDelete,
                onNotaHeladeroList,
                onNotaHeladeroLogout,
                onNotaHeladeroAddMessage,
                onNotaHeladeroClearMessage,
                onNotaHeladeroStatus } = notaHeladeroSlice.actions;