import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ContainerInner, FormControls, RequiredField } from '../../../components'
import { FormProductosValues, Breadcrumb as bread } from '../../../interfaces';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHelpers, useProductosStore } from '../../../../hooks';

import { SelectPicker } from 'rsuite';
import { validateNoNegative } from '../../../../helpers';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Productos', enlace: '/productos' },
    { id:2, titulo: 'Productos detalle', enlace: '' }
];


export const ProductosDetalle = () => {


        const { listUnpsc,
                listEstados,
                listMarcas,
                listUnidades,
                listMonedas,
                listIgv,

                loadUnspsc,
                loadEstados,
                loadMarcas,
                laodUnidades,
                loadMoneda,
                loadIgv, } = useHelpers();

  let searchUNPSC = true;
  const { register, handleSubmit, formState, setValue, getValues, control } = useForm<FormProductosValues>();

  const { errors } = formState;
  

      
  const { id = 0 } = useParams();   

  const { saveProducto, updateProducto, getProducto } = useProductosStore();
  
  const calcularPrecioFinal = ()=>{
    let p = getValues('precio_venta')??0;
    let d = getValues('descuento')??0;
    
    let precio_final = p - (p*(d/100));
    
    
    precio_final = precio_final < 0 ?  0 : precio_final;
    setValue('precio_final', precio_final);

  }

  const calcularPrecioFinalMayor = ()=>{
    let p = getValues('precio_venta_mayor')??0;
    let d = getValues('descuento_venta_mayor')??0;

    let precio_final = p - (p*(d/100));
    precio_final = precio_final < 0 ?  0 : precio_final;
    setValue('total_venta_mayor', precio_final);
  }
  
  const calcularPrecioFinalHeladero = ()=>{
    let p = getValues('heladero_precio_venta')??0;
    let d = getValues('heladero_descuento')??0;
    
    let precio_final = p - (p*(d/100));
    
    
    precio_final = precio_final < 0 ?  0 : precio_final;
    setValue('heladero_precio_final', precio_final);

  }

  const updateData = (buscar:string)=>{
    
    if(typeof buscar == "undefined") return false;

    loadUnspsc(buscar);
  }

  const initLoadContent = async () => {
    await loadEstados();
    await loadMarcas();
    await laodUnidades();
    await loadMoneda();
    await loadIgv();

    if(id == 0){

        setValue('estados_id', 1);
        setValue('igv_id', 1);
        setValue('moneda_id', 1);
        setValue('unidad_id', 1);

    }else{
        const prod = await getProducto(id);

        let unspsc_id = prod?.unspsc_id??'';

        if(unspsc_id != '' && searchUNPSC){
          await loadUnspsc(unspsc_id, 'codigo');
          searchUNPSC=false;
        }
      
        setValue('codigo', prod?.codigo);
        setValue('nombre', prod?.nombre);
        setValue('marcas_id', prod?.marcas_id);
        setValue('unspsc_id',prod?.unspsc_id);
        setValue('estados_id', prod?.estados_id);
        setValue('stock_alerta', prod?.stock_alerta);
        setValue('unidad_id', prod?.unidad_id)
        setValue('igv_id', prod?.igv_id);
        setValue('moneda_id',prod?.moneda_id);
        setValue('precio_venta', prod?.precio_venta);
        setValue('descuento', prod?.descuento);
        setValue('destacado', prod?.destacado);
        setValue('heladero_descuento', prod?.heladero_descuento);
        setValue('heladero_precio_venta', prod?.heladero_precio_venta);
        setValue('precio_venta_mayor', prod?.precio_venta_mayor);
        setValue('descuento_venta_mayor', prod?.descuento_venta_mayor);
        setValue('cantidad_caja', prod?.cantidad_caja);
        setValue('proveedor_precio', prod?.proveedor_precio);
        setValue('is_litro', prod?.is_litro);
        setValue('is_barquillo', prod?.is_barquillo);

        calcularPrecioFinal();
        calcularPrecioFinalHeladero();
        calcularPrecioFinalMayor();
    }

  }

  useEffect(() => {  
    initLoadContent();
  }, []);
  
  const onSubmit: SubmitHandler<FormProductosValues> = ({ 
    codigo, 
    nombre,
    marcas_id,
    unspsc_id,
    estados_id,
    stock_alerta,
    unidad_id,
    igv_id,
    moneda_id,
    precio_venta,
    descuento,
    destacado,
    heladero_precio_venta,
    heladero_descuento,
    precio_venta_mayor,
    descuento_venta_mayor,
    total_venta_mayor,
    cantidad_caja,
    proveedor_precio,
    is_barquillo,
    is_litro }) => {
            
    if(id == 0){
      // nuevo
      saveProducto({
        codigo,
        nombre,
        orden:1,
        stock_alerta,
        precio_venta,
        descuento,
        destacado,
        estados_id,
        unspsc_id,
        marcas_id,
        unidad_id,
        moneda_id,
        igv_id,
        precio_final:0,
        heladero_precio_venta,
        heladero_descuento,
        heladero_precio_final : 0,
        cantidad_caja,
        proveedor_precio,
        is_litro,
        is_barquillo,

        precio_venta_mayor,
        descuento_venta_mayor,
        total_venta_mayor,
        
      });
    }else{
      updateProducto({
        codigo,
        nombre,
        orden:1,
        stock_alerta,
        precio_venta,
        descuento,
        destacado,
        estados_id,
        unspsc_id,
        marcas_id,
        unidad_id,
        moneda_id,
        igv_id,
        precio_final:0,
        heladero_precio_venta,
        heladero_descuento,
        heladero_precio_final : 0,
        cantidad_caja,
        proveedor_precio,
        is_litro,
        is_barquillo,

        precio_venta_mayor,
        descuento_venta_mayor,
        total_venta_mayor,
        
      });
    }
    
  };

  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControls page="productos" save={()=>handleSubmit(onSubmit)} funcNew={()=>{
              window.location.href = '/productos/new';
            }}/>

            <hr className='border border-1 opacity-50'/>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  
                <h4>Informaci&oacute;n</h4>
                
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Codigo de producto</label>
                    <input  type="text" 
                            id="codigo" 
                            aria-describedby="codigo"
                            className={errors.codigo ? "form-control is-invalid" : "form-control"}
                            {...register('codigo', {required: true})} />
                    { (getValues("codigo")?.toString() == "" || errors.codigo) && <RequiredField/> }
                </div>

                <div className="mb-3">
                    <label htmlFor="nombreproducto" className="form-label">Nombre de producto</label>
                    <input  type="text" 
                            id="nombreproducto" 
                            aria-describedby="nombreproducto"
                            className={errors.nombre ? "form-control is-invalid" : "form-control"}
                            {...register('nombre', {required:true})} />
                    { (getValues("nombre")?.toString() == "" || errors.nombre) && <RequiredField/> }
                </div>

                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <select id="marca" 
                            className='form-control'
                            {...register('marcas_id')}>
                            <option value="0">-Seleccione una marca-</option>
                            {
                              listMarcas.map(({ nombre, id }, index)=>(
                                <option value={id} key={id.toString()}>{nombre}</option>
                              ))
                            }
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="tipoproducto" className="form-label">Tipo de producto (UNSPSC SUNAT)</label>
                    
                    <div className="d-block">
                      

                      <Controller
                          name="unspsc_id"
                          control={control}
                          rules={{required:true}}
                          render={({ field }) => 
                          
                          <>
                          <div ref={field.ref}>
                            <SelectPicker
                                {...field} 
                                data={listUnpsc.map((item)=>({
                                  label: item.descripcion,
                                  value: item.id
                                }))}
                                style={{ width: 224 }}
                                //onOpen={updateData}
                                onSearch={updateData}
                                //renderMenu={updateData}                          
                                //onChange={handleChangeTipo} 
                                placeholder='Buscar UNSPSC de SUNAT'                             
                                className={getValues("unspsc_id")?.toString() == "" || errors.unspsc_id ? "form-control is-invalid p-0" : "form-control p-0"}
                            />
                            { (getValues("unspsc_id")?.toString() == "" || errors.unspsc_id) && <RequiredField/>}
                          </div>
                          </>
                      }/>

                 


                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select id="estado" 
                            className={errors.estados_id ? "form-control is-invalid" : "form-control"}
                            {...register('estados_id',{required:true})}>
                            {
                              listEstados.map(({ estado, id }, index)=>(
                                <option value={id} key={id.toString()}>{estado}</option>
                              ))
                            }
                    </select>
                </div>

                                              

                

                <div className="mb-3">
                      <label htmlFor="preciofinal" className="form-label">Stock alerta</label>
                      <input  type="number" 
                              className="form-control" 
                              id="preciofinal" 
                              aria-describedby="preciofinal"
                              step={1}
                              defaultValue={0}
                              {...register('stock_alerta')} />
                </div>

                <div className="mb-3">
                    <label htmlFor="destacado" className="form-label">Destacado</label>
                    <select id="destacado" 
                            defaultValue={0}
                            className={errors.destacado ? "form-control is-invalid" : "form-control"}
                            {...register('destacado', {required:true})}>
                      <option value="0">No destacado</option>
                      <option value="1">Destacado</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="unidad" className="form-label">Unidad</label>
                    <select id="unidad" 
                            defaultValue={1}
                            className={errors.unidad_id ? "form-control is-invalid" : "form-control"}
                            {...register('unidad_id',{required:true})}>
                            {
                              listUnidades.map(({ simbolo, id }, index)=>(
                                <option value={id} key={id.toString()}>{simbolo}</option>
                              ))
                            }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="tipoigv" className="form-label">Tipo de IGV</label>
                    <select id="tipoigv"                             
                            className={errors.igv_id ? "form-control is-invalid" : "form-control"}
                            {...register('igv_id',{required:true})}>
                            {
                              listIgv.map(({ nombre, id }, index)=>(
                                <option value={id} key={id.toString()}>{nombre}</option>
                              ))
                            }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="tipoigv" className="form-label m-0 text-dark">Es helado de 5 litros</label>
                    <select id="is_litro" {...register('is_litro')} className='form-control'>
                      <option value={1} key={1}>Si</option>
                      <option value={0} key={2}>No</option>
                    </select>                    
                </div>
                <div className="mb-3">
                    <label htmlFor="tipoigv" className="form-label m-0 text-dark">El producto es barquillo</label>
                    <select id="is_barquillo" {...register('is_barquillo')} className='form-control'>
                      <option value={0} key={2}>No</option>
                      <option value={1} key={1}>Si</option>
                    </select>                    
                </div>

                  
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                
                <div className="mb-3">
                    <label htmlFor="moneda" className="form-label">Moneda</label>
                    <select id="moneda"                             
                            className={errors.moneda_id ? "form-control is-invalid" : "form-control"}
                            {...register('moneda_id',{required:true})}>
                            {
                              listMonedas.map(({ moneda, id }, index)=>(
                                <option value={id} key={id.toString()}>{moneda}</option>
                              ))
                            }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="cantidad_caja" className="form-label">Cantidad por caja</label>
                    <input type="text" id="cantidad_caja" className={errors.cantidad_caja ? "form-control is-invalid" : "form-control"} {...register('cantidad_caja',{required:true})} />
                    { (getValues("cantidad_caja")?.toString() == "" || errors.cantidad_caja) && <RequiredField/>}
                </div>
                
                <div className="card p-3 mb-3">
                  <h5>Precio de venta (por menor) a público general</h5>
                  <div className="mb-3">
                      <label htmlFor="precioventa" className="form-label">Precio de venta</label>
                      <input  type="text" 
                              id="precioventa" 
                              aria-describedby="precioventa" 
                              defaultValue={0}
                              className={errors.precio_venta ? "form-control is-invalid" : "form-control"}
                              onKeyUp={(e)=> setValue('precio_venta', validateNoNegative(e))}
                              {...register('precio_venta',{
                                onChange: calcularPrecioFinal,
                                required:true
                              })}/>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="descuento" className="form-label">Descuento</label>
                      <div className="input-group mb-3">
                        <input  type="number" 
                                className="form-control" 
                                aria-describedby="precio-descuento" 
                                min={0} 
                                step={1} 
                                max={100}
                                onKeyUp={(e)=>{ setValue('descuento', validateNoNegative(e)); } }
                                defaultValue={0}
                                {...register('descuento', {
                                  onChange: calcularPrecioFinal
                                })}/>
                        <span className="input-group-text" id="precio-descuento">%</span>
                      </div>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="preciofinal" className="form-label">Precio final</label>
                      <input  type="text" 
                              className="form-control" 
                              id="preciofinal" 
                              aria-describedby="preciofinal"
                              //disabled={true}
                              defaultValue={0}
                              {...register('precio_final')} />
                  </div>
                </div>

                <div className="card p-3 mb-3">
                  <h5>Precio de venta (por mayor) a público general</h5>
                  <div className="mb-3">
                      <label htmlFor="precioventa" className="form-label">Precio de venta</label>
                      <input  type="text" 
                              id="precioventa" 
                              aria-describedby="precioventa" 
                              defaultValue={0}
                              className={errors.precio_venta ? "form-control is-invalid" : "form-control"}
                              onKeyUp={(e)=> setValue('precio_venta_mayor', validateNoNegative(e))}
                              {...register('precio_venta_mayor',{
                                onChange: calcularPrecioFinalMayor,
                                required:true
                              })}/>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="descuento" className="form-label">Descuento</label>
                      <div className="input-group mb-3">
                        <input  type="number" 
                                className="form-control" 
                                aria-describedby="precio-descuento" 
                                min={0} 
                                step={1} 
                                max={100}
                                onKeyUp={(e)=>{ setValue('descuento_venta_mayor', validateNoNegative(e)); } }
                                defaultValue={0}
                                {...register('descuento_venta_mayor', {
                                  onChange: calcularPrecioFinalMayor
                                })}/>
                        <span className="input-group-text" id="precio-descuento">%</span>
                      </div>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="preciofinal" className="form-label">Precio final</label>
                      <input  type="text" 
                              className="form-control" 
                              id="preciofinal" 
                              aria-describedby="preciofinal"
                              //disabled={true}
                              defaultValue={0}
                              {...register('total_venta_mayor')} />
                  </div>
                </div>

                <div className="card p-3 mb-3">
                  <h5>Precio de venta a heladeros</h5>
                  <div className="mb-3">
                      <label htmlFor="precioventa" className="form-label">Precio de venta</label>
                      <input  type="text" 
                              id="precioventa" 
                              aria-describedby="precioventa" 
                              defaultValue={0}
                              className={errors.precio_venta ? "form-control is-invalid" : "form-control"}
                              onKeyUp={(e)=> setValue('heladero_precio_venta', validateNoNegative(e))}
                              {...register('heladero_precio_venta',{
                                onChange: calcularPrecioFinalHeladero,
                                required:true
                              })}/>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="descuento" className="form-label">Descuento</label>
                      <div className="input-group mb-3">
                        <input  type="number" 
                                className="form-control" 
                                aria-describedby="precio-descuento" 
                                min={0} 
                                step={1} 
                                max={100}
                                onKeyUp={(e)=>{ setValue('heladero_descuento', validateNoNegative(e)); } }
                                defaultValue={0}
                                {...register('heladero_descuento', {
                                  onChange: calcularPrecioFinalHeladero
                                })}/>
                        <span className="input-group-text" id="precio-descuento">%</span>
                      </div>
                  </div>
                  
                  <div className="mb-3">
                      <label htmlFor="preciofinal" className="form-label">Precio final</label>
                      <input  type="text" 
                              className="form-control" 
                              id="preciofinal" 
                              aria-describedby="preciofinal"
                              //disabled={true}
                              defaultValue={0}
                              {...register('heladero_precio_final')} />
                  </div>
                </div>

                <div className="card p-3">
                  <h5>Precio de compra a proveedores</h5>
                  <div className="mb-3">
                      <label htmlFor="proveedorprecio" className="form-label">Precio de compra</label>
                      <input  type="text" 
                              id="proveedorprecio" 
                              aria-describedby="proveedorprecio" 
                              defaultValue={0}
                              className={errors.precio_venta ? "form-control is-invalid" : "form-control"}
                              onKeyUp={(e)=> setValue('proveedor_precio', validateNoNegative(e))}
                              {...register('proveedor_precio',{
                                required:true
                              })}/>
                  </div>                                    
                </div>

              </div>


            </div>
          </form>
        </>
    </ContainerInner>
  )
}
