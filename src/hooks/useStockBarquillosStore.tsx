import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { FormBuscarStockBarquilloValues, FormStockBarquilloValues } from '../panel/interfaces';
import { onStatus, onStockBarquilloList, onSetStockBarquilloActive, onStockBarquilloDelete, onStockBarquilloAddMessage, onStockBarquilloClearMessage } from '../store'


export const useStockBarquillosStore = () => {
  
    const rutaEndpoint = '/stock-barquillos';

    const { StockBarquillo, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.stockBarquillos);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadStockBarquillo = async (pagina = "1", buscar:FormBuscarStockBarquilloValues) =>{

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
            dispatch(onStockBarquilloList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                dispatch( onStockBarquilloAddMessage(message) );
                setTimeout(() => {
                    dispatch( onStockBarquilloClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveStockBarquillo = async ( postdata:FormStockBarquilloValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.post(rutaEndpoint, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetStockBarquilloActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateStockBarquillo = async (postdata:FormStockBarquilloValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetStockBarquilloActive({
                ...result                
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getStockBarquillo = async (id:number) => {
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetStockBarquilloActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            return null;
         }
    }

    const deleteStockBarquillo = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onStockBarquilloDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }    

    return {
        status, 
        StockBarquillo, 
        active, 
        errorMessage,
        nextPage,
        prevPage,

        loadStockBarquillo,
        saveStockBarquillo,
        updateStockBarquillo,
        getStockBarquillo,
        deleteStockBarquillo,
    }
}
