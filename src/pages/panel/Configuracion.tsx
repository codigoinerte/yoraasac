import React from 'react'
import { AccessCategory, ContainerMain } from '../../components'
import { MenuConfiguracion } from '../../helpers';
import { breadcrumb as bread } from '../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '' },
];

export const Configuracion = () => {
    return (
        <>
            <ContainerMain breadcrumb={breadcrumb}>
                <AccessCategory Menu={MenuConfiguracion} />
            </ContainerMain>
        </>
    )
}
