import axios from 'axios';
import React, { useReducer } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { BuscarPersonas, FormPersonasValues, FormPersonasValuesSave } from '../panel/interfaces';
import { onPersonasAddMessage, onPersonasClearMessage, onSetPersonasActive, onPersonasAdd, onPersonasList, onStatus, onPersonasDelete } from '../store'
import { useDireccion } from './useDireccion';

export const usePersonasStore = () => {
  
    const { loadDireccion } = useDireccion();

    const { productos: personas, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.personas);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadPersonas = async (tipo = 4, pagina = "1", buscar:BuscarPersonas) =>{

        dispatch(onStatus(true));
        
        try {
            
            const {documento, nombres, fechaCreacion } = buscar;            
            const { data } = await backendApi.get(`/persona?tipo=${tipo}&page=${pagina}&documento=${documento??''}&nombres=${nombres??''}&fecha=${fechaCreacion??''}`);

            dispatch(onStatus(false));
            dispatch(onPersonasList(data));            

        } catch (error) {

            if (axios.isAxiosError(error)) {

                const { message } = error.response?.data;               

                dispatch( onPersonasAddMessage(message) );
                setTimeout(() => {
                    dispatch( onPersonasClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return error.message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const savePersona = async ( postdata:FormPersonasValuesSave) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.post(`/persona`, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetPersonasActive({
                ...result,
                password: postdata.password                
            }));

            
            dispatch(onStatus(false));

        } catch (error) {
            // console.log(error);
        }
    }
    
    const updatePersona = async (postdata:FormPersonasValuesSave) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`/persona/${active!.id}`, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetPersonasActive({
                ...result,
                password: postdata.password
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getPersona = async (id:number) => {
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`/persona/${id}`);
            
            dispatch(onSetPersonasActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            return null;
         }
    }

    const deletePersona = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`/persona/${id}`);
                        
            dispatch(onPersonasDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }

    return {
        status, 
        personas, 
        active, 
        errorMessage,
        nextPage,
        prevPage,

        loadPersonas,
        savePersona,
        updatePersona,
        getPersona,
        deletePersona
    }
}
