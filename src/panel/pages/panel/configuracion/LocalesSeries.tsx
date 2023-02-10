import { ContainerInner, FormControls } from "../../../components";
import { breadcrumb as bread } from "../../../interfaces";

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Locales y series', enlace: '' }
];

export const LocalesSeries = () => {


    return(
        <ContainerInner breadcrumb={breadcrumb}>
            <>
                <FormControls page="configuracion" save={()=>console.log(1)} tipo='edit' />

                <hr className='border border-1 opacity-50'/>

                <div className="card">
                    <div className="card-header">
                        Locales y series
                    </div>
                    <div className="card-body">
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Codigo</label>
                                    <input type="text" className="form-control" id="codigo" aria-describedby="codigo" placeholder='Codigo'/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" aria-describedby="nombre" placeholder='Nombre'/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="codigo-sunat" className="form-label">Codigo sunat</label>
                                    <input type="text" className="form-control" id="codigo-sunat" aria-describedby="codigo-sunat" placeholder='Codigo sunat'/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="ubigeo" className="form-label">Ubigeo</label>
                                    <input type="text" className="form-control" id="ubigeo" aria-describedby="ubigeo" placeholder='Pagina web'/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="departamento" className="form-label">Departamento</label>
                                    <select name="departamento" id="departamento" className='form-control'>
                                        <option value="">-Seleccione una opci&oacute;n-</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="provincia" className="form-label">Provincia</label>
                                    <select name="provincia" id="provincia" className='form-control'>
                                        <option value="">-Seleccione una opci&oacute;n-</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="distrito" className="form-label">Distrito</label>
                                    <select name="distrito" id="distrito" className='form-control'>
                                        <option value="">-Seleccione una opci&oacute;n-</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="direccion" className="form-label">Direcci&oacute;n</label>
                                    <input type="text" name="direccion" id="direccion" className='form-control' placeholder='Dirección' />
                                </div>

                            </div>


                        </div>


                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        Series de documentos de venta
                    </div>
                    <div className="card-body">
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Factura</label>
                                    
                                    <div className="row">
                                       
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" className="form-control" id="serie" aria-describedby="serie" placeholder='Serie' defaultValue="F001"/>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" className="form-control" id="correlativo" aria-describedby="correlativo" placeholder='Correlativo' defaultValue="1"/>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Boleta</label>
                                    
                                    <div className="row">
                                       
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="serie" aria-describedby="serie" placeholder='Serie'/>
                                       </div>
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="correlativo" aria-describedby="correlativo" placeholder='Correlativo'/>
                                       </div>

                                    </div>

                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                <div className="mb-3">
                                    <label htmlFor="codigo-sunat" className="form-label">Nota de credito</label>
                                    
                                    <div className="row">
                                       
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="serie" aria-describedby="serie" placeholder='Serie'/>
                                       </div>
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="correlativo" aria-describedby="correlativo" placeholder='Correlativo'/>
                                       </div>

                                    </div>

                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                <div className="mb-3">
                                    <label htmlFor="ubigeo" className="form-label">Nota de debito</label>
                                    
                                    <div className="row">
                                       
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="serie" aria-describedby="serie" placeholder='Serie'/>
                                       </div>
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="correlativo" aria-describedby="correlativo" placeholder='Correlativo'/>
                                       </div>

                                    </div>

                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                <div className="mb-3">
                                    <label htmlFor="departamento" className="form-label">Gu&iacute;a de remisi&oacute;n</label>
                                    <div className="row">
                                       
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="serie" aria-describedby="serie" placeholder='Serie'/>
                                       </div>
                                       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                           <input type="text" className="form-control" id="correlativo" aria-describedby="correlativo" placeholder='Correlativo'/>
                                       </div>

                                    </div>
                                </div>

                            </div>


                        </div>


                    </div>
                </div>

            </>
        </ContainerInner>
    );
}