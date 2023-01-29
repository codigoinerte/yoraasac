import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components';
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Personas', enlace: '/personas' },
    { id:2, titulo: 'Heladeros', enlace: '/personas/heladeros' },
    { id:3, titulo: 'Heladeros detalle', enlace: '' }
];


export const HeladerosDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        
        <FormPersonal tipo="heladeros" ruta="heladeros" />

    </ContainerInner>
  )
}
