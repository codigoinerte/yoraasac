import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { FormSeries, SucursalesSeries, } from '../panel/interfaces';
import { onStatus, onMonedaAddMessage, onMonedaClearMessage, onSeriesAdd, onsucursalesAdd, onsucursalesDelete } from '../store'

export const useSeriesStore = () => {

    const rutaEndpoint = '/locales-series';

    const { series, sucursales, sucursal } = useSelector((state:IRootState)=>state.series);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadSeries = async () =>{

        dispatch(onStatus(true));
        
        try {
            
            const { data } = await backendApi.get<SucursalesSeries>(rutaEndpoint);
            
            
            dispatch(onStatus(false));

            dispatch(onSeriesAdd(data.series));
            
            dispatch(onsucursalesAdd(data.sucursales));
            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { data = {} } = error.response ?? {};
                const { message = '' } = data ?? {}

                dispatch( onMonedaAddMessage(message) );
                setTimeout(() => {
                    dispatch( onMonedaClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveSeries = async ( params:FormSeries) => {
        dispatch(onStatus(true));    
        
        try {
            const { data } = await backendApi.post<SucursalesSeries>(`${rutaEndpoint}/1`, { ...params });
            
            dispatch(onSeriesAdd(data.series));

            dispatch(onsucursalesAdd(data.sucursales));
            
            toastMessage({
                data:null,
                message: 'El local y la serie se actualizaron con exito',
                success: true
            });
            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteSeries = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onsucursalesDelete(info.data.id));

            toastMessage({
                data:null,
                message: 'Se elimino la sucursal con exito',
                success: true
            });

            dispatch(onStatus(false));
            
            return true;            

        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    return {
        status, 
        series, 
        sucursales, 
        sucursal,
        errorMessage,

        loadSeries,
        saveSeries,
        deleteSeries,       
    }
}
