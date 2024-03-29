import React, { forwardRef, useEffect, useState } from 'react'
import { useNotaHeladeroStore } from '../hooks';
import "/src/prints/assets/css/prints.scss";
import { FormNotaHeladeroDetalleValues } from '../interfaces';
import moment from 'moment';



interface MyComponentProps {
    // Añade aquí las propiedades del componente si las tiene.
}
const Notas: React.ForwardRefRenderFunction<HTMLInputElement, MyComponentProps> = (props, ref) => {

    const {  active  } = useNotaHeladeroStore();

    const [fechaOperacion, setFechaOperacion] = useState('');

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
                    <table className='cabecera'>
                        <tbody>
                            <tr>
                                <td align='left' colSpan={2}>Nombre: {active?.heladero_nombre}</td>                        
                            </tr>
                            <tr>
                                <td align='left'>Fecha: { fechaOperacion }</td>
                            </tr>
                            <tr>
                                <td align='left'>Estado: { active?.estado_nombre }</td>
                                <td align='left'>Moneda: { active?.moneda }</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className='cuerpo'>
                        
                        <tbody>
                            <tr>
                                <td className='sizeTitle'><strong>Dev.</strong></td>
                                <td className='sizeTitle'><strong>Ped.</strong></td>
                                <td className='sizeTitle'><strong>Prod.</strong></td>
                                <td className='sizeTitle'><strong>Ven.</strong></td>
                                <td className='sizeTitle'><strong>Imp.</strong></td>
                            </tr>
                            {
                                (active?.detalle) &&
                                    active.detalle.map((detalle:FormNotaHeladeroDetalleValues)=>(

                                        <tr key={detalle.id}>

                                            <td width={15}>{ detalle.devolucion??0 }</td>
                                            <td width={15}>{ detalle.pedido??0 }</td>
                                            <td>{ detalle.producto }</td>
                                            <td width={15}>{ detalle.vendido??0 }</td>
                                            <td width={15}>{ detalle.importe??0 }</td>

                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const NotasComponent = forwardRef(Notas);

export default NotasComponent;