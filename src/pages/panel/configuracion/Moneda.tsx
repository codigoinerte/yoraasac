import React from 'react'
import { ContainerInner, ListSave } from '../../../components'
import { breadcrumb as bread, listaDetalle } from '../../../interfaces';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Monedas', enlace: '' },
];


export const Moneda = () => {


    const cabecera = [
        "Código",
        "Moneda",        
        "Simbolo",
        "Principal"                
    ];

    const eliminar = (id:number) => {
        console.log(id);
    }
 
    const editar = (id:number) => {
        console.log(id);
    }

    const detalle:listaDetalle[] = [
      {
        id:1,
        campos: ["0001", "Soles", "S/", "Si"]        
      }
      
    ];


    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Monedas"> 
            <ListSave                
                cabecera={cabecera}                 
                detalle={detalle}               
                eliminar={eliminar}                
                editar={editar}                
            >
            <>
                <form>
                    <div className="row">

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Codigo</label>
                                <input type="text" className="form-control" id="codigo" aria-describedby="codigo" placeholder='PEN'/>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="moneda" className="form-label">Moneda</label>
                                <input type="text" className="form-control" id="moneda" aria-describedby="moneda" placeholder='Soles'/>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="simbolo" className="form-label">Simbolo</label>
                                <input type="text" className="form-control" id="simbolo" aria-describedby="simbolo" placeholder='S/'/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="simbolo" className="form-label">Principal</label>
                                <select name="principal" id="principal" className='form-control'>
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="mb-3">
                                <button className="btn btn-primary text-center w-100" type="submit">Guardar Moneda</button>
                            </div>
                        </div>
                        
                       

                    </div>
                </form>
            </>
            </ListSave>
        </ContainerInner>
    )
}
