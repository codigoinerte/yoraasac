import axios from 'axios';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState, NotaHeladero } from '../interfaces';
import { FormBuscarNotaHeladeroValues, FormNotaHeladeroValues, ReporteItemNota, ReporteNotaForm, ReporteNotaHeladero } from '../panel/interfaces';
import { onStatus, onNotaHeladeroAddMessage, onNotaHeladeroClearMessage, onNotaHeladeroDelete, onNotaHeladeroList, onSetNotaHeladeroActive } from '../store'


export const useNotaHeladeroStore = () => {

    const [reporte, setReporte] = useState<ReporteItemNota[]>([]);
  
    const rutaEndpoint = '/nota-heladero';

    const { Heladeros, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.notaHeladero);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadNotaHeladero = async (pagina = "1", buscar:FormBuscarNotaHeladeroValues) =>{

        dispatch(onStatus(true));
        
        try {
            
            const {documento, nombre, estado } = buscar;            
            const { data } = await backendApi.get(rutaEndpoint, {
                params:{
                    page: pagina,
                    documento,
                    nombre,
                    estado
                }
            });
            
            dispatch(onStatus(false));
            dispatch(onNotaHeladeroList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                dispatch( onNotaHeladeroAddMessage(message) );
                setTimeout(() => {
                    dispatch( onNotaHeladeroClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveNotaHeladero = async ( postdata:FormNotaHeladeroValues) => {
        dispatch(onStatus(true));    
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, {
                ...postdata,
                id_sucursal: 1
            });
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetNotaHeladeroActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateNotaHeladero = async (postdata:FormNotaHeladeroValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, { ...postdata,  id_sucursal: 1});
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetNotaHeladeroActive({
                ...result                
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getNotaHeladero = async(id:number):Promise<NotaHeladero|undefined>=>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);

            dispatch(onSetNotaHeladeroActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            console.log(error);
         }
    }

    const deleteNotaHeladero = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onNotaHeladeroDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    } 
    
    const reporteHeladero = async (params: ReporteNotaForm) =>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get<ReporteNotaHeladero>(`/reporte-nota`, {params});
            
           setReporte(info.data);

        } catch (error) {
            console.log(error);
        }
    }
  
    return {
        status,
        Heladeros,
        active, 
        errorMessage,
        nextPage,
        prevPage,
        reporte,

        loadNotaHeladero,
        saveNotaHeladero,
        updateNotaHeladero,
        getNotaHeladero,
        deleteNotaHeladero,
        reporteHeladero,
       
    }
}
