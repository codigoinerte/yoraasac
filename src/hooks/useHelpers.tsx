import React, { useState } from 'react'
import { backendApi } from '../api';
import { BuscarProducto, BuscarProductosList, EstadoItem, EstadosList, IgvItem, IgvList, MarcaItem, MarcasList, MonedaItem, MonedaList, MovimientoItem, MovimientoList, TipoDocumentoItem, TipoDocumentoList, UniadesList, UnidadItem, UnspscItem, UnspscList } from '../panel/interfaces';

export const useHelpers = () => {

    const [listUnpsc, setListUnpsc] = useState<UnspscItem[]>([]);
    const [listEstados, setListEstados] = useState<EstadoItem[]>([]);
    const [listMarcas, setListMarcas] = useState<MarcaItem[]>([]);
    const [listUnidades, setListUnidades] = useState<UnidadItem[]>([]);
    const [listMonedas, setListMonedas] = useState<MonedaItem[]>([]);
    const [listIgv, setListIgv] = useState<IgvItem[]>([]);
    const [listMovimiento, setListMovimiento] = useState<MovimientoItem[]>([]);
    const [listTipoDocumento, setListTipoDocumento] = useState<TipoDocumentoItem[]>([]);
    const [listBuscarProducto, setListBuscarProducto] = useState<BuscarProducto[]>([]);
    
    const loadUnspsc = async (buscar='', type="")=>{

        if(buscar.length < 3) return false;

        try {
            
            const { data } = await backendApi.get<UnspscList>(`/unspsc`,{
                params:{
                    buscar,
                    type
                }
            });

            setListUnpsc(data.data);
            

        } catch (error) {
            
        }
    }
    const loadEstados =async ()=>{

        try {
            
            const { data } = await backendApi.get<EstadosList>(`/estado`);

            setListEstados(data.data);
            

        } catch (error) {
            
        }
    }
    const loadMarcas =async ()=>{
        try {
            
            const { data } = await backendApi.get<MarcasList>(`/marca`);

            setListMarcas(data.data);
            

        } catch (error) {
            
        }
    }
    const laodUnidades =async ()=>{
        try {
            
            const { data } = await backendApi.get<UniadesList>(`/unidad`);

            setListUnidades(data.data);
            

        } catch (error) {
            
        }
    }
    const loadMoneda = async ()=>{
        try {
            
            const { data } = await backendApi.get<MonedaList>(`/moneda`);

            setListMonedas(data.data);
            

        } catch (error) {
            
        }
    }
    const loadIgv = async ()=>{
        try {
            
            const { data } = await backendApi.get<IgvList>(`/igv`);
    
            setListIgv(data.data);
            
    
        } catch (error) {
            
        }
    }
    const loadMovimientos = async ()=>{
        try {
            
            const { data:{ data } } = await backendApi.get<MovimientoList>(`/movimiento`);
    
            setListMovimiento(data);
            
    
        } catch (error) {
            
        }
    }
    const loadTipoDocumento = async ()=>{
        try {
            
            const { data:{ data } } = await backendApi.get<TipoDocumentoList>(`/tipo-documento`);
    
            setListTipoDocumento(data);
            
    
        } catch (error) {
            
        }
    }
    const loadBuscarProducto = async (producto:string = '')=>{

        if(producto.length < 3) return false;

        try {
            
            const { data } = await backendApi.get<BuscarProductosList>(`/buscar-producto`,{
                params:{
                    producto
                }
            });
    
            setListBuscarProducto(data.data);
            
    
        } catch (error) {
            console.log(error);
        }
    }

    return {

        listUnpsc,
        listEstados,
        listMarcas,
        listUnidades,
        listMonedas,
        listIgv,
        listMovimiento,
        listTipoDocumento,
        listBuscarProducto,


        
        loadUnspsc,
        loadEstados,
        loadMarcas,
        laodUnidades,
        loadMoneda,
        loadIgv,
        loadMovimientos,
        loadTipoDocumento,
        loadBuscarProducto,
    }
}
