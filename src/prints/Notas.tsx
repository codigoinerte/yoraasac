import React, { forwardRef, useEffect, useState } from 'react'
//import { useNotaHeladeroStore } from '../hooks';
import "/src/prints/assets/css/prints.scss";
import { FormNotaHeladeroDetalleValues, IRootState } from '../interfaces';
import { FormNotaHeladeroValues } from '../panel/interfaces'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useConfiguration } from '../hooks';
import { UseFormGetValues } from 'react-hook-form';



interface MyComponentProps {
    // Añade aquí las propiedades del componente si las tiene.
    currentNota: FormNotaHeladeroValues,
    getValues: UseFormGetValues<FormNotaHeladeroValues>
}
const Notas: React.ForwardRefRenderFunction<HTMLInputElement, MyComponentProps> = (props, ref) => {

    const { active: infoSaved } = useSelector((state:IRootState)=>state.notaHeladero);
    
    const [fechaOperacion, setFechaOperacion] = useState('');

    const { configuration, loadConfiguration } = useConfiguration();

    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;

    const active = infoSaved?.estado == 1 ? infoSaved : props.currentNota;

    const detalle = infoSaved?.estado == 1 ? (infoSaved?.detalle ?? []) :  props.currentNota.productos ?? [];

    const getValues = props.getValues;

    useEffect(() => {
      
        if(active?.fecha_cierre && active.estado == 1){
        
            const dateNow = active.fecha_cierre??new Date();
            const dateCurrent = moment(dateNow).format("YYYY-MM-DD | HH:mm A").toString();
            setFechaOperacion(dateCurrent);
    
        }else{
            let dateNow = moment(new Date()).format("YYYY-MM-DD | HH:mm A").toString();                        
            setFechaOperacion(dateNow);
        }

        loadConfiguration();
        
    }, []);
    //70mm
    return (
        <div style={{display:"none"}}>
            <div className='ticket print-container' ref={ref}>
                <div className="contenedor">
                {
                    infoSaved?.estado != 1 ?
                    (
                        <>
                        <div className="line"></div>

                        <h2 className='text-center vista-previa'>Vista Previa</h2>
                        
                        </>
                    ) : ''
                }
                <div className="line"></div>
                    <div className="text-center">
                        {
                            (configuration?.logo) &&
                            <img src={`${URL_IMAGENES}${configuration.logo}`} className='brand-logo'  alt="..."/>
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
                                <td align='left'><b>Heladero</b>: {active?.heladero_nombre}</td>
                            </tr>
                            <tr>
                                <td align='left'><b>Fecha</b>: { fechaOperacion }</td>
                            </tr>
                            <tr>
                                <td align='left'><b>Estado</b>: { active?.estado_nombre }</td>
                            </tr>
                            <tr>
                                <td align='left'><b>Moneda</b>: { active?.moneda }</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line"></div>
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>Cargo por baterias:</b> {getValues('cargo_baterias') ? getValues('cargo_baterias').toFixed(2) : 0.00}
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>Vendido:</b> {getValues('monto') ? getValues('monto').toFixed(2) : 0.00 }
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>Deuda anterior:</b> {getValues('deuda_anterior') ? getValues('deuda_anterior').toFixed(2): 0.00}
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>Monto(subtotal):</b> {getValues('subtotal') ? getValues('subtotal').toFixed(2) : 0.00}
                                </td>
                            </tr>
                            {
                                infoSaved?.estado == 1 ?
                                (
                                    <>
                                        {
                                            (getValues('pago') != 0) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Pago:</b> {getValues('pago')}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                        {
                                            (getValues('ahorro') != 0) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Ahorro:</b> {getValues('ahorro')}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                        {
                                            (getValues('debe') !=0) ?
                                            (
                                                <tr>
                                                    <td align='left'>
                                                        <b>Debe:</b> {getValues('debe')}
                                                    </td>
                                                </tr>
                                            ) : ''
                                        }
                                    </>
                                ) : ''
                            }
                        </tbody>
                    </table>
                    <div className="line"></div>
                    <table className='cuerpo' >                        
                        <tbody>
                            <tr>
                                <td className='sizeTitle text-left'><strong>Prod.</strong></td>
                                <td className='sizeTitle'><strong>Gua.</strong></td>
                                <td className='sizeTitle'><strong>Dev.</strong></td>
                                <td className='sizeTitle'><strong>Ped.</strong></td>
                                <td className='sizeTitle'><strong>Ven.</strong></td>
                                <td className='sizeTitle'><strong>Imp.</strong></td>
                            </tr>
                            {
                                (detalle) &&
                                    detalle.map((detalle:FormNotaHeladeroDetalleValues)=>(

                                        <tr key={detalle.id}>
                                            <td className='text-left'>{ detalle.producto }</td>
                                            <td width={10}>{ detalle.devolucion_today??0 }</td>
                                            <td width={10}>{ detalle.devolucion??0 }</td>
                                            <td width={10}>{ detalle.pedido??0 }</td>
                                            <td width={10}>{ detalle.vendido??0 }</td>
                                            <td width={10}>{ detalle.importe??0 }</td>

                                        </tr>
                                    ))
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

const NotasComponent = forwardRef(Notas);

export default NotasComponent;