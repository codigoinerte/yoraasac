import React from 'react'
import { Link } from 'react-router-dom';
import { ContainerInner, ListPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Proveedores', enlace: '' },
];


export const Proveedores = () => {
  return (

    <ContainerInner breadcrumb={breadcrumb}>
        <ListPersonal tipo="proveedores"/>
    </ContainerInner>
  )
}
