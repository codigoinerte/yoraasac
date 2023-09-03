import React, { useEffect, useState } from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { breadcrumb as bread } from '../../../interfaces';
import { useAuthStore, useDireccion } from '../../../../hooks';
import { AuhtUserObject } from '../../../../interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';

const breadcrumb:bread[] = [    
    { id:1, titulo: 'Mi cuenta', enlace: '' }
];


export const MiCuenta = () => {

    const [show, setShow] = useState(true);
    
    const [icon, setIcon] = useState("bi bi-eye");

    const { user, updateAccount } = useAuthStore();

    const { loadDireccion, loadProvincias, loadDistritos, departamentos, provincias, distritos } = useDireccion();

    const { register, handleSubmit, setValue} = useForm<AuhtUserObject>({
            defaultValues:{ ...user }
    });

    useEffect(() => {
        
        const { departamento: iddepa = 0, provincia:idprov = 0, distrito:iddis = 0} = user;

        loadDireccion()
        .then(()=>{

            setValue("departamento", iddepa);

            loadProvincias(iddepa)
            .then((responseProvincia)=>{
    
                if(responseProvincia && idprov!=0){
                
                    setValue('provincia', idprov);
        
                    loadDistritos(idprov)
                    .then((response) => {
        
                        if(response){
                            setTimeout(() => {
                                setValue('distrito', iddis);
                            }, 10);
                        }
                    });
                    
        
                }
    
            });

        });        

        


    }, []);    


    const showHidePassword = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        const inputPassword = document.getElementById("password") as HTMLInputElement | null;
        if(show){
            setIcon("bi bi-eye-slash");
            setShow(false);
            if(inputPassword!=null) inputPassword.type = "text";
        }else{        
            setIcon("bi bi-eye");
            setShow(true);
            if(inputPassword!=null) inputPassword.type = "password";
        }    
    }

    const onSubmit: SubmitHandler<AuhtUserObject> = (params:AuhtUserObject)=>{
        updateAccount(params);
    }
    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <>
                    <FormControls page="micuenta" save={()=>console.log(1)} tipo='edit' />

                    <hr className='border border-1 opacity-50'/>

                    <div className="card">
                        <div className="card-header">
                            Mis datos de contacto
                        </div>
                        <div className="card-body">
                            
                            <div className="row">
                                
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">                                
                                    <div className="mb-3">
                                        <label htmlFor="nombre_contacto" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" placeholder='Nombre' {...register('name')}/>
                                    </div>                            
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                    <div className="mb-3">
                                        <label htmlFor="celular_contacto" className="form-label">Celular</label>
                                        <input type="tel" className="form-control" placeholder='Celular' {...register("celular")}/>
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                                
                                    <div className="mb-3">
                                        <input type="hidden" name="" />
                                        <label htmlFor="departamento" className="form-label">Departamento</label>
                                        <select id="departamento" className='form-control' {...register("departamento", { onChange: (e)=> loadProvincias(e.target.value), value: user.departamento })}>
                                            {
                                                [{ id: 0, nombre: 'Seleccione una opción' }, ...departamentos]
                                                .map(( { id, nombre } ) => (
                                                    <option value={id} 
                                                            // selected={id == user.departamento ? true : false}
                                                            key={id}>{nombre}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                    
                                    <div className="mb-3">
                                        <label htmlFor="provincia" className="form-label">Provincia</label>
                                        <select className='form-control' {...register("provincia", { onChange: (e)=> loadDistritos(e.target.value) })}>
                                            {                                           
                                                
                                                [{ id: 0, nombre: 'Seleccione una opción' }, ...provincias]
                                                .map(( { id, nombre } ) => (
                                                    <option value={id} 
                                                            key={id} >{nombre}</option>
                                                ))                                                                                        
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                    
                                    <div className="mb-3">
                                        <label htmlFor="distrito" className="form-label">Distrito</label>
                                        <select className='form-control' {...register("distrito")}>
                                            {
                                                [{ id: 0, nombre: 'Seleccione una opción' }, ...distritos]                                            
                                                .map(( { id, nombre } ) => (
                                                    <option value={id} 
                                                            key={id} >{nombre}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                        
                                    <div className="mb-3">
                                        <label htmlFor="direccion" className="form-label">Direcci&oacute;n</label>
                                        <input type="text" className="form-control" placeholder='Dirección' {...register("direccion")}/>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            Mis datos de login
                        </div>
                        <div className="card-body"> 

                            <div className="row">

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        
                                <div className="mb-3">
                                    <label htmlFor="email_contacto" className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder='Email' {...register("email")} autoComplete='new-email'/>
                                </div>

                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contrase&ntilde;a</label>
                                        <div className="input-group mb-3">
                                            <input type="password" className="form-control" id="password" placeholder="contraseña" {...register("password")} autoComplete='new-password'/>
                                            <button className="btn btn-primary" type="button"  onClick={showHidePassword}><i className={icon}></i></button>
                                        </div>
                                    </div>

                                </div>                                        
                            
                            </div>

                        </div>
                    </div>
            </>
            </form>
        </ContainerInner>
    )
}
