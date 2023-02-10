import React from 'react'
import { ContainerInner, FormControls } from '../../../components';
import { breadcrumb as bread, listaDetalle } from '../../../interfaces';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Facturación', enlace: '/facturacion' },
    { id:2, titulo: 'Facturación detalle', enlace: '' },
];


export const FacturacionDetalle = () => {

    const cabecera = [
        "codigo",
        "Producto",
        "Cantidad",
        "Precio",
        "Descuento",
        "Total"
    ];
  
    const eliminar = (id:number) => {
        console.log(id);
    }
  
    const detalle:listaDetalle[] = [
      {
        id:1,
        campos: ["10001", "Turbo Max", "1", "10.50", "50", "5.25",]
      }
    ];

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>                              
            <FormControls save={()=>console.log(1)} page="facturacion"/>

                <hr className='border border-1 opacity-50'/>

                <ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <button className="nav-link active" id="resumen-tab" data-bs-toggle="pill" data-bs-target="#resumen" type="button" role="tab" aria-controls="resumen" aria-selected="true">Resumen</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" id="detalle-tab" data-bs-toggle="pill" data-bs-target="#detalle" type="button" role="tab" aria-controls="detalle" aria-selected="false">Detalle</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" id="adelanto-tab" data-bs-toggle="pill" data-bs-target="#adelanto" type="button" role="tab" aria-controls="adelanto" aria-selected="false">Adelanto</button>
                    </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="resumen" role="tabpanel" aria-labelledby="resumen-tab">

                        <h4>Informaci&oacute;n</h4>
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                
                                <div className="mb-3">
                                    <label htmlFor="fecha_emision" className="form-label">Fecha de emisión</label>
                                    <input type="date" className="form-control" id="fecha_emision" aria-describedby="fecha_emision" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fecha_movimiento" className="form-label">Tipo</label>
                                    <div className="d-flex gap-3">                                
                                        <select name="tipo" id="tipo" className='form-control'>                                    
                                            <option value="1">Boleta</option>
                                            <option value="2">Factura</option>
                                        </select>  
                                    </div>
                                </div>                       
                                
                                    
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                                                            
                                <div className="mb-3">
                                    <label htmlFor="fecha_pago" className="form-label">Fecha de pago</label>
                                    <input type="date" className="form-control" id="fecha_pago" aria-describedby="fecha_pago" />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="fecha_movimiento" className="form-label">Numero de documento</label>
                                    <div className="d-flex gap-3">                                
                                        <input type="text" aria-label="serie" className="form-control" placeholder='Serie' value={'B001'} onChange={()=>{}}/>-
                                        <input type="text" aria-label="núm. doc." className="form-control flex-1" placeholder='nùm doc.' value={'1'} onChange={()=>{}}/>
                                    </div>
                                </div>
                                            
                                
                            </div>

                        </div>  

                        <hr className='border border-1 opacity-50'/>
                        
                        <h4>Cliente</h4>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                <div className="mb-3">                            
                                    <select name="cliente" id="cliente" className='form-control'>
                                        <option value="">-seleccione una opcion-</option>
                                        <option value="1">cliente 1</option>
                                        <option value="2">cliente 2</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>

                        <hr className='border border-1 opacity-50'/>

                        <h4>Parametros</h4>

                        <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                                <div className="mb-3">
                                    <label htmlFor="tipo_transaccion" className="form-label">Tipo de transacción</label>
                                    <select name="tipo_transaccion" id="tipo_transaccion" className='form-control'>                                    
                                        <option value="1">Contado</option>
                                        <option value="2">Credito</option>
                                    </select>                                                
                                </div>

                            </div>
                            
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                                <div className="mb-3">
                                    <label htmlFor="estado" className="form-label">Estado</label>
                                    <select name="estado" id="estado" className='form-control'>                                    
                                        <option value="1">Pagado</option>
                                        <option value="2">No pagado</option>
                                        <option value="3">Anulado</option>
                                    </select>                                              
                                </div>

                            </div>


                        </div>

                    </div>
                    <div className="tab-pane fade" id="detalle" role="tabpanel" aria-labelledby="detalle-tab">

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
                                                                                    index == 1  || index == 0 ? texto
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
                        
                    </div>
                    <div className="tab-pane fade" id="adelanto" role="tabpanel" aria-labelledby="adelanto-tab">
                        
                                        


                        <h4>Adelantos</h4>

                        <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                                <div className="mb-3">
                                    <label htmlFor="tipo_transaccion" className="form-label">Monto</label>
                                    <select name="tipo_transaccion" id="tipo_transaccion" className='form-control'>                                    
                                        <option value="1">Contado</option>
                                        <option value="2">Credito</option>
                                    </select>                                                
                                </div>

                            </div>
                            
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                                <div className="mb-3">
                                    <label htmlFor="estado" className="form-label">Estado</label>
                                    <select name="estado" id="estado" className='form-control'>                                    
                                        <option value="1">Pagado</option>
                                        <option value="2">No pagado</option>
                                        <option value="3">Anulado</option>
                                    </select>                                              
                                </div>

                            </div>


                        </div>

                    </div>

                </div>


                

                </>
            </ContainerInner>
    )
}
