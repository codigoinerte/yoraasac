import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List, ListSave } from '../../../components'
import { breadcrumb as bread, formMarca, listaDetalle, paginationInterface } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { useAlert, useMarca } from '../../../../hooks';
import Swal from 'sweetalert2';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Marcas', enlace: '' },
];


export const Marca = () => {

    const cabecera = [
        "#",
        "Marca",    
        "Fecha de creación",          
    ];

    const { detalle, loadMarca, deleteMarca, } = useMarca();

    const { warningDelete } = useAlert();
    
    useEffect(() => {
      
        loadMarca();

    }, []);

    const eliminar = async (id:number) => {

        warningDelete(async function(){
            
            const result = await deleteMarca(id);
    
            await loadMarca();
      
            if(result){
                Swal.fire(
                    'Eliminado!',
                    'Tu registro fue eliminado con exito.',
                    'success'
                )
            }else{
                Swal.fire(
                    'Error',
                    'Hubo un error al momento de ejecutar el proceso vuelva a intentarlo mas tarde',
                    'question'
                  )
            }
      
        
          });
          
    }
 
    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Marcas"> 
            <List
                category='configuracion'
                page="marcas"
                cabecera={cabecera}                 
                detalle={detalle}               
                eliminar={eliminar}
                next={()=>{}}
                prev={()=>{}}

                routeBack={'/configuracion'}
                routeBackLabel={'Volver a las categorias'}
            >
            <>
            </>
            </List>
        </ContainerInner>
    )
}
