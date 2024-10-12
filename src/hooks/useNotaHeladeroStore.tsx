import axios from 'axios';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState, NotaHeladero } from '../interfaces';
import { FormBuscarNotaHeladeroValues, FormNotaFechaOperacion, FormNotaHeladeroValues, ReporteItemNota, ReporteNotaForm, ReporteNotaHeladero } from '../panel/interfaces';
import { onStatus, onSetNotaHeladeroActiveClear, onNotaHeladeroAddMessage, onNotaHeladeroClearMessage, onNotaHeladeroDelete, onNotaHeladeroList, onSetNotaHeladeroActive } from '../store'


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

    const saveNotaHeladero = async ( postdata:FormNotaHeladeroValues, updateSaved:boolean = false, closeNota:boolean = false ):Promise<NotaHeladero | undefined> => {
        dispatch(onStatus(true));    
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, {
                ...postdata,
                id_sucursal: 1,
                closeNota
            });
            const result = info.data;
            
            toastMessage(info);
            if(updateSaved == true){
                const sendedProductos = postdata.productos;
                const newProductos = active?.detalle.map((producto, index)=>{
                    const devolucion_today = sendedProductos.find(p=>p.codigo == producto.codigo)?.devolucion ?? 0;
                    return {
                        ...producto,
                        devolucion_today:(producto.is_litro)? parseFloat(devolucion_today.toString()) : parseInt(devolucion_today.toString())
                    }
                });
                if(active)
                dispatch(onSetNotaHeladeroActive({
                    ...active,
                    //fecha_cierre: (postdata.estado == 1) ? postdata.fecha_operacion : active.fecha_cierre,
                    //fecha_apertura: (postdata.estado == 2) ? postdata.fecha_operacion : active.fecha_apertura,
                    fecha_guardado: postdata.fecha_operacion,
                    estado: 3,
                    detalle: newProductos ?? []
                }));
            }else{
                dispatch(onSetNotaHeladeroActive({
                    ...result
                }));
            }

            
            dispatch(onStatus(false));

            return result;

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateNotaHeladero = async (postdata:FormNotaHeladeroValues, id = 0,  enableDispatch = true):Promise<NotaHeladero | undefined> => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${ id && id > 0 ? id: active!.id}`, { ...postdata,  id_sucursal: 1});
            const result = info.data;
            
            toastMessage(info);
            if(enableDispatch){
                dispatch(onSetNotaHeladeroActive({
                    ...result                
                }));
                dispatch(onStatus(false));
            }

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    const getNotaHeladero = async(id:number, enableDispatch = true):Promise<NotaHeladero|undefined>=>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);

            if(enableDispatch){
                dispatch(onSetNotaHeladeroActive({
                    ...info.data,
                    estado: info.data.estado == 4 ? 2 : info.data.estado
                }));    
                dispatch(onStatus(false));
            }

            return {
                ...info.data,
                estado: info.data.estado == 4 ? 2 : info.data.estado
            };

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
            await backendApi.post(`/hota-heladero-fecha-operacion/${params.id}`, {...params});           
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

    const setNullNotaHeladero = async () =>{
        dispatch(onSetNotaHeladeroActiveClear());
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
