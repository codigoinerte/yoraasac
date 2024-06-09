import axios from 'axios';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState, NotaHeladero } from '../interfaces';
import { FormBuscarNotaHeladeroValues, FormNotaFechaOperacion, FormNotaHeladeroValues, ReporteItemNota, ReporteNotaForm, ReporteNotaHeladero } from '../panel/interfaces';
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

    const saveNotaHeladero = async ( postdata:FormNotaHeladeroValues, updateSaved:boolean = false ) => {
        dispatch(onStatus(true));    
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, {
                ...postdata,
                id_sucursal: 1
            });
            const result = info.data;
            
            toastMessage(info);
            if(updateSaved == true){
                const sendedProductos = postdata.productos;
                const newProductos = active?.detalle.map((producto, index)=>{
                    return {
                        ...producto,
                        devolucion_today : sendedProductos.find(p=>p.id == producto.id)?.devolucion_today ?? 0
                    }
                });
                
                dispatch(onSetNotaHeladeroActive({
                    ...result,
                    detalle: newProductos
                }));
            }else{
                dispatch(onSetNotaHeladeroActive({
                    ...result
                }));
            }

            
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

    const updateDateOperation = async (params: FormNotaFechaOperacion) =>{
        
        dispatch(onStatus(true));

        try {            

            const response = await backendApi.post(`/hota-heladero-fecha-operacion/${params.id}`, {...params});
            if(active){
                dispatch(onSetNotaHeladeroActive({
                    ...active,
                    fecha_cierre: (params.estado == 1) ? params.fecha_operacion : active.fecha_cierre,
                    fecha_apertura: (params.estado == 2) ? params.fecha_operacion : active.fecha_apertura,
                    fecha_guardado: (params.estado == 3) ? params.fecha_operacion : active.fecha_guardado,
                    estado: 1,
                }));
            }
           
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const updateStateNotaHeladero = async (estado:number) =>{
        if(active)
        dispatch(onSetNotaHeladeroActive({
            ...active,
            estado,
        }));
    }

    const setNullNotaHeladero = () =>{
        dispatch(onSetNotaHeladeroActive(null));
    }
  
    return {
        status,
        Heladeros,
        active, 
        errorMessage,
        nextPage,
        prevPage,
        reporte,

        dispatch,
        loadNotaHeladero,
        saveNotaHeladero,
        updateNotaHeladero,
        getNotaHeladero,
        deleteNotaHeladero,
        reporteHeladero,
        updateDateOperation,
        updateStateNotaHeladero,
        setNullNotaHeladero
    }
}
