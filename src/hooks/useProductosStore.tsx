import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState } from '../interfaces';
import { BuscarProductos, FormProductosValuesSave } from '../panel/interfaces';
import { onPersonasAddMessage, onPersonasClearMessage, onStatus, onProductosList, onSetProductosActive, onProductosDelete } from '../store'


export const useProductosStore = () => {
  
    

    const { productos, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.productos);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadProductos = async (pagina = "1", buscar:BuscarProductos) =>{

        dispatch(onStatus(true));
        
        try {
            
            const {codigo, producto, fechaCreacion } = buscar;            
            const { data } = await backendApi.get(`/producto`, {
                params:{
                    page: pagina,
                    codigo,
                    producto,
                    fecha: fechaCreacion
                }
            });
            
            dispatch(onStatus(false));
            dispatch(onProductosList(data));            

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

    const saveProducto = async ( postdata:FormProductosValuesSave) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.post(`/producto`, postdata);
            const result = info.data;
            toastMessage(info);
            
            dispatch(onSetProductosActive({
                ...result               
            }));

            
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateProducto = async (postdata:FormProductosValuesSave) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`/producto/${active!.id}`, postdata);
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetProductosActive({
                ...result                
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getProducto = async (id:number | string) => {
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`/producto/${id}`);
            
            dispatch(onSetProductosActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            return null;
         }
    }

    const deleteProducto = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`/producto/${id}`);
                        
            dispatch(onProductosDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    }    

    return {
        status, 
        productos, 
        active, 
        errorMessage,
        nextPage,
        prevPage,

        loadProductos,

        saveProducto,
        updateProducto,
        getProducto,
        deleteProducto
    }
}
