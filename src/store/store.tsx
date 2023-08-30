import { configureStore } from '@reduxjs/toolkit';
import { authSlice, personasSlice, stockBarquillosSlice, stockBateriasSlice, stockHeladosSlice, notaHeladeroSlice, marcaSlice, destacadoSlice } from './';
import { generalSlice } from './personas/generalSlice';
import { productosSlice } from './productos/productosSlice';
import { facturacionSlice } from './facturacion/facturacionSlice';
import { monedaSlice } from './moneda/monedaSlice';
import { configurationSlice } from './configuration/configurationSlice';
import { localesSeriesSlice } from './configuration/localesSeriesSlice';

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
        notaHeladero: notaHeladeroSlice.reducer,
        facturacion: facturacionSlice.reducer,
        moneda: monedaSlice.reducer,
        marca: marcaSlice.reducer,
        configuration: configurationSlice.reducer,
        series: localesSeriesSlice.reducer,
        destacados: destacadoSlice.reducer,
        // calendar: calendarSlice.reducer,
        // ui:       uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
