import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { FormBuscarStockBateriaValues, FormStockBateriaValues } from '../panel/interfaces';
import { onStatus, onStockBateriaList, onSetStockBateriaActive, onStockBateriaDelete, onStockBateriaAddMessage, onStockBateriaClearMessage } from '../store'

export const useStockBateriasStore = () => {
  
    const rutaEndpoint = '/stock-bateria';

    const { StockBateria, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.stockBaterias);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadStockBateria = async (pagina = "1", buscar:FormBuscarStockBateriaValues) =>{

        dispatch(onStatus(true));
        
        try {
            
            const {codigo, movimiento, fechaCreacion } = buscar;            
            const { data } = await backendApi.get(rutaEndpoint, {
                params:{
                    page: pagina,
                    codigo,
                    movimiento,
                    fecha: fechaCreacion
                }
            });
            
            dispatch(onStatus(false));
            dispatch(onStockBateriaList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                dispatch( onStockBateriaAddMessage(message) );
                setTimeout(() => {
                    dispatch( onStockBateriaClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveStockBateria = async ( postdata:FormStockBateriaValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.post(rutaEndpoint, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetStockBateriaActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateStockBateria = async (postdata:FormStockBateriaValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetStockBateriaActive({
                ...result                
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getStockBateria = async (id:number) => {
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetStockBateriaActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            return null;
         }
    }

    const deleteStockBateria = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onStockBateriaDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }    

    return {
        status, 
        StockBateria, 
        active, 
        errorMessage,
        nextPage,
        prevPage,

        loadStockBateria,
        saveStockBateria,
        updateStockBateria,
        getStockBateria,
        deleteStockBateria,
    }
}
