import React from 'react'
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

interface props{
    data:any,
    message: string,
    success: Boolean
}

export const toastMessage = ({data, message, success}:props) => {
    
    if(success){

        // toast.success(message);
        Swal.fire({
            title: 'Exito!',
            text: message,
            icon: 'success',
            confirmButtonText: 'ok'
          })

    }else{
        
        const erroresArray = Object.values(data).flat();
        
        erroresArray.forEach((mensaje) => {
            if(mensaje)
                toast.error(mensaje.toString());
        });                
    }
}
