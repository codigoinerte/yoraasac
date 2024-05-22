import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormPersonasValues, PersonalForm, deleImagenPersona } from '../../interfaces'
import { FormControls } from '../FormControls';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore, useDireccion, usePersonasStore } from '../../../hooks';
import { Toaster } from 'react-hot-toast';
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

        
    const { id = 0 } = useParams();   

    const { user } = useAuthStore();

    const { type = 3 } = user ?? {};
    
    const { active } = useSelector((state:IRootState)=>state.personas);

    const { register, handleSubmit, formState, setValue } = useForm<FormPersonasValues>({
        defaultValues: {
           foto_frontal: active?.foto_frontal,
           foto_posterior: active?.foto_posterior
        },
    });

    const { errors } = formState;
    
    const { loadDireccion, loadProvincias, loadDistritos,departamentos, provincias, distritos } = useDireccion();

    const { savePersona, updatePersona, getPersona, deleteImagenPersona } = usePersonasStore();

    const dispatch = useDispatch();

    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;

    const [address, setAddress] = useState({
        iddepartamento : 0,
        idprovincia : 0,
        iddistrito : 0,
    });
    
    useEffect(() => {
                            
        if(id == 0){            
            loadDireccion();
            dispatch(onSetPersonasActive(null));
        }
        else{                        
            getPersona(parseInt(id))
            .then(async (user)=>{
                
                setValue('nombres', user?.name);
                setValue('documento', user?.documento);
                setValue('apellidos', user?.apellidos);
                setValue('celular', user?.celular);
                setValue('direccion', user?.direccion);
                setValue('foto_frontal', active?.foto_frontal);
                setValue('foto_posterior', active?.foto_posterior);
                setValue('email', active?.email);
                if((type == 1 || type == 2) && tipo == 6){
                    let usuario_activo = active?.usuario_tipo ? parseInt(active?.usuario_tipo) : 0;
                    setValue('usuario_tipo', usuario_activo);
                }

                const callback1  = loadDireccion();
                const callback2 = loadProvincias(user?.iddepartamento);
                const callback3  = loadDistritos(user?.idprovincia);

                await Promise.all([callback1, callback2, callback3]);

                setAddress({
                    iddepartamento : user?.iddepartamento,
                    idprovincia : user?.idprovincia,
                    iddistrito : user?.iddistrito,
                });
                
            });

        }
        
    }, []);

    useEffect(() => {
        
        setValue('foto_frontal', active?.foto_frontal);
        setValue('foto_posterior', active?.foto_posterior);

    }, [active]);

    useEffect(() => {
        setValue('departamento', address.iddepartamento ?? 0);        
    }, [departamentos, address.iddepartamento, document.getElementById("departamento")?.querySelectorAll("option").length]);

    useEffect(() => {
        setValue('provincia', address.idprovincia ?? 0);
    }, [provincias, address.idprovincia, document.getElementById("provincia")?.querySelectorAll("option").length]);

    useEffect(() => {
        setValue('distrito', address.iddistrito ?? 0);
    }, [distritos, address.iddistrito, document.getElementById("distrito")?.querySelectorAll("option").length]);
    
   const deleteImagen = async (imagen:deleImagenPersona) =>{

        await deleteImagenPersona({
            ...imagen,
            id: parseInt(id.toString()),
        });

        if(imagen.foto_frontal){
            setValue('foto_frontal', '');
        }
        if(imagen.foto_posterior){
            setValue('foto_posterior', '');
        }
   }

    const onSubmit: SubmitHandler<FormPersonasValues> = async ({ documento, nombres, apellidos, celular, departamento, provincia, distrito, direccion, email, password, foto_frontal, foto_posterior, img_frontal, img_posterior, usuario_tipo =  tipo}) => {
        
        if(!!active?.id){
            await updatePersona({ 
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
                usuario_tipo, //: typeof tipo != "undefined" ? tipo : 0 ,

                foto_frontal,
                foto_posterior,

                img_frontal,
                img_posterior,
            });

        }else{

            await savePersona({ 
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
                usuario_tipo, //: typeof tipo != "undefined" ? tipo : 0 ,

                foto_frontal,
                foto_posterior,

                img_frontal,
                img_posterior,
            });
        }

        setValue('img_frontal', undefined);
        setValue('img_posterior', undefined);
        
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
                        {
                            tipo == 5 ? (
                                <>
                                    <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label">Proveedor</label>
                                            <input  type="text" 
                                                    className={errors.nombres ? "form-control is-invalid" : "form-control"}
                                                    id="nombre" 
                                                    aria-describedby="nombre" 
                                                    autoComplete='new-name'
                                                    {...register('nombres', {  required: "Debe de completar el nombre del proveedor" })} />
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombres</label>
                                        <input  type="text" 
                                                className={errors.nombres ? "form-control is-invalid" : "form-control"}
                                                id="nombre" 
                                                aria-describedby="nombre" 
                                                autoComplete='new-name'
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
                                </>
                            )
                        }
                        
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
                            <select id="departamento"
                                    className='form-control'
                                    {...register('departamento', { onChange: (e)=> loadProvincias(e.target.value) })}>
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
                            <select id="distrito" 
                                    className='form-control' 
                                    {...register('distrito')}>
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
                    tipo != 5 &&
                    (
                        <>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card">
                                        <div className="card-body">       
                                        <h5 className='mb-2 text-black'>Foto frontal</h5>                           
                                        <input type="file" className="form-control" {...register('img_frontal')}/>
                                        <input type="hidden" {...register('foto_frontal', {
                                            value: active?.foto_frontal
                                        })}/>
                                        </div>
                                        {
                                            (active?.foto_frontal) &&(
                                                <div className="position-relative">
                                                    <button 
                                                        type='button' 
                                                        className='btn btn-danger position-absolute top-0 end-0'
                                                        onClick={()=>{ deleteImagen({ foto_frontal: active.foto_frontal }) }}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                    <img src={`${URL_IMAGENES}${active.foto_frontal}`} className="card-img-bottom" alt="..."/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card">
                                        
                                        <div className="card-body">
                                        <h5 className='mb-2 text-black'>Foto Posterior</h5>
                                        <input type="file" className="form-control" {...register('img_posterior')}/>
                                        <input type="hidden" {...register('foto_posterior', {
                                            value: active?.foto_posterior
                                        })}/>

                                        </div>                                        
                                        {
                                            (active?.foto_posterior) &&(
                                                <div className="position-relative">
                                                    <button 
                                                        type='button' 
                                                        className='btn btn-danger position-absolute top-0 end-0'
                                                        onClick={()=>{ deleteImagen({ foto_posterior: active.foto_posterior }) }}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                    <img src={`${URL_IMAGENES}${active.foto_posterior}`} className="card-img-bottom" alt="..."/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    ((type == 1 || type == 2) && tipo == 6) &&(
                        <>
                            <div className="row mt-3">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className='mb-2 text-black'>Tipo de usuario</h5>
                                            <select className='form-control' {...register('usuario_tipo')}>
                                                <option value="">-Seleccionar-</option>
                                                <option value="6">Personal</option>
                                                <option value="1">Administrador</option>
                                                <option value="2">Editor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    tipo == 6 &&
                    (
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <h4 className='text-black fs-6 mt-2 mb-2'>Datos de acceso</h4>
                            </div>
                            <div className="col-xs 12 col-sm-12 col-md-6">
                                <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input  type="email" 
                                                className="form-control" 
                                                id="email" 
                                                aria-describedby="email" 
                                                autoComplete='new-email'
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
                                                    autoComplete='new-password'
                                                    {...register('password', {  required: ((active?.id) ? false : true) })} />
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
