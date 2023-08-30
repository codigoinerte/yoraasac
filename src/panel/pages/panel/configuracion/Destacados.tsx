import React, { useEffect, useState } from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread, DestacadoForm, Menu } from '../../../interfaces';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { CategoryList } from '../../../helpers/CategoryList';
import { useDestacados } from '../../../../hooks';
import { List } from 'rsuite';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Accesos directos', enlace: '' }
];

  
export const Destacados = () => {

    const [nodes, setNodes] = useState<Menu[]>([]);
    const [nodesSelected, setNodesSelected] = useState<Menu[]>([]);
    const [nodesFlat, setNodesFlat] = useState<Menu[]>([]);

    const { loadDestacados, saveDestacados } = useDestacados();

    useEffect(() => {
  
        loadDestacados().then((response)=>{

            const menu = response.menu ?? [];

            const menuSaved = response.destacado ?? [];

            const menuToSave = menu.map((item)=>({
                ...item,
                checked : menuSaved.filter((ms)=> ms.idmenu == item.id).length ? true : false
            }));
            
            setNodes(menuToSave);
            
            flatingNodes(response.menu);

            
                  
            setNodesSelected([...menuSaved.map((ms)=>({
                ...ms,
                nombre: ms.nombre,
                alias: ms.alias
            }))]);

        });            
    
    }, []);

    useEffect(() => {
      
        
    }, [nodesFlat])
    

    const flatingNodes = (menu:Menu[] = [])=>{
        
        menu.forEach(({ id, nombre, alias, icono, activo = false, children = [], idparent })=>{
            
            if(children.length > 0){

                setNodesFlat((e:Menu[])=> {
                    if(e.find((e)=> e.id == id )){
                        return [ ...e ];
                    }else{
                        return [...e, { id, nombre, alias, icono, activo }];
                    }

                });

                flatingNodes(children);
            }else{
                
                setNodesFlat((e:Menu[])=> {
                    if(e.find((e)=> e.id == id )){
                        return [ ...e ];
                    }else{
                        return [...e, { id, nombre, alias, icono, activo }];
                    }

                });
                
            }
        })
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        e.stopPropagation();

        

        if(nodesSelected.length > 0){
            const form:DestacadoForm = {
                destacados: nodesSelected.map((selected, i)=>({
                    idmenu : parseInt(selected.id.toString()),
                    orden : parseInt(i.toString()),
                    icono : "",
                    activo : true,
                }))
            } 

            saveDestacados(form);
        }
    }

    const loadMenuSelecteds = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const idselect = e.target.value; 
        
        setNodesSelected((item:Menu[])=>{
        
            if(e.target.checked)
            {
                if(item.find((f)=>f.id == parseInt(idselect.toString()))){
                    return [...item];
                }else{
                    
                    let child = nodesFlat.find((child) => child.id == parseInt(idselect.toString()) );
                    
                    if(child){
                        return[...item, {
                            id: child?.id ?? 0,
                            nombre: child.nombre,
                            alias: child.alias,
                            icono: child.icono,
                            activo: child.activo,
                        }];
                    }else{
                        return [...item];
                    }
                }
            }
            else
            {
                return[...item.filter((fitem)=> fitem.id != parseInt(idselect.toString())) ]
            }
        })
    }


    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>
            <form onSubmit={onSubmit}>
                <FormControls page="destacado" save={()=>console.log(1)} tipo='edit' />

                <hr className='border border-1 opacity-50'/>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6">

                        {/* menus */}
                        <div className="card">
                            <div className="card-header">
                                Accesos directos
                            </div>
                            <div className="card-body">
                                <ul className='category-destacados'>
                                {
                                    nodes.map((item) => CategoryList(item, loadMenuSelecteds))
                                }
                                </ul>

                            </div>
                        </div>
                        {/* menus */}

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6">

                        {/* lista reordenable */}
                        <div className="card">
                            <div className="card-header">
                                Accesos directos seleccionados
                            </div>
                            <div className="card-body">

                               
                                    <div className='mt-2'>
                                        <List className='border border-1' sortable onSort={(item)=> { 
                                            
                                            const newIndex = item?.newIndex ?? 0 ;
                                            const oldIndex = item?.oldIndex ?? 0 ;

                                            setNodesSelected((prvData:Menu[]) => {

                                                if(prvData){
                                                    const moveData = prvData.splice(oldIndex, 1);
                                                    const newData = [...prvData];
                                                    newData.splice(newIndex, 0, moveData[0]);
                                                    return newData;
                                                }else{
                                                    return prvData;
                                                }
                                            });

                                        }}>
                                            {nodesSelected.map(({ id, nombre, alias, icono, activo }, index) => (
                                                <List.Item key={index} index={index}>
                                                    <i className="bi bi-grip-vertical me-2"></i> {nombre}
                                                </List.Item>
                                            ))}
                                        </List>
                                    </div>
                                

                            </div>
                        </div>
                        {/* lista reordenable */}

                    </div>
                </div>
            </form>
            </>
        </ContainerInner>
    )
}
