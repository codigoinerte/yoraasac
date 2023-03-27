import { createSlice } from '@reduxjs/toolkit';
import { intialStatePersonas, Persona, Personas } from '../../interfaces';
import { FormPersonasValues } from '../../panel/interfaces';

const initialState: intialStatePersonas =  {
    status: true,
    personas: [],
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
            state.personas.push(payload);
            state.active = null;
        },
        onPersonasEdit : (state, { payload }:{ payload:Persona}) => 
        {
            
            state.personas = state.personas.map((persona)=>{

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
    
                state.personas = state.personas.filter((persona)=> persona.id != payload );
            }
        },
        onPersonasList: (state, { payload }:{ payload: Personas }) => 
        {
            state.status = false;
            state.personas = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onPersonasLogout: (state) => 
        {
            state.status = false;
            state.personas = [];
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