import React from 'react'
import { Link } from 'react-router-dom';
import { ContainerInner, ListPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Personas', enlace: '/personas' },
  { id:2, titulo: 'Heladeros', enlace: '' },
];


export const Heladeros = () => {
  return (

    <ContainerInner breadcrumb={breadcrumb}>
        <ListPersonal page="heladeros" category='personas' tipo={7}/>
    </ContainerInner>
  )
}
