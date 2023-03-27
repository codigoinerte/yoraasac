import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components';
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Personas', enlace: '/personas' },
    { id:2, titulo: 'Proveedores', enlace: '/personas/proveedores' },
    { id:3, titulo: 'Proveedor detalle', enlace: '' }
];


export const ProveedoresDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <FormPersonal page="proveedores" category='personas' tipo={5}/>
    </ContainerInner>
  )
}
