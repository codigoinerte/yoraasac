import { createSlice } from '@reduxjs/toolkit';
import { intialStateProductos, Productos, Producto } from '../../interfaces';


const initialState: intialStateProductos =  {
    status: true,
    productos: [],
    nextPage: null,
    prevPage: null,
    active: null,
    errorMessage: undefined
}

export const productosSlice = createSlice({
    name: 'productos',
    initialState,
    reducers: {
        onSetProductosActive : (state, { payload } : { payload: Producto | null }) =>
        {   
            state.active = payload;
        },
        onProductosAdd : (state, { payload }) =>
        {
            state.productos.push(payload);
            state.active = null;
        },
        onProductosEdit : (state, { payload }:{ payload:Producto }) => 
        {
            
            state.productos = state.productos.map((persona)=>{

                if(persona.id == payload.id){
                    return payload;
                }

                return persona;
            });
        },
        onProductosDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.productos = state.productos.filter((producto)=> producto.id != payload );
            }
        },
        onProductosList: (state, { payload }:{ payload: Productos }) => 
        {
            state.status = false;
            state.productos = payload.data;
            state.nextPage = payload.next_page;
            state.prevPage = payload.previous_page;

        },
        onProductosLogout: (state) => 
        {
            state.status = false;
            state.productos = [];
            state.active = null;
        },
        onProductosAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onProductosClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onProductosStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  onSetProductosActive,
                onProductosAdd,
                onProductosEdit,
                onProductosDelete,
                onProductosList,
                onProductosLogout,
                onProductosAddMessage,
                onProductosClearMessage,
                onProductosStatus } = productosSlice.actions;