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
    title?: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
}


export const toastMessage = ({data, message, success, icon = 'success', title = 'Exito!', custom}:props) => {
    
    if(success){

        const { title:titleCustom = title, icon:iconCustom = icon , confirmButtonText } = custom ?? {};
        
        Swal.fire({
            title: titleCustom,
            text: message,
            icon: iconCustom,
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
