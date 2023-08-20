import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { FormSeries, SucursalesSeries, SucursalesUpdatedResponse, } from '../panel/interfaces';
import { onStatus, onMonedaAddMessage, onMonedaClearMessage, onSeriesAdd, onsucursalesAdd, onsucursalesDelete } from '../store'
import { Sucursal, SucursalesSeriesResponse } from '../panel/interfaces/interfaces';

export const useSeriesStore = () => {

    const rutaEndpoint = '/locales-series';

    const { series, sucursales, sucursal } = useSelector((state:IRootState)=>state.series);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadSeries = async ():Promise<SucursalesSeriesResponse> =>{

        dispatch(onStatus(true));
        
        try {
            
            const { data } = await backendApi.get<SucursalesSeries>(rutaEndpoint);
            
            
            dispatch(onStatus(false));

            dispatch(onSeriesAdd(data.series));
            
            dispatch(onsucursalesAdd(data.sucursales));
            
            return {
                sucursales: data.sucursales ?? [],
                series: data.series ?? []
            };

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { data = {} } = error.response ?? {};
                const { message = '' } = data ?? {}

                dispatch( onMonedaAddMessage(message) );
                setTimeout(() => {
                    dispatch( onMonedaClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return {
                    sucursales: [],
                    series: []
                };

            } else {
                console.log('unexpected error: ', error);               
                return {
                    sucursales: [],
                    series: []
                };
            }
        }
        
    }

    const saveSeries = async ( params:FormSeries):Promise<SucursalesSeriesResponse> => {

        dispatch(onStatus(true));    
        
        try {
            const { data } = await backendApi.put<SucursalesUpdatedResponse>(`${rutaEndpoint}/1`, { ...params });
            
            const { sucursales = [], series = [] } = data.data;
            
            dispatch(onSeriesAdd(series));
            dispatch(onsucursalesAdd(sucursales));
            
            toastMessage({
                data:null,
                message: data.message ?? 'El local y la serie se actualizaron con exito',
                success: true
            });
            
            dispatch(onStatus(false));

            

            return {
                series:series,
                sucursales:sucursales
            }

        } catch (error) {
            console.log(error);
            return {
                series:series,
                sucursales:sucursales
            }
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
