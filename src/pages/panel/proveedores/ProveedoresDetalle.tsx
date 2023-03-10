import React from 'react'
import { ContainerInner, FormPersonal } from '../../../components';
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Proveedores', enlace: '/proveedores' },
    { id:2, titulo: 'Proveedor detalle', enlace: '' }
];


export const ProveedoresDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <FormPersonal tipo="proveedores" ruta="/proveedores" />
    </ContainerInner>
  )
}
