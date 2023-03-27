import { configureStore } from '@reduxjs/toolkit';
import { authSlice, personasSlice } from './';
import { generalSlice } from './personas/generalSlice';
// uiSlice, calendarSlice, 

export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        personas: personasSlice.reducer,
        general: generalSlice.reducer
        // calendar: calendarSlice.reducer,
        // ui:       uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
