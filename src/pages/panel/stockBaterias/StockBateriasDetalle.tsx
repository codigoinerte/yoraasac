import React from 'react'
import { ContainerInner, FormStock } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Stock', enlace: '/stock' },
  { id:2, titulo: 'Stock baterias', enlace: '/stock/baterias' },
  { id:3, titulo: 'Stock baterias detalle', enlace: '' }
];

export const StockBateriasDetalle = () => {
  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <FormStock page='baterias' category='stock' />
    </ContainerInner>
  )
}
