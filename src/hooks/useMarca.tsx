import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { Marcas, formMarca, listaDetalle } from '../panel/interfaces';
import { onStatus, onMarcaList, onMarcaAddMessage, onMarcaClearMessage, onSetMarcaActive, onMarcaDelete } from '../store'
import { useState } from 'react';
import moment from 'moment';

export const useMarca = () => {

    const rutaEndpoint = '/marca';

    const [detalle, setDetalle] = useState<listaDetalle[]>([]);

    const { marcas, marca } = useSelector((state:IRootState)=>state.marca);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadMarca = async () =>{

        dispatch(onStatus(true));
        
        try {
            
            const { data } = await backendApi.get<Marcas>(rutaEndpoint);
            
            setDetalle(data.data.map((marca, i)=>({
                id: (marca.id).toString(),
                campos:[
                    (i+1).toString(),
                    marca.nombre,
                    (marca.created_at? moment(marca.created_at).format("DD-MM-YYYY"): '').toString()
                ]
            })));
    
            
            dispatch(onStatus(false));
            dispatch(onMarcaList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};               

                dispatch( onMarcaAddMessage(message) );
                setTimeout(() => {
                    dispatch( onMarcaClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveMarca = async ( params:formMarca) => {
        dispatch(onStatus(true));    
        
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, { ...params });

            toastMessage(info);
            
            dispatch(onSetMarcaActive(null));

            return info;
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateMarca = async (params:formMarca) => {
        dispatch(onStatus(true));
        
        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${marca!.id}`, { ...params});
            
            toastMessage(info);
            
            dispatch(onSetMarcaActive(null));

            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getMarca = async(id:number)=>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetMarcaActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            console.log(error);
         }
    }

    const deleteMarca = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onMarcaDelete(info.data.id));

            dispatch(onStatus(false));
            
            return true;            

        } catch (error) {
            console.log(error);
            return false;
        }
    } 
    
    return {
        status, 
        marcas, 
        marca, 
        errorMessage,
        detalle,

        loadMarca,
        saveMarca,
        updateMarca,
        getMarca,
        deleteMarca,
       
    }
}
