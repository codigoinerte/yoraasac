import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Personal', enlace: '/personal' },
    { id:2, titulo: 'Personal detalle', enlace: '' }
];

export const PersonalDetalle = () => {
  return (
    
    <ContainerInner breadcrumb={breadcrumb}>
        <FormPersonal tipo="personal" ruta="/personal" />
    </ContainerInner>

  )
}
