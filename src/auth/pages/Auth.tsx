import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components'

export const Auth = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }
  
  return (
      <Container title='Iniciar sesi&oacute;n'>
          <>
            <form method='POST' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />                    
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contrase&ntilde;a</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 form-check p-0">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Recuerdame</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Iniciar sesi&oacute;n</button>
            </form>

            <Link to="/auth/recuperar-password" className='d-block mt-3 w-100 text-center'>Recuperar contrase&ntilde;a</Link>
          </>
      </Container>                             
  )
}
