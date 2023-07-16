import React from 'react'
import { backendApi } from '../api';

export const deleteImagen = async (imagen:string) => {

    if(imagen == null) return;

    const formImageFrontal = new FormData();

    const { data:img } = await backendApi.delete(`/eliminar-foto`, {
        data:{
            imagen
        }
    });

    
}
