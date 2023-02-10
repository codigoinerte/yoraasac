import React from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread, listaDetalle} from '../../../interfaces';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Nota heladero', enlace: '/nota-heladero' },
    { id:2, titulo: 'Nota heladero detalle', enlace: '' },
  ];


export const NotaHeladeroDetalle = () => {


    const cabecera = [
        "Devolucion",
        "Pedido",
        "Producto",
        "Vendido",
        "Importe"
    ];
  
    const eliminar = (id:number) => {
        console.log(id);
    }
  
    const detalle:listaDetalle[] = [
      {
        id:1,
        campos: ["5", "10", "Turbo Max", "15", "10.50"]
      },
      {
        id:2,
        campos: ["10", "10", "Turbo Max", "15", "10.50"]
      },
      {
        id:3,
        campos: ["5", "20", "Sandwichito", "25", "17.50"]
      },
      {
        id:4,
        campos: ["10", "20", "Mini sublimne", "20", "14.00"]
      }
    ];

    return (
        <ContainerInner breadcrumb={breadcrumb} titulo="Nota heladero - Cierre">
            <>
            
            {/* <FormStock page='helados' category='stock' /> */}
          <FormControls save={()=>console.log(1)} page="nota-heladero"/>

            <hr className='border border-1 opacity-50'/>

            <h4>Informaci&oacute;n</h4>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div className="mb-3">
                        <label htmlFor="tipo_movimiento" className="form-label">Heladero</label>
                        <select name="tipo_movimiento" id="tipo_movimiento" className='form-control'>
                            <option value="">-seleccione una opcion-</option>
                            <option value="1">Heladero 1</option>
                            <option value="2">Heladero 2</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    
                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select name="estado" id="estado" className='form-control'>                            
                            <option value="2">Cierre</option>
                            <option value="1">Reapertura</option>
                            <option value="3">Reservar</option>
                        </select>
                    </div>
                                        
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                
                    <div className="mb-3">
                        <label htmlFor="fecha_movimiento" className="form-label">Fecha del movimiento</label>
                        <input type="date" className="form-control" id="fecha_movimiento" aria-describedby="fecha_movimiento" />
                    </div>

                </div>

            </div>  

            <h4>Productos o items del movimiento</h4>

            <div className="row">
                
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="input-group mb-3">
                    <select className="form-select" id="inputGroupSelect02">
                    <option>-Busque un producto-</option>
                    <option value="1">Helado 1</option>
                    <option value="2">Helado 2</option>
                    <option value="3">Helado 3</option>                    
                    </select>
                    <button className="btn btn-primary" type="button"><i className="bi bi-plus"></i> Agregar</button>
                </div>

                </div>

                <div className='px-3'>
                {
                    detalle.length > 0 ?
                    (
                        <>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        {
                                            cabecera.map((titulo)=>(
                                                <th key={titulo} scope="col">{ titulo }</th>
                                            ))
                                        }
                                            <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {
                                        detalle.map(({ id, campos })=>{
                                            
                                            const keyrow = `fila${id}`;
                                            const enlaceDetalle = '';
                                        return (                                    
                                            
                                                <tr key={keyrow}>
                                                    {
                                                        campos.map(( texto, index )=> {
                                                            
                                                            const cabeceraChildren = cabecera[index];
                                                            const childrenRowKey = `children_${cabeceraChildren}_${id}`
                                                            
                                                            return (
                                                            <td key={childrenRowKey} scope="row" data-label={cabeceraChildren}>
                                                                {
                                                                        index == 2 ? texto
                                                                        :
                                                                        (
                                                                        <>
                                                                            <input 
                                                                                type="number" 
                                                                                className='form-control' 
                                                                                value={texto}
                                                                                min={0}
                                                                                onChange={()=>{}}
                                                                                max={1000} />
                                                                        </>
                                                                        )
                                                                    
                                                                }
                                                            </td>  
                                                        )})
                                                    }

                                                    <td data-label="Acciones">
                                                        <div className="acciones-buttons">                                                    
                                                            <button onClick={()=> eliminar(id)} type="button" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            
                                        )})
                                    }
                                    
                                </tbody>
                            </table>   
                            
                        </>
                    )
                    :
                    (
                        <>
                            <div className="alert alert-warning d-flex justify-content-center gap-3 fs-2 mt-5" role="alert">
                                <i className="bi bi-exclamation-triangle"></i>
                                <div>
                                    <b>No se añadio ningun producto</b>
                                </div>
                            </div>
                        </>
                    )
                }
                </div>

            </div>
            

            </>
        </ContainerInner>
    )
}
