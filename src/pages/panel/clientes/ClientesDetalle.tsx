import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Clientes', enlace: '/clientes' },
    { id:2, titulo: 'Cliente detalle', enlace: '' }
];


export const ClientesDetalle = () => {
  return (
    
    <ContainerInner breadcrumb={breadcrumb}>
        <FormPersonal tipo="clientes" ruta="/clientes" />
    </ContainerInner>

  )
}
