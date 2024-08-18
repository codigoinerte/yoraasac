import { createSlice } from '@reduxjs/toolkit';
import { intialStateReajuste, ReajusteData, Reajustes } from '../../interfaces';


const initialState: intialStateReajuste =  {
    status: true,
    Reajustes: [],
    active: null,
    errorMessage: undefined
}

export const stockReajustesSlice = createSlice({
    name: 'reajustes',
    initialState,
    reducers: {
        onSetReajustesActive : (state, { payload } : { payload: ReajusteData }) =>
        {   
            state.active = payload;
        },
        onReajustesAdd : (state, { payload }) =>
        {
            state.Reajustes.push(payload);
            state.active = null;
        },
        onReajustesEdit : (state, { payload }:{ payload:ReajusteData }) => 
        {
            
            state.Reajustes = state.Reajustes.map((item)=>{

                if(item.id == payload.id){
                    return payload;
                }

                return item;
            });
        },
        onReajustesDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.Reajustes = state.Reajustes.filter((stock)=> stock.id != payload );
            }
        },
        onReajustesList: (state, { payload }:{ payload: Reajustes }) => 
        {
            state.status = false;
            state.Reajustes = payload.data;

        },
        onReajustesLogout: (state) => 
        {
            state.status = false;
            state.Reajustes = [];
            state.active = null;
        },
        onReajustesAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onReajustesClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onReajustesStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetReajustesActive,
                onReajustesAdd,
                onReajustesEdit,
                onReajustesDelete,
                onReajustesList,
                onReajustesLogout,
                onReajustesAddMessage,
                onReajustesClearMessage,
                onReajustesStatus } = stockReajustesSlice.actions;