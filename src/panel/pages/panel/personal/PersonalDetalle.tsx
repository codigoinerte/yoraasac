import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Personas', enlace: '/personas' },
    { id:2, titulo: 'Personal', enlace: '/personas/personal' },
    { id:3, titulo: 'Personal detalle', enlace: '' }
];

export const PersonalDetalle = () => {
  return (
    
    <ContainerInner breadcrumb={breadcrumb}>
        <FormPersonal page="personal" category='personas'/>
    </ContainerInner>

  )
}
