import { createSlice } from '@reduxjs/toolkit';
import { intialStatePersonas, Persona, Personas } from '../../interfaces';

const initialState: intialStatePersonas =  {
    status: true,
    productos: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const personasSlice = createSlice({
    name: 'personas',
    initialState,
    reducers: {
        onSetPersonasActive : (state, { payload } : { payload: Persona | null }) =>
        {   
            state.active = payload;
        },
        onPersonasAdd : (state, { payload }) =>
        {
            state.productos.push(payload);
            state.active = null;
        },
        onPersonasEdit : (state, { payload }:{ payload:Persona}) => 
        {
            
            state.productos = state.productos.map((persona)=>{

                if(persona.id == payload.id){
                    return payload;
                }

                return persona;
            });
        },
        onPersonasDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.productos = state.productos.filter((persona)=> persona.id != payload );
            }
        },
        onPersonasList: (state, { payload }:{ payload: Personas }) => 
        {
            state.status = false;
            state.productos = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onPersonasLogout: (state) => 
        {
            state.status = false;
            state.productos = [];
            state.active = null;
        },
        onPersonasAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onPersonasClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onPersonasStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetPersonasActive,
                onPersonasAdd,
                onPersonasEdit,
                onPersonasDelete,
                onPersonasList,
                onPersonasLogout,
                onPersonasAddMessage,
                onPersonasClearMessage,
                onPersonasStatus } = personasSlice.actions;