import { createSlice } from '@reduxjs/toolkit';
import { intialStatePersonas, Persona, Personas } from '../../interfaces';

const initialState =  {
    status: true,
    errorMessage: undefined
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {       
        onAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onAddMessage,
                onClearMessage,
                onStatus } = generalSlice.actions;