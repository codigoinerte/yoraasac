import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage, uploadImage } from '../helpers';
import { IRootState } from '../interfaces';
import { BuscarPersonas, FormPersonasValuesSave, deleImagenPersona } from '../panel/interfaces';
import { onPersonasAddMessage, onPersonasClearMessage, onSetPersonasActive, onPersonasList, onStatus, onPersonasDelete } from '../store'
export const usePersonasStore = () => {
  
    
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

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                dispatch( onPersonasAddMessage(message) );
                setTimeout(() => {
                    dispatch( onPersonasClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;

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
        
        let array: (FileList | undefined)[] = [];
        

        let url_frontal = postdata.foto_frontal ?? '';
        let url_posterior = postdata.foto_posterior ?? '';
        
        if(postdata.img_frontal && postdata.img_frontal.length > 0) array.push(postdata.img_frontal);
        if(postdata.img_posterior && postdata.img_posterior.length > 0) array.push(postdata.img_posterior);
        
        try {

            const respuesta = await uploadImage(array); 
            
            const respuesta_frontal = respuesta[0]??'';
            const respuesta_posterior = respuesta[1]??'';
            
            if(respuesta.length > 0)
            {
                if(postdata.img_frontal?.length && !postdata.img_posterior?.length){
                    url_frontal = respuesta_frontal;
                }else if(!postdata.img_frontal?.length && postdata.img_posterior?.length){
                    url_posterior = respuesta_frontal;
                }else{
                    url_frontal = respuesta_frontal;
                    url_posterior = respuesta_posterior;
                }
            }

            let params = {
                ...postdata
            };

            if(url_frontal != '') params.foto_frontal = url_frontal;
            if(url_posterior != '') params.foto_posterior = url_posterior;

            const { data:info } = await backendApi.put(`/persona/${active!.id}`, params);

            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetPersonasActive({
                ...result,
                foto_frontal: result.foto_frontal,
                foto_posterior: result.foto_posterior,
                password: postdata.password
            }));

            dispatch(onStatus(false));

            return result;

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

    const deleteImagenPersona = async (params:deleImagenPersona) => {

        try {
            const { data:info } = await backendApi.post(`/eliminar-foto-persona/${params.id}`,{
                ...params,

            });

            const result = info.data;

            toastMessage(info);
            
            dispatch(onSetPersonasActive(result));

            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
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
        deletePersona,
        deleteImagenPersona
    }
}
