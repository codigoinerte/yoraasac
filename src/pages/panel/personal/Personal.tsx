import React from 'react'
import { Link } from 'react-router-dom';
import { ContainerInner, ListPersonal } from '../../../components'
import { Breadcrumb as bread } from '../../../interfaces';

const breadcrumb:bread[] = [  
  { id:1, titulo: 'Personal', enlace: '' },
];


export const Personal = () => {
  return (

    <ContainerInner breadcrumb={breadcrumb}>
        <ListPersonal page="personal" category='personas'/>
    </ContainerInner>
  )
}
