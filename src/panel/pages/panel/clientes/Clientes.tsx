import React from 'react'
import { ContainerInner, ListPersonal } from '../../../components'
import { breadcrumb as bread} from '../../../interfaces/interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Personas', enlace: '/personas' },
    { id:2, titulo: 'Clientes', enlace: '' },
];

export const Clientes = () => {
  return (
            
    <ContainerInner breadcrumb={breadcrumb}>        
            <ListPersonal page="clientes" category='personas' tipo={4}/>
    </ContainerInner>
    
  )
}
