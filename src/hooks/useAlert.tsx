import React from 'react'
import Swal from 'sweetalert2'

type funcionCallable = (id: number)=>Promise<boolean>;

interface warningInterface  {
    funcion:funcionCallable,
    title?:string
}

export const useAlert = () => {
    // funcion:Promise<boolean>, title='¿Estas seguro que deseas eliminar este registro?'
    
    const warningDelete=(callback:Function)=> {

        const title='¿Estas seguro que deseas eliminar este registro?';
        
        Swal.fire({
            title,            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then(async (result) => {

            if (result.isConfirmed) {

                callback();
            }
          })
    }

  return {
    warningDelete
  }
}
