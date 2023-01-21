import React from 'react'

import { ContainerInner } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Proveedores', enlace: '/proveedores' },
  { id:2, titulo: 'Proveedor detalle', enlace: '' }
];


export const StockHeladosDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
        </>
    </ContainerInner>
  )
}
