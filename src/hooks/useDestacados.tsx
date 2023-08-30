import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { DataDestacados, DestacadoForm, Destacados } from '../panel/interfaces';
import { onStatus, onMonedaAddMessage, onMonedaClearMessage, onDestacadosAdd } from '../store';

export const useDestacados = () => {

    const rutaEndpoint = '/destacados';

    const { destacados } = useSelector((state:IRootState)=>state.destacados);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadDestacados = async ():Promise<DataDestacados> =>{

        dispatch(onStatus(true));
        
        try {
            
            const { data } = await backendApi.get<Destacados>(rutaEndpoint);          
            
            dispatch(onStatus(false));
            dispatch(onDestacadosAdd(data.data));    
            
            return {
                menu: data.data.menu,
                destacado: data.data.destacado
            };

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};


                dispatch( onMonedaAddMessage(message) );
                setTimeout(() => {
                    dispatch( onMonedaClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;

            } else {
                console.log('unexpected error: ', error);
                return {};
            }
        }
    }

    const saveDestacados = async ( params:DestacadoForm) => {
        dispatch(onStatus(true));    
        
        try {
            const { data:info } = await backendApi.post<Destacados>(rutaEndpoint, { ...params });
            const { data, success = false } = info;
            toastMessage(info);
            dispatch(onDestacadosAdd(data));
            dispatch(onStatus(success));

        } catch (error) {
            console.log(error);
        }
    }
    
    
    return {
        status, 
        destacados,
        errorMessage,

        loadDestacados,
        saveDestacados,
       
    }
}
