import { createSlice } from '@reduxjs/toolkit';
import { payloadInteface, authSliceInterface } from '../../interfaces/interfaces';

const initialState: authSliceInterface =  {
    status: 'checking', // 'authenticated','not-authenticated',
    user: {},
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user   = {};
            state.errorMessage = undefined;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload  } : payloadInteface ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        },
        onSetUserInfo: ( state, { payload } ) => {
            
            state.user = payload;
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onSetUserInfo, clearErrorMessage } = authSlice.actions;