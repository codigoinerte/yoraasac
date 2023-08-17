import { createSlice } from '@reduxjs/toolkit';
import { Serie, Sucursal, intialStateLocalesSeries } from '../../panel/interfaces';

const initialState: intialStateLocalesSeries =  {
    status: true,
    sucursal: null,
    sucursales: [],
    series: [],
    errorMessage: undefined
}

export const localesSeriesSlice = createSlice({
    name: 'localesSeriesSlice',
    initialState,
    reducers: {

        onSeriesAdd : (state, { payload } : { payload: Serie[] }) =>
        {   
            state.series = payload ;
        },
        onSetsucursalesActive : (state, { payload } : { payload: Sucursal | null }) =>
        {   
            state.sucursal = payload ;
        },
        onsucursalesAdd : (state, { payload }: { payload: Sucursal[]}) =>
        {
            state.sucursales = payload;
        },
        onsucursalesEdit : (state, { payload }:{ payload:Sucursal }) => 
        {            
            state.sucursales = state.sucursales.map((sucursal)=>{

                if(sucursal.id == payload.id){
                    return payload;
                }

                return sucursal;
            });
        },
        onsucursalesDelete: (state, { payload }) => 
        {
            if(payload)
            {
                state.status = true;
    
                state.sucursales = state.sucursales.filter((sucursal)=> sucursal.id != payload );
            }
        },
        onsucursalesLogout: (state) => 
        {
            state.status = false;
            state.sucursal = null;
            state.sucursales = [];
            state.series =  [];
        },
        onsucursalesAddMessage : (state, { payload })=>
        {
            state.errorMessage = payload;
        },
        onsucursalesClearMessage : (state) =>
        {
            state.errorMessage = undefined;
        },
        onsucursalesStatus:(state, {payload}:{payload:boolean}) =>{            
            state.status = payload;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {  
    onSeriesAdd ,
    onSetsucursalesActive ,
    onsucursalesAdd ,
    onsucursalesEdit ,
    onsucursalesDelete ,
    onsucursalesLogout ,
    onsucursalesAddMessage ,
    onsucursalesClearMessage ,
    onsucursalesStatus ,
} = localesSeriesSlice.actions;