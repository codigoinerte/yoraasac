import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Personas', enlace: '/personas' },
    { id:2, titulo: 'Clientes', enlace: '/personas/clientes' },
    { id:3, titulo: 'Cliente detalle', enlace: '' }
];


export const ClientesDetalle = () => {
  return (
    
    <ContainerInner breadcrumb={breadcrumb}>
        <FormPersonal tipo="clientes" ruta="clientes" />
    </ContainerInner>

  )
}
