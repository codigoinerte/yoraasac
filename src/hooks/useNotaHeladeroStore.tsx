import axios from 'axios';
import React, { useReducer, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState, NotaHeladero } from '../interfaces';
import { FormBuscarNotaHeladeroValues, FormNotaHeladeroValues, NotaHeladeroEstado, ProductosPublicados } from '../panel/interfaces';
import { onStatus, onNotaHeladeroAddMessage, onNotaHeladeroClearMessage, onNotaHeladeroDelete, onNotaHeladeroList, onSetNotaHeladeroActive } from '../store'
import { useHelpers } from './useHelpers';
//import { NotaHeladero } from '../panel/pages/panel/notaHeladero/NotaHeladero';
//import { onNotaHeladeroAddMessage, onNotaHeladeroClearMessage, onNotaHeladeroDelete, onNotaHeladeroList, onSetNotaHeladeroActive } from '../store/notaHeladeros/notaHeladerosSlice';


export const useNotaHeladeroStore = () => {


  
    const rutaEndpoint = '/nota-heladero';

    const { notaHeladero, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.notaHeladero);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadNotaHeladero = async (pagina = "1", buscar:FormBuscarNotaHeladeroValues) =>{

        dispatch(onStatus(true));
        
        try {
            
            const {documento, nombre, estado } = buscar;            
            const { data } = await backendApi.get(rutaEndpoint, {
                params:{
                    page: pagina,
                    documento,
                    nombre,
                    estado
                }
            });
            
            dispatch(onStatus(false));
            dispatch(onNotaHeladeroList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { message } = error.response?.data;               

                dispatch( onNotaHeladeroAddMessage(message) );
                setTimeout(() => {
                    dispatch( onNotaHeladeroClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return error.message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveNotaHeladero = async ( postdata:FormNotaHeladeroValues) => {
        dispatch(onStatus(true));    
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, {
                ...postdata,
                id_sucursal: 1
            });
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetNotaHeladeroActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateNotaHeladero = async (postdata:FormNotaHeladeroValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, { ...postdata,  id_sucursal: 1});
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetNotaHeladeroActive({
                ...result                
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getNotaHeladero = async(id:number):Promise<NotaHeladero|undefined>=>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetNotaHeladeroActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            //return null;
         }
    }

    const deleteNotaHeladero = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onNotaHeladeroDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    } 
    
  
    return {
        status, 
        notaHeladero, 
        active, 
        errorMessage,
        nextPage,
        prevPage,
        

        loadNotaHeladero,
        saveNotaHeladero,
        updateNotaHeladero,
        getNotaHeladero,
        deleteNotaHeladero,
       
    }
}