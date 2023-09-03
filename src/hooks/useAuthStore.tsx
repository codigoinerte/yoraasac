import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { backendApi } from '../api';
import { AuhtUserObject, IRootState, UpdateAccount, loginInterface } from '../interfaces';
import { clearErrorMessage, onChecking, onLogin, onLogout, onSetUserInfo } from '../store';
import { toastMessage } from '../helpers';
// onLogoutCalendar

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( (state:IRootState) => state.auth );

    const dispatch = useDispatch();

    const startLogin = async({ email, password }: loginInterface) => {
        dispatch( onChecking() );
        
        try {
            const { data } = await backendApi.post('/login',{ email, password });
            
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            dispatch( onLogin({ 
                ...data,
                name: data.name, 
                uid: data.uid
            }) );          
                    
        } catch (error) {

            if (axios.isAxiosError(error)) {
                
                const { response = null } = error;
                let message;
                if(response == null){

                    message = error.message;

                }else{

                    message = response.data.message;
                }
                
                dispatch( onLogout(message) );
                setTimeout(() => {
                    dispatch( clearErrorMessage() );
                }, 10);

                return error.message;

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }

            
        }
    }
    
    const checkAuthToken = async() => {

        //verificar tiempo del token almacenado

        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );
        
        try {
            const { data } = await backendApi.post('renew-token', {
                token
            });

            
                        
            // localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            dispatch( onLogin({ 
                ...data,
                name: data.name, 
                uid: data.uid 
            }) );

        } catch (error) {
            
            localStorage.clear();
            dispatch( onLogout() );
        }
    }
        
    const startLogout = async () => {
        
        // dispatch( onLogoutCalendar() );

        const token = localStorage.getItem('token');

        if(token)
        {
            await backendApi.post('logout',{
                token
            });
        }

        localStorage.clear();
        dispatch( onLogout() );
    }

    const updateAccount = async (params:AuhtUserObject):Promise<AuhtUserObject> =>{
        
        try {
            
            const { data } = await backendApi.put<UpdateAccount>('account-update',{ ...params });
                    
            toastMessage(data);
            dispatch( onSetUserInfo(params) );          

            return { ...data.data }
                    
        } catch (error) {

            if (axios.isAxiosError(error)) {
                
                const { response = null } = error;
                let message;
                if(response == null){

                    message = error.message;

                }else{

                    message = response.data.message;
                }
                
                toastMessage({
                    data: [],
                    message,
                    success: false
                });

                setTimeout(() => {
                    dispatch( clearErrorMessage() );
                }, 10);

                return {};

            } else {
                console.log('unexpected error: ', error);
                return {};
            }

            
        }
    }
    
    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        updateAccount
        // startRegister,
    }

}
