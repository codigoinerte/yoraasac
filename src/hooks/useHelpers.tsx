import React, { useState } from 'react'
import { backendApi } from '../api';
import { BuscarProducto, BuscarProductosList, BuscarUsuario, BuscarUsuarioList, EstadoItem, EstadosList, IgvItem, IgvList, MarcaItem, MarcasList, MonedaItem, MonedaList, MovimientoItem, MovimientoList, NotaHeladeroEstado, ProductosPublicados, ProductosPublicadosList, TipoDocumentoItem, TipoDocumentoList, UniadesList, UnidadItem, UnspscItem, UnspscList } from '../panel/interfaces';
import { NotaHeladeroEstados, NotaHeladeroGuardada, NotaHeladeroGuardadas } from '../panel/interfaces/interfaces';
import { NotaHeladero, NotaHeladeros } from '../interfaces';

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
    const [listUsuario, setListUsuario] = useState<BuscarUsuario[]>([]);
    const [listEstadoHeladero, setListEstadoHeladero] = useState<NotaHeladeroEstado[]>([]);
    const [listProductosPublicados, setListProductosPublicados] = useState<ProductosPublicados[]>([]);
    const [listNotaGuardada, setListNotaGuardada] = useState<NotaHeladeroGuardada>();


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
    const loadBuscarUsuario = async(buscar:any = '', type="") =>{
        if(buscar.length < 3) return false;

        try {
            
            const { data } = await backendApi.get<BuscarUsuarioList>(`/buscar-usuario`,{
                params:{
                    buscar,
                    type
                }
            });
            
            setListUsuario(data.data);
            
    
        } catch (error) {
            console.log(error);
        }
    }
    const listNotaHeladeroEstado = async()=>{
                
        try {
                                    
            const { data } = await backendApi.get<NotaHeladeroEstados>('/notas-estado');
            
            setListEstadoHeladero(data.data);            
        
        } catch (error) {
            
            console.log(error);
        }
    }
    const loadProductosDisponibles = async () => {
                
        try {
                                    
            const { data } = await backendApi.get<ProductosPublicadosList>('/nota-heladero-productos');
            
            setListProductosPublicados(data.data);            
            
            return data.data;

        } catch (error) {
            
            console.log(error);
        }
    }
    const loadBuscarNotaHeladeroGuardada = async (idusuario:number)=>{

        if(idusuario == 0) return false;
        
        try {
            
            const { data } = await backendApi.get<NotaHeladeroGuardadas>(`/nota-heladero-buscar`,{
                params:{
                    idusuario: parseInt(idusuario.toString())
                }
            });
            
            return data.data;
            
    
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
        listUsuario,
        listEstadoHeladero,
        listProductosPublicados,
        listNotaGuardada,

        listNotaHeladeroEstado,
        loadProductosDisponibles,
        
        loadUnspsc,
        loadEstados,
        loadMarcas,
        laodUnidades,
        loadMoneda,
        loadIgv,
        loadMovimientos,
        loadTipoDocumento,
        loadBuscarProducto,
        loadBuscarUsuario,
        loadBuscarNotaHeladeroGuardada
    }
}
