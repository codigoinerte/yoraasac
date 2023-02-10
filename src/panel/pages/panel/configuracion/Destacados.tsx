import React, { useState } from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread, CategoryListInterface } from '../../../interfaces';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { CategoryList } from '../../../helpers/CategoryList';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Accesos directos', enlace: '' }
];

const nodes:CategoryListInterface [] = [{
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
        children:[
            {
                name : 'child 9',
                id:9,
                alias : '/',
                children:[]
            },
            {
                name : 'child 10',
                id:10,
                alias : '/',
                children:[]
            },
            {
                name : 'child 11',
                id:11,
                alias : '/',
                children:[
                    
                ]
            }
        ]
    }]
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
                        
                        <ul className='category-destacados'>
                        {
                            nodes.map(CategoryList)
                        }
                        </ul>

                    </div>
                </div>                            
            </>
        </ContainerInner>
    )
}
