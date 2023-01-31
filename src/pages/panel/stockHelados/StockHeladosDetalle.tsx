import React from 'react'

import { ContainerInner, FormStock } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock helados', enlace: '/stock/helados' },
  { id:3, titulo: 'Stock helados detalle', enlace: '' }
];

export const StockHeladosDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <FormStock page='helados' category='stock' />
    </ContainerInner>
  )
}
