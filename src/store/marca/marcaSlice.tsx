import { createSlice } from '@reduxjs/toolkit';
import { intialStateMarca, Marca, Marcas } from '../../panel/interfaces';


const initialState: intialStateMarca =  {
    status: true,
    marcas: [],
    marca: null,
    errorMessage: undefined
}

export const marcaSlice = createSlice({
    name: 'marca',
    initialState,
    reducers: {
        onSetMarcaActive : (state, { payload } : { payload: Marca | null }) =>
        {   
            state.marca = payload;
        },
        onMarcaAdd : (state, { payload }) =>
        {
            state.marcas.push(payload);
            state.marca = null;
        },
        onMarcaEdit : (state, { payload }:{ payload:Marca }) => 
        {            
            state.marcas = state.marcas.map((marca)=>{

                if(marca.id == payload.id){
                    return payload;
                }

                return marca;
            });
        },
        onMarcaDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.marcas = state.marcas.filter((marca)=> marca.id != payload );
            }
        },
        onMarcaList: (state, { payload }:{ payload: Marcas }) => 
        {
            state.status = false;
            state.marcas = payload.data;

        },
        onMarcaLogout: (state) => 
        {
            state.status = false;
            state.marcas = [];
            state.marca = null;
        },
        onMarcaAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onMarcaClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onMarcaStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetMarcaActive,
                onMarcaAdd,
                onMarcaEdit,
                onMarcaDelete,
                onMarcaList,
                onMarcaLogout,
                onMarcaAddMessage,
                onMarcaClearMessage,
                onMarcaStatus } = marcaSlice.actions;