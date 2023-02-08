import React, { useState } from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread } from '../../../interfaces';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Accesos directos', enlace: '' }
];

const nodes = [{
    name : 'Category',
    id:1,
    alias : '/',
    children: [{
        name : 'child 2',
        id:2,
        alias : '/',
        children:[]
    },
    {
        name : 'child 3',
        id:3,
        alias : '/',
        children:[]
    },
    {
        name : 'child 4',
        id:4,
        alias : '/',
        children:[]
    }],
},
{
    name : 'Category 5',
    id:5,
    alias : '/',
    children: [{
        name : 'child 6',
        id:6,
        alias : '/',
        children:[]
    },
    {
        name : 'child 7',
        id:7,
        alias : '/',
        children:[]
    },
    {
        name : 'child 8',
        id:8,
        alias : '/',
        children:[]
    }]
}
];

export const Destacados = () => {

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>
                <FormControls page="destacado" save={()=>console.log(1)} tipo='edit' />

                <hr className='border border-1 opacity-50'/>

                <div className="card">
                    <div className="card-header">
                        Accesos directos
                    </div>
                    <div className="card-body">
                        
                        <ul>
                        {
                            nodes.map(({id, name, alias, children})=>(
                               
                                    <li key={id}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                {name}

                                                {
                                                    children.length > 0 &&
                                                    (
                                                        <ul>
                                                            {
                                                                children.map(({id, name, alias, children})=>(
                                                                                                                        
                                                                    <li key={id}>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" />
                                                                            <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                                                {name}
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )
                                                    
                                                }

                                            </label>
                                        </div>
                                    </li>
                                
                            ))
                        }
                        </ul>

                    </div>
                </div>                            
            </>
        </ContainerInner>
    )
}
