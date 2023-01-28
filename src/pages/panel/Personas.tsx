import React from 'react'
import { AccessCategory, ContainerMain } from "../../components";
import { breadcrumb as bread } from '../../interfaces';
import { Menu, MenuPersonas } from '../../helpers/Menu';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Personas', enlace: '' },
];

export const Personas = () => {
    return (
        <>
            <ContainerMain breadcrumb={breadcrumb}>
                <AccessCategory Menu={MenuPersonas} />
            </ContainerMain>
        </>
    )
}
