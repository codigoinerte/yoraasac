import React, { forwardRef, useEffect, useState } from 'react'
//import { useNotaHeladeroStore } from '../hooks';
import "/src/prints/assets/css/prints.scss";
import { FormNotaHeladeroDetalleValues, IRootState } from '../interfaces';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useConfiguration } from '../hooks';



interface MyComponentProps {
    // Añade aquí las propiedades del componente si las tiene.
}
const Notas: React.ForwardRefRenderFunction<HTMLInputElement, MyComponentProps> = (props, ref) => {

    const { active } = useSelector((state:IRootState)=>state.notaHeladero);
    
    const [fechaOperacion, setFechaOperacion] = useState('');

    const { configuration } = useConfiguration();

    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;

    useEffect(() => {
      

        if(active?.fecha_cierre && active.estado == 1){
        
            const dateNow = active.fecha_cierre??new Date();
            const dateCurrent = moment(dateNow).format("YYYY-MM-DD | HH:mm A").toString();
            setFechaOperacion(dateCurrent);
    
        }else{
            let dateNow = moment(new Date()).format("YYYY-MM-DD | HH:mm A").toString();                        
            setFechaOperacion(dateNow);
        }

        
    }, []);
    //70mm
    return (
        <div style={{display:"none"}}>
            <div className='ticket print-container' ref={ref}>
                <div className="contenedor">
                <div className="line"></div>
                    <div className="text-center">
                        {
                            (configuration?.logo) &&
                            <img src={`${URL_IMAGENES}${configuration.logo}`} className='brand-logo'  alt="..."/>
                        }
                        {
                            (configuration?.razon_comercial) &&
                            <h4>{configuration.razon_comercial}</h4>
                        }
                        {
                            (configuration?.ruc) &&
                            <div><small><b>RUC:{configuration.ruc}</b></small></div>
                        }
                        {
                            (configuration?.email_empresa) &&
                            <div><small><b>Email:{configuration.email_empresa}</b></small></div>
                        }
                        {
                            (configuration?.celular) &&
                            <div><small><b>Celular:{configuration?.celular}</b></small></div>
                        }
                        
                    </div>
                <div className="line"></div>
                    <table className='cabecera'>
                        <tbody>
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
                                <td align='left'>
                                    <b>Monto(subtotal):</b> {active?.monto}
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>Pago:</b> {active?.pago}
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>ahorro:</b> {active?.ahorro}
                                </td>
                            </tr>
                            <tr>
                                <td align='left'>
                                    <b>ahorro:</b> {active?.debe}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="line"></div>
                    <table className='cuerpo' >                        
                        <tbody>
                            <tr>
                                <td className='sizeTitle text-left'><strong>Prod.</strong></td>
                                <td className='sizeTitle'><strong>Dev.</strong></td>
                                <td className='sizeTitle'><strong>Ped.</strong></td>
                                <td className='sizeTitle'><strong>Ven.</strong></td>
                                <td className='sizeTitle'><strong>Imp.</strong></td>
                            </tr>
                            {
                                (active?.detalle) &&
                                    active.detalle.map((detalle:FormNotaHeladeroDetalleValues)=>(

                                        <tr key={detalle.id}>
                                            <td className='text-left'>{ detalle.producto }</td>
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
                </div>
            </div>
        </div>
    )
}

const NotasComponent = forwardRef(Notas);

export default NotasComponent;