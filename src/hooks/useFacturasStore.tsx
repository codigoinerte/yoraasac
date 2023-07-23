import axios from 'axios';
import React, { useReducer, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { backendApi } from '../api';
import { toastMessage } from '../helpers';
import { IRootState, Facturas } from '../interfaces';
import { FormBuscarFacturasValues, FormBuscarNotaHeladeroValues, FormFacturacionValues, FormNotaHeladeroValues, NotaHeladeroEstado, ProductosPublicados, ReporteFacturacion, ReporteItemFactura, ReporteNotaForm } from '../panel/interfaces';
import { onFacturacionAddMessage, onFacturacionClearMessage, onFacturacionDelete, onFacturacionList, onSetFacturacionActive, onStatus, } from '../store'
import { useHelpers } from './useHelpers';
//import { NotaHeladero } from '../panel/pages/panel/notaHeladero/NotaHeladero';
//import { onNotaHeladeroAddMessage, onNotaHeladeroClearMessage, onNotaHeladeroDelete, onNotaHeladeroList, onSetNotaHeladeroActive } from '../store/notaHeladeros/notaHeladerosSlice';


export const useFacturastore = () => {

    const [reporte, setReporte] = useState<ReporteItemFactura[]>([]);
  
    const rutaEndpoint = '/factura';

    const { facturas, active, nextPage, prevPage } = useSelector((state:IRootState)=>state.facturacion);

    const { status, errorMessage } = useSelector((state:IRootState)=>state.general)

    const dispatch = useDispatch();

    const loadFacturacion = async (pagina = "1", buscar:FormBuscarFacturasValues) =>{

        dispatch(onStatus(true));
        
        try {
            
            const {documento, nombre, fecha } = buscar;            
            const { data } = await backendApi.get(rutaEndpoint, {
                params:{
                    page: pagina,
                    documento,
                    nombre,
                    fecha
                }
            });
            
            dispatch(onStatus(false));
            dispatch(onFacturacionList(data));            

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { message } = error.response?.data;               

                dispatch( onFacturacionAddMessage(message) );
                setTimeout(() => {
                    dispatch( onFacturacionClearMessage() );
                }, 10);

                dispatch(onStatus(false));

                return error.message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const saveFacturacion = async ( postdata:FormFacturacionValues) => {
        dispatch(onStatus(true));    
        try {
            const { data:info } = await backendApi.post(rutaEndpoint, {
                ...postdata,
                id_sucursal: 1
            });
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetFacturacionActive({
                ...result               
            }));

            dispatch(onStatus(false));

            return result;

        } catch (error) {
            console.log(error);
        }
    }
    
    const updateFacturacion = async (postdata:FormFacturacionValues) => {
        dispatch(onStatus(true));

        try {

            const { data:info } = await backendApi.put(`${rutaEndpoint}/${active!.id}`, { ...postdata,  id_sucursal: 1});
            const result = info.data;
            
            toastMessage(info);
            
            dispatch(onSetFacturacionActive({
                ...result                
            }));
            dispatch(onStatus(false));

        } catch (error) {
            console.log(error);
        }
    }

    const getFacturacion = async(id:number):Promise<Facturas|undefined>=>{
        
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get(`${rutaEndpoint}/${id}`);
            
            dispatch(onSetFacturacionActive(info.data));

            dispatch(onStatus(false));

            return info.data;

        } catch (error) {
            //return null;
         }
    }

    const deleteFacturacion = async (id:number):Promise<Boolean> =>{
        
        try {            

            const { data:info } = await backendApi.delete(`${rutaEndpoint}/${id}`);
                        
            dispatch(onFacturacionDelete(info.data.id));

            dispatch(onStatus(false));
            return true;            
        } catch (error) {
            // console.log(error);
            return false;
        }
    } 
    
    const reproteFacturacion = async(params:ReporteNotaForm) =>{
        dispatch(onStatus(true));

        try {            

            const { data:info } = await backendApi.get<ReporteFacturacion>(`/reporte-factura`, {params});
            
           setReporte(info.data);

        } catch (error) {
            console.log(error);
        }
    }
  
    return {
        status, 
        facturas, 
        active, 
        errorMessage,
        nextPage,
        prevPage,
        reporte,


        reproteFacturacion,
        loadFacturacion,
        saveFacturacion,
        updateFacturacion,
        getFacturacion,
        deleteFacturacion,
       
    }
}
