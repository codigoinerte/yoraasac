import React from 'react'
import { Link } from 'react-router-dom'
import { AccessInterface } from '../interfaces'

export const AccessCategory = ({ Menu }:AccessInterface) => {
  return (    
        <ul className='atajos-homes row'>
           
           {
                Menu.map(({nombre, icono, alias}, index)=>(
                    <li key={alias} className='col-xs-6 col-sm-6 col-md-4 col-lg-3'>
                        <Link to={alias}>
                        <i className={icono}></i>
                        <span>{nombre}</span>
                        </Link>
                    </li>
                ))
           }
            
        </ul>    
  )
}
