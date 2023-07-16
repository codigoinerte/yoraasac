import React from 'react'
import { backendApi } from '../api';

export const uploadImage = async (image:(FileList|undefined)[]) => {

    let image_retorno = '';
    
    if(image.length == 0) return [];

    const formImageFrontal = new FormData();

    image.forEach((fileList, index) => {
      if(fileList){
        for (let i = 0; i < fileList.length; i++) {          
          if(fileList[i]) formImageFrontal.append(`foto[${index}]`, fileList[i]??'');
        }
      }
    });

    const { data:img } = await backendApi.post(`/guardar-foto`, formImageFrontal ,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });

    image_retorno = img?.ruta??[];
    return image_retorno;
}
