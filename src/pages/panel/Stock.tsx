import React from 'react'

import { AccessCategory, ContainerMain } from "../../components";
import { breadcrumb as bread } from '../../interfaces';
import { MenuStock } from '../../helpers/Menu';
import { useParams } from 'react-router-dom';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Stock', enlace: '' },
];

export const Stock = () => {
    
    return (
        <>
            <ContainerMain breadcrumb={breadcrumb}>
                <AccessCategory Menu={MenuStock} />
            </ContainerMain>
        </>
    )
}



