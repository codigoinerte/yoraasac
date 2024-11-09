import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage, uploadImage } from '../helpers';
import { IRootState } from '../interfaces';
import { FormBuscarStockHeladoValues, FormStockHeladoValues } from '../panel/interfaces';
import { onStatus, onStockHeladoList, onSetStockHeladoActive, onStockHeladoDelete, onStockHeladoAddMessage, onStockHeladoClearMessage } from '../store'


export const useStockHeladosStore = () => {
  
    const rutaEndpoint = '/stock-helado';

    const { StockHelado, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.stockHelados);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadStockHelado = async (pagina = "1", buscar:FormBuscarStockHeladoValues) =>{

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
            dispatch(onStockHeladoList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                dispatch( onStockHeladoAddMessage(message) );
                setTimeout(() => {
                    dispatch( onStockHeladoClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveStockHelado = async ( postdata:FormStockHeladoValues) => {
        dispatch(onStatus(true));

        try {
            
            /* subir imagen */
            let array: (FileList | undefined)[] = [];
            let url_frontal = postdata.image_file ?? '';
            if(postdata.image_input && postdata.image_input.length > 0) array.push(postdata.image_input);        
            const respuesta = await uploadImage(array);             
            postdata.image_file = respuesta[0]??url_frontal;
            /* subir imagen */

            const { data:info } = await backendApi.post(rutaEndpoint, postdata);
            const result = info.data;
            
            //toastMessage(info);
            
            dispatch(onSetStockHeladoActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

            return {...result, message: info.message ?? ''};

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateStockHelado = async (postdata:FormStockHeladoValues) => {
        dispatch(onStatus(true));
        
        try {

            /* subir imagen */
            let array: (FileList | undefined)[] = [];
            let url_frontal = postdata.image_file ?? '';
            if(postdata.image_input && postdata.image_input.length > 0) array.push(postdata.image_input);        
            const respuesta = await uploadImage(array);             
            postdata.image_file = respuesta[0]??url_frontal;
            /* subir imagen */

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, postdata);
            const result = info.data;
            
            //toastMessage(info);
            
            dispatch(onSetStockHeladoActive({
                ...result                
            }));
            dispatch(onStatus(false));

            return {...result, message: info.message ?? ''};

        } catch (error) {
            console.log(error);
        }
    }

    const getStockHelado = async(id:number) => {
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetStockHeladoActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            return null;
         }
    }

    const deleteStockHelado = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onStockHeladoDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }    
  
    const deleteStockHeladoDetalle = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`/stock-helado-detalle/${id}`);
                        
            dispatch(onStockHeladoDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }
    
    const deleteImagenStockHelado = async (id:number, imagen:string) => {

        try {
            const { data:info } = await backendApi.post(`/eliminar-foto-nota/${id}`,{ imagen });

            const result = info.data;

            toastMessage(info);
            
            dispatch(onSetStockHeladoActive(result));

            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    return {
        status, 
        StockHelado, 
        active, 
        errorMessage,
        nextPage,
        prevPage,

        loadStockHelado,
        saveStockHelado,
        updateStockHelado,
        getStockHelado,
        deleteStockHelado,
        deleteStockHeladoDetalle,
        deleteImagenStockHelado
    }
}
