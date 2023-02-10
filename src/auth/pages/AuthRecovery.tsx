import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components'

export const AuthRecovery = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  return (
    <Container title='Recuperar contrase&ntilde;a'>
          <>
            <form method='POST' onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email@ejemplo.com'/>                    
              </div>
             
              <button type="submit" className="btn btn-primary w-100">Enviar correo de recuperaci&oacute;n</button>
            </form>

            <Link to="/auth/" className='d-block mt-3 w-100 text-center'>Iniciar sesi&oacute;n</Link>
          </>
      </Container>
  )
}
