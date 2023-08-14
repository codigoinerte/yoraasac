import { createSlice } from '@reduxjs/toolkit';
import { Configuration, ContactoConfig, intialStateConfiguration } from '../../panel/interfaces';

const initialState: intialStateConfiguration =  {
    status: true,
    configuration: null,
    contacts: [],
    errorMessage: undefined
}

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        onSetConfigActive : (state, { payload } : { payload: Configuration | null }) =>
        {   
            state.configuration = payload;
        },
        onConfigAdd : (state, { payload }: { payload: ContactoConfig | null}) =>
        {
            if(payload !== null) state.contacts.push(payload);
        },
        onConfigEdit : (state, { payload }:{ payload:ContactoConfig }) => 
        {            
            state.contacts = state.contacts.map((contact)=>{

                if(contact.id == payload.id){
                    return payload;
                }

                return contact;
            });
        },
        onConfigDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.contacts = state.contacts.filter((contact)=> contact.id != payload );
            }
        },
        onConfigLogout: (state) => 
        {
            state.status = false;
            state.contacts = [];
            state.configuration = null;
        },
        onConfigAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onConfigClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onConfigStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetConfigActive ,
                onConfigAdd ,
                onConfigEdit ,
                onConfigDelete ,
                onConfigLogout ,
                onConfigAddMessage ,
                onConfigClearMessage ,
                onConfigStatus } = configurationSlice.actions;