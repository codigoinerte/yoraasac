import { backendApi } from '../api';
import { toast } from 'react-hot-toast';

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
    try {
      const { data:img } = await backendApi.post(`/guardar-foto`, formImageFrontal ,  {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      });
  
      let imagenes_messages: string[] = [];
      if(img.success === false){
        for(let imgArray in img.data){
          let message = img.data[imgArray][0] ?? '';
          imagenes_messages.push(message);
        }

        if(imagenes_messages.length > 0){
          let messageAlert = imagenes_messages.join(",");
          toast.error(messageAlert);
        }

        return [];
      }

      image_retorno = img.ruta??[];
      return image_retorno;
      
    } catch (error) {      
      return [];
    }
}
