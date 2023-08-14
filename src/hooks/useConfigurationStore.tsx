import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { Configurations } from '../panel/interfaces';
import { onConfigAdd, onConfigAddMessage, onConfigClearMessage, onConfigDelete, onSetConfigActive, onStatus,  } from '../store'
import { formConfiguracion } from '../panel/interfaces/interfaces';

export const useConfiguration = () => {

    const rutaEndpoint = '/configuracion';

    const { configuration, contacts } = useSelector((state:IRootState)=>state.configuration);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadConfiguration = async () =>{

        dispatch(onStatus(true));
        
        try {
            
            const { data } = await backendApi.get<Configurations>(rutaEndpoint);
            
            dispatch(onStatus(false));
            dispatch(onSetConfigActive(data.data)); 

            data.data.contactos.map((contact)=>{
                dispatch(onConfigAdd(contact)); 
            })
            
            return data.data

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                //const { message = '' } = error.response.data ?? {};

                dispatch( onConfigAddMessage(message) );
                setTimeout(() => {
                    dispatch( onConfigClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const mainSystem = 1;

    const saveConfiguration = async ( params:formConfiguracion) => {
        dispatch(onStatus(true));    
        
        try {
            const { data } = await backendApi.put<Configurations>(`${rutaEndpoint}/${mainSystem}`, { ...params });
            
            dispatch(onStatus(false));
            dispatch(onSetConfigActive(data.data)); 

            data.data.contactos.map((contact)=>{
                dispatch(onConfigAdd(contact)); 
            });

            toastMessage({
                data: null,
                message:'Se actualizo exitosamente',
                success: true,
            });
            
            return data.data

        } catch (error) {
            console.log(error);
        }
    }

    const deleteContacts = async (id:number):Promise<Boolean> =>{
        
        try {            

            await backendApi.delete(`/contacto/${id}`);
                        
            dispatch(onConfigDelete(id));

            dispatch(onStatus(false));

            toastMessage({
                data: null,
                message:'Se Elimino exitosamente',
                success: true,
            });
            
            return true;            

        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    return {
        status, 
        configuration,
        contacts,
        errorMessage,        

        loadConfiguration,
        saveConfiguration,
        deleteContacts
       
    }
}
