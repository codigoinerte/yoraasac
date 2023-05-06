import { configureStore } from '@reduxjs/toolkit';
import { authSlice, personasSlice, stockBarquillosSlice, stockBateriasSlice, stockHeladosSlice } from './';
import { generalSlice } from './personas/generalSlice';
import { productosSlice } from './productos/productosSlice';
// uiSlice, calendarSlice, 

export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        personas: personasSlice.reducer,
        general: generalSlice.reducer,
        productos: productosSlice.reducer,
        stockHelados: stockHeladosSlice.reducer,
        stockBaterias: stockBateriasSlice.reducer,
        stockBarquillos: stockBarquillosSlice.reducer,
        
        // calendar: calendarSlice.reducer,
        // ui:       uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
