import React, { useState } from 'react'
import { backendApi } from '../api';
import { baseArray, Departamentos, Distritos, Provincias } from '../panel/interfaces';

export const useDireccion = () => {
  
    const [departamentos, setDepartamentos] = useState<baseArray[]>([]);
    const [provincias, setProvincias] = useState<baseArray[]>([]);
    const [distritos, setDistritos] = useState<baseArray[]>([]);

    const loadDireccion = async () => {
        try {
            
            const { data: info } = await backendApi.get<Departamentos>(`/departamento`);

            const { data } = info;
            
            const result = data.map(({ id, departamento })=>{
                return {
                    id,
                    nombre: departamento
                }
            });
           
            setDepartamentos(result);       
            
            return true;

        } catch (error) {
            // console.log(error);
            return false;
        }
    }

    const loadProvincias = async (id:number) => {

        try {
            
            const { data: info } = await backendApi.get<Provincias>(`/provincia/filtro/departamento/${id}`);

            const { data } = info;
          
            const result = data.map(({ id, provincia })=>{
                return {
                    id,
                    nombre: provincia
                }
            });
           
            setProvincias(result);
            setDistritos([]);

            return true;
        } catch (error) {
            // console.log(error);
            return false;
        }
    }
    
    const loadDistritos = async (id:number) => {
        try {
            
            const { data: info } = await backendApi.get<Distritos>(`/distritos/filtro/provincia/${id}`);

            const { data } = info;
          
            const result = data.map(({ id, distrito })=>{
                return {
                    id,
                    nombre: distrito
                }
            });
           
            setDistritos(result);
            return true;

        } catch (error) {
            // console.log(error);
            return false;
        }
    }

    return {
        departamentos,
        provincias,
        distritos,
        loadDireccion,
        loadProvincias,
        loadDistritos,
    }
}
