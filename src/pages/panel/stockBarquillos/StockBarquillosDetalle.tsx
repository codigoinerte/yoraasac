import React from 'react'
import { ContainerInner, FormStock } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock barquillos', enlace: '/stock/barquillos' },
  { id:3, titulo: 'Stock barquillos detalle', enlace: '' }
];

export const StockBarquillosDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <FormStock page='barquillos' category='stock' />
    </ContainerInner>
  )
}
