import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AlertProps {
    title: string | HTMLElement | JQuery | undefined;
    text: string | undefined;
    icon?: SweetAlertIcon | undefined;
    confirmButtonText: string;
    cancelButtonText?: string;
    showCancelButton?: boolean,
    disableConfirmMessage?: boolean;
    preConfirm: () => void;
}
export const alert = ({ title, text, icon, confirmButtonText, cancelButtonText = "Cancel", showCancelButton = false, preConfirm, disableConfirmMessage=false }: AlertProps) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        cancelButtonText,
        showCancelButton,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm
      })
    .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if(disableConfirmMessage) return;
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
    });
}
