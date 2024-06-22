import React from 'react'
import { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { FormNotaHeladeroValues } from '../interfaces'
interface Props {
    register : UseFormRegister<FormNotaHeladeroValues>,
    getValues : UseFormGetValues<FormNotaHeladeroValues>,
    index: number,
    is_litro?: boolean
}
export const InputNotaGuardada = ({ register, getValues, index, is_litro = false }:Props) => {
  return (
    <input type="number" className='form-control' {...register(`productos.${index}.devolucion`, {
        min: 0,
        onChange: (e) => {
            const devolucion = 0; //getValuesOrigin(`productos`).find((item)=> item.codigo == getValues(`productos.${index}.codigo`))?.devolucion ?? 0;
            const pedido = getValues(`productos.${index}.pedido`) ?? 0;
            let menor = (parseInt(pedido.toString())+parseInt(devolucion.toString()));
            let valorIngresado = parseInt(e.target.value);

            if(is_litro){
                menor = (parseFloat(pedido.toString())+parseFloat(devolucion.toString()));
                valorIngresado = parseFloat(e.target.value);
            }

            if(valorIngresado <= 0 || valorIngresado > menor ){
                e.target.value = 0;
            }else{
                if(is_litro){
                    e.target.value = parseFloat((e.target.value).toString());
                }else{
                    e.target.value = parseInt((e.target.value).toString());
                }
            }
        }
    })} 
    step={is_litro ? 0.1 : 1}
    readOnly={getValues(`productos.${index}.pedido`) == 0}
    />
  )
}
