import { createSlice } from '@reduxjs/toolkit';
import { DataDestacados, intialStateDestacados } from '../../panel/interfaces';

const initialState: intialStateDestacados =  {
    status: true,
    destacados: null,
    errorMessage: undefined
}

export const destacadoSlice = createSlice({
    name: 'destacados',
    initialState,
    reducers: {
        onSetDestacadosActive : (state, { payload } : { payload: DataDestacados | null }) =>
        {   
            state.destacados = payload;
        },
        onDestacadosAdd : (state, { payload }: { payload: DataDestacados}) =>
        {
            state.destacados = payload;
        },
        onDestacadosLogout: (state) => 
        {
            state.status = false;
            state.destacados = null;
        },
        onDestacadosAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onDestacadosClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onDestacadosStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetDestacadosActive ,
                onDestacadosAdd ,
                onDestacadosLogout ,
                onDestacadosAddMessage ,
                onDestacadosClearMessage ,
                onDestacadosStatus } = destacadoSlice.actions;