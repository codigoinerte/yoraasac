import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormPersonasValues, PersonalForm } from '../../interfaces'
import { FormControls } from '../FormControls';

import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { useDireccion, usePersonasStore } from '../../../hooks';
import { toast, Toaster } from 'react-hot-toast';
import { validateNumber } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../interfaces';
import { onSetPersonasActive } from '../../../store';
/*
    1: cliente
    2: proveedor
    3: personal
    4: heladero

*/
export const FormPersonal = ({category, page, tipo }:PersonalForm) => {

    const { register, handleSubmit, reset, formState, setValue } = useForm<FormPersonasValues>();

    const { errors } = formState;
        
    const { id = 0 } = useParams();   

    const { active } = useSelector((state:IRootState)=>state.personas);

    const { loadDireccion, loadProvincias, loadDistritos,departamentos, provincias, distritos } = useDireccion();

    const { savePersona, updatePersona, getPersona } = usePersonasStore();

    const dispatch = useDispatch();

    useEffect(() => {
            
        
        
        if(id == 0){            
            loadDireccion();
            dispatch(onSetPersonasActive(null));
        }
        else{                        
            getPersona(parseInt(id))
            .then((user)=>{
                
                setValue('nombres', user?.name);
                setValue('documento', user?.documento);
                setValue('apellidos', user?.apellidos);
                setValue('celular', user?.celular);
                setValue('direccion', user?.direccion);

                loadDireccion()
                .then((dep)=>{

                    if(user?.iddepartamento !=0 && dep){
    
                        setValue('departamento', user?.iddepartamento??'');
    
                        loadProvincias(user?.iddepartamento)
                        .then((prov)=>{
                            
                            if(user?.idprovincia != 0 && prov)
                            {
                                setValue('provincia', user?.idprovincia??'');

                                loadDistritos(user?.idprovincia)
                                .then((dis)=>{
                                    
                                    if(user?.iddistrito != 0 && dis){
                                        setValue('distrito', user?.iddistrito??'');                
    
                                    }
    
                                })                                
                                
                            }
                        })
    
    
                    }
                })

                

                
            });

        }
        
    }, []);

    // useEffect(() => {
        
    //     if(!!active?.iddepartamento)
    //         loadProvincias(active?.iddepartamento);

    // }, [active?.iddepartamento]);

    // useEffect(() => {
        
    //     if(!!active?.idprovincia)
    //         loadDistritos(active?.idprovincia);

    // }, [active?.idprovincia]);
    
    
   

    const onSubmit: SubmitHandler<FormPersonasValues> = ({ documento, nombres, apellidos, celular, departamento, provincia, distrito, direccion, email, password }) => {                
        
        if(!!active?.id){
            updatePersona({ 
                documento,
                nombres,
                apellidos,
                celular,
                departamento,
                provincia,
                distrito,
                direccion,
                email,
                password,
                documento_tipo: (tipo == 5) ? 4 : 2,
                usuario_tipo: typeof tipo !== undefined ? tipo : 0 
            });

        }else{

            savePersona({ 
                documento,
                nombres,
                apellidos,
                celular,
                departamento,
                provincia,
                distrito,
                direccion,
                email,
                password,
                documento_tipo: (tipo == 5) ? 4 : 2,
                usuario_tipo: typeof tipo !== undefined ? tipo : 0 
            });
        }
        
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControls category={category} page={page}/>

                <hr className='border border-1 opacity-50'/>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        
                        <h4>Informaci&oacute;n</h4>
                        
                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">{ tipo == 5 ? 'RUC' : 'DNI' }</label>
                            <div className="input-group">
                                <input type="text" 
                                        id="dni" 
                                        className={errors.documento ? "form-control is-invalid" : "form-control"}
                                        placeholder="00000000" 
                                        aria-label="DNI" 
                                        maxLength={ tipo == 5 ? 11 : 8}
                                        pattern = "[0-9]+"
                                        onKeyUp={validateNumber}
                                        {...register('documento', {  required: "Debe de completar el DNI", maxLength: (tipo == 5) ? 11 : 8, minLength: (tipo == 5) ? 11 : 8 })} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombres</label>
                            <input  type="text" 
                                    className={errors.nombres ? "form-control is-invalid" : "form-control"}
                                    id="nombre" 
                                    aria-describedby="nombre" 
                                    {...register('nombres', {  required: "Debe de completar el nombre" })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos</label>
                            <input  type="text" 
                                    className={errors.apellidos ? "form-control is-invalid" : "form-control"}
                                    id="apellidos" 
                                    aria-describedby="apellidos"
                                    {...register('apellidos', {  required: "Debe de completar el apellido" })}  />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="celular" className="form-label">Celular</label>
                            <input  type="tel" 
                                    className="form-control" 
                                    id="celular" 
                                    aria-describedby="celular"
                                    {...register('celular')} />
                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                        <h4>Direcci&oacute;n</h4>
                                                
                        <div className="mb-3">
                            <label htmlFor="departamento" className="form-label">Departamento</label>
                            <select 
                                    id="departamento"
                                    className='form-control'
                                    {...register('departamento', { onChange: (e)=> loadProvincias(e.target.value) })} >
                                <option value="">-seleccione una opcion-</option>
                                {
                                    departamentos.map(( { id, nombre } ) => (
                                        <option value={id} 
                                                key={id}>{nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="provincia" className="form-label">Provincia</label>
                            <select id="provincia" 
                                    className='form-control' 
                                    {...register('provincia', { onChange: (e)=> loadDistritos(e.target.value) })}>
                                <option value="">-seleccione una opcion-</option>
                                {
                                    provincias.map(( { id, nombre } ) => (
                                        <option value={id} 
                                                key={id} >{nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="distrito" className="form-label">Distrito</label>
                            <select id="distrito" className='form-control' {...register('distrito')}>                                                                
                                <option value="">-seleccione una opcion-</option>
                                {
                                    distritos.map(( { id, nombre } ) => (
                                        <option value={id} 
                                                key={id} >{nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="direccion" className="form-label">Direcci&oacute;n</label>
                            <input type="text" className="form-control" id="direccion" aria-describedby="direccion"  {...register('direccion')} />
                        </div>

                    </div>
                    
                </div>  

                {
                    tipo == 6 &&
                    (
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <h4>Datos de acceso</h4>
                            </div>
                            <div className="col-xs 12 col-sm-12 col-md-6">
                                <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input  type="email" 
                                                className="form-control" 
                                                id="email" 
                                                aria-describedby="email" 
                                                {...register('email', {  required: true })} />
                                </div>      
                            </div>
                            <div className="col-xs 12 col-sm-12 col-md-6">
                                <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input  type="password" 
                                                    className="form-control" 
                                                    id="password" 
                                                    aria-describedby="password" 
                                                    {...register('nombres', {  required: true })} />
                                </div>
                            </div>
                        </div>

                    )                    
                }

                <Toaster position="top-right" reverseOrder={true} />

            </form>
        </>
    )
}
