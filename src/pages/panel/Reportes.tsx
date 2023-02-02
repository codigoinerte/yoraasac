import React from 'react'
import { AccessCategory, ContainerMain } from "../../components";
import { breadcrumb as bread } from '../../interfaces';
import { MenuReportes } from '../../helpers/Menu';
import { useParams } from 'react-router-dom';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '' },
];

export const Reportes = () => {

    const { id } = useParams();

    // <Routes>

    //     <Route path="/" element={<Clientes />} />
    //     <Route path="/new" element={<ClientesDetalle />} />
    //     <Route path="/edit/:id" element={<ClientesDetalle />} />
        
    // </Routes>
    return (
        <>
            <ContainerMain breadcrumb={breadcrumb}>
                <AccessCategory Menu={MenuReportes} />
            </ContainerMain>
        </>
    )
}
