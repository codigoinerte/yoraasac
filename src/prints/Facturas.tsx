import React, { forwardRef, useEffect, useState } from 'react'
//import { useNotaHeladeroStore } from '../hooks';
import "/src/prints/assets/css/prints.scss";
import { FormNotaHeladeroDetalleValues, IRootState } from '../interfaces';
import { FormFacturacionDetalleValues, FormFacturacionValues } from '../panel/interfaces'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useConfiguration } from '../hooks';
import { UseFormGetValues } from 'react-hook-form';



interface MyComponentProps {
    // Añade aquí las propiedades del componente si las tiene.
    currentNota: FormFacturacionValues,
    getValues: UseFormGetValues<FormFacturacionValues>
}
const Facturas: React.ForwardRefRenderFunction<HTMLInputElement, MyComponentProps> = (props, ref) => {

    const { active: infoSaved } = useSelector((state:IRootState)=>state.facturacion);
    
    const [fechaOperacion, setFechaOperacion] = useState('');

    const { configuration, loadConfiguration } = useConfiguration();

    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;

    const active = infoSaved?.id_estado == 1 ? infoSaved : props.currentNota;

    const detalle = infoSaved?.id_estado == 1 ? (infoSaved?.detalle ?? []) :  props.currentNota.productos ?? [];

    const getValues = props.getValues;

    useEffect(() => {
      
        const dateNow = active.created_at??new Date();
        const dateCurrent = moment(dateNow).format("YYYY-MM-DD | HH:mm A").toString();
        setFechaOperacion(dateCurrent);

        loadConfiguration();
        
    }, []);
    //70mm
    return (
        <div style={{display:"none"}} key={`print-${active.id}`}>
            <div className='ticket print-container' ref={ref}>
                <div className="contenedor">

                    <div className="line"></div>

                    <div className="text-center">
                        {
                            (configuration?.logo) &&
                            <img src={`${URL_IMAGENES}${configuration.logo}`} className='brand-logo' width={180}  alt="..."/>
                        }
                        {
                            (configuration?.razon_comercial) &&
                            <h4 className='text-center'>{configuration.razon_comercial}</h4>
                        }
                        {
                            (configuration?.ruc) &&
                            <div className='text-center'><small><b>RUC:{configuration.ruc}</b></small></div>
                        }
                        {
                            (configuration?.email_empresa) &&
                            <div className='text-center'><small><b>Email:{configuration.email_empresa}</b></small></div>
                        }
                        {
                            (configuration?.celular) &&
                            <div className='text-center'><small><b>Celular:{configuration?.celular}</b></small></div>
                        }
                        
                    </div>

                    <div className="line"></div>

                    <table className='cabecera'>
                        <tbody>
                            <tr>
                                <td align='center' style={{textAlign: 'center'}}>
                                    <b style={{display:'block',margin:'auto',textAlign:'center'}}>{active?.codigo}</b>
                                </td>
                            </tr>
                            <tr>
                                <td align='left'><b>Cliente</b>: {active?.usuario_nombre}</td>
                            </tr>
                            <tr>
                                <td align='left'><b>Fecha</b>: { fechaOperacion }</td>
                            </tr>
                            <tr>
                                <td align='left'><b>Estado</b>: { active?.estado }</td>
                            </tr>
                            <tr>
                                <td align='left'><b>Moneda</b>: { active?.moneda }</td>
                            </tr>
                            
                        </tbody>
                    </table>

                    <div className="line"></div>
                    
                    <table className='cuerpo auto'>
                        <tbody>
                            <tr key={"title-header"}>
                                <td style={{width: "100%"}} className='text-left'><strong>Producto</strong></td>
                                <td style={{width: "25px"}}><strong>cant</strong></td>
                                <td style={{width: "25px"}}><strong>desc.</strong></td>
                                <td style={{width: "45px"}}><strong>Unit.</strong></td>
                                <td style={{width: "45px"}}><strong>Subtotal</strong></td>
                            </tr>
                            {
                                (detalle) &&
                                    detalle.map((detalle:FormFacturacionDetalleValues)=>(

                                        <tr key={`print-detalle-${detalle.id}`}>
                                            <td className='text-left'>{ detalle.producto }</td>
                                            <td>{ detalle.cantidad }</td>
                                            <td>{ (detalle.descuento && detalle.descuento > 0) ? detalle.descuento : '0%' }</td>
                                            <td>{ (detalle.precio && Number(detalle.precio) > 0) ? detalle.precio : '0.00' }</td>
                                            <td>{ parseFloat((detalle.total??0).toString()).toFixed(2) }</td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>

                    <table className='cabecera'>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="line"></div>
                                </td>
                            </tr>
                            {
                                infoSaved?.id_estado == 1 ?
                                (
                                    <>
                                        {
                                            (getValues('total_monto') && getValues('total_monto') != 0) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Total monto:</b> {parseFloat(getValues('total_monto').toString()).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                        {
                                            (getValues('total_descuento') && getValues('total_descuento') != 0) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Total descuento:</b> {parseFloat(getValues('total_descuento').toString()).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                        {
                                            (getValues('igv') && getValues('igv') != 0 && getValues("tipo") == 2) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Total igv:</b> {parseFloat(getValues('igv').toString()).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                        {
                                            (getValues('total') && getValues('total') !=0) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Total:</b> {parseFloat(getValues('total').toString()).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                    </>
                                ) : ''
                            }
                        </tbody>
                    </table>

                    <div className="separate"></div>

                    <div className="line"></div>
                </div>
            </div>
        </div>
    )
}

const FacturasComponent = forwardRef(Facturas);

export default FacturasComponent;