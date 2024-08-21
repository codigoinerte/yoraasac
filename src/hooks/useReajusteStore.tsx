import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { FormReajusteValues, IRootState, loadReajusteCallback, ReajusteData } from '../interfaces';
import { onStatus,   onReajustesList, onReajustesAddMessage, onReajustesClearMessage, onSetReajustesActive, onReajustesDelete } from '../store'

export const useReajusteStore = () => {
      
    const rutaEndpoint = '/reajuste';

    const { Reajustes, active } = useSelector((state:IRootState)=>state.reajustes);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const geReajuste = async(id:number):Promise<ReajusteData | null> => {
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetReajustesActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            return null;
         }
    }

    const loadReajustes = async (buscar?:string):Promise<loadReajusteCallback> =>{

        dispatch(onStatus(true));
        
        try {        
            const { data } = await backendApi.get(rutaEndpoint, { params:{ buscar } });
            
            dispatch(onStatus(false));
            dispatch(onReajustesList(data)); 
            
            return data.data;

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                dispatch( onReajustesAddMessage(message) );
                setTimeout(() => {
                    dispatch( onReajustesClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return [];
            }
        }
    }

    const saveReajuste = async ( postdata:FormReajusteValues) => {
        dispatch(onStatus(true));

        try {
            
            const { data:info } = await backendApi.post(rutaEndpoint, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetReajustesActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

            return result;

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateReajuste = async (postdata:FormReajusteValues) => {
        dispatch(onStatus(true));
        
        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetReajustesActive({
                ...result                
            }));
            dispatch(onStatus(false));

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    const deleteReajuste = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onReajustesDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }    


    return {
        status, 
        Reajustes, 
        active, 
        errorMessage,

        geReajuste,
        loadReajustes,
        saveReajuste,
        updateReajuste,
        deleteReajuste,
    }
}
