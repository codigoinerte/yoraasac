import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

type customObj = {
    title?: any,
    icon?: any,
    confirmButtonText ?: any
}
interface props{
    data:any,
    message: string,
    success: Boolean,
    custom?: customObj,
}


export const toastMessage = ({data, message, success, custom}:props) => {
    
    if(success){

        const { title, icon, confirmButtonText } = custom ?? {};
        
        Swal.fire({
            title: title ?? 'Exito!',
            text: message,
            icon: icon ?? 'success',
            confirmButtonText: confirmButtonText ?? 'ok'
          })

    }else{
        
        const erroresArray = Object.values(data).flat();
        
        erroresArray.forEach((mensaje) => {
            if(mensaje)
                toast.error(mensaje.toString());
        });                
    }
}
