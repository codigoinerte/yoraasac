import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components'
import '../assets/css/style.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore } from '../../hooks';

type FormValues = {
  email: string;
  password: string;  
};

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Auth = () => {

  const { startLogin, errorMessage } = useAuthStore();

  const [error, setError] = useState<String | undefined>();
  
  useEffect(() => {
   
    setError(errorMessage);

  }, [])
  
  const { register, handleSubmit, formState:{ errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({email, password }) => {
    
    startLogin({ email, password });
    
  };
  
  return (
      <Container title='Iniciar sesi&oacute;n*'>
          <>
           
            <form method='POST' onSubmit={handleSubmit(onSubmit)} >
            {  
              error != undefined &&             
              (
                <div className="alert alert-danger" role="alert">Error en la autenticacion, { error }</div>
              )
            }
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo*</label>
                <input 
                      type="email" 
                      className="form-control" 
                      {...register("email", { required:true, pattern: regexEmail  })} />
                      {errors?.email && <div className="invalid-feedback d-block">Debe completar este campo</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contrase&ntilde;a*</label>
                <input 
                      type="password" 
                      className="form-control" 
                      {...register("password", { required:true })} />
                      {errors?.password && <div className="invalid-feedback d-block">Debe completar este campo</div>}
              </div>              
              <button type="submit" className="btn btn-primary w-100">Iniciar sesi&oacute;n</button>
            </form>

            <Link to="/auth/recuperar-password" className='d-block mt-3 w-100 text-center'>Recuperar contrase&ntilde;a</Link>
          </>
      </Container>                             
  )
}
