import React from 'react'
import { ContainerInner, ListPersonal } from '../../../components'
import { breadcrumb as bread} from '../../../interfaces/interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Clientes', enlace: '' },
];

export const Clientes = () => {
  return (
            
    <ContainerInner breadcrumb={breadcrumb}>        
            <ListPersonal tipo="clientes"/>
    </ContainerInner>
    
  )
}
