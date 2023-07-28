import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { Monedas, formMoneda, listaDetalle } from '../panel/interfaces';
import { onStatus, onMonedaList, onMonedaAddMessage, onMonedaClearMessage, onSetMonedaActive, onMonedaDelete } from '../store'
import { useState } from 'react';

export const useMoneda = () => {

    const rutaEndpoint = '/moneda';

    const [detalle, setDetalle] = useState<listaDetalle[]>([]);

    const { monedas, moneda } = useSelector((state:IRootState)=>state.moneda);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadMoneda = async () =>{

        dispatch(onStatus(true));
        
        try {
            
            const { data } = await backendApi.get<Monedas>(rutaEndpoint);
            
            setDetalle(data.data.map((moneda, i)=>({
                id: (moneda.id).toString(),
                campos:[
                    (i+1).toString(),
                    moneda.moneda,
                    moneda.codigo,
                    moneda.simbolo,
                    (moneda.principal) ? 'si' : 'no',
                ]
            })));
    
            
            dispatch(onStatus(false));
            dispatch(onMonedaList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { message } = error.response?.data;               

                dispatch( onMonedaAddMessage(message) );
                setTimeout(() => {
                    dispatch( onMonedaClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return error.message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveMoneda = async ( params:formMoneda) => {
        dispatch(onStatus(true));    
        
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, { ...params });
            
            const result = info.data;            

            toastMessage(info);
            
            dispatch(onSetMonedaActive(null));

            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateMoneda = async (params:formMoneda) => {
        dispatch(onStatus(true));
        
        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${moneda!.id}`, { ...params});
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetMonedaActive(null));

            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getMoneda = async(id:number)=>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetMonedaActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            console.log(error);
         }
    }

    const deleteMoneda = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onMonedaDelete(info.data.id));

            dispatch(onStatus(false));
            
            return true;            

        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    return {
        status, 
        monedas, 
        moneda, 
        errorMessage,
        detalle,

        loadMoneda,
        saveMoneda,
        updateMoneda,
        getMoneda,
        deleteMoneda,
       
    }
}
