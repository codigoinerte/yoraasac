import React from 'react'
import { ContainerInterface } from '../interfaces'

export const Container = ({title, children}: ContainerInterface) => {
    return (
    <div className='auth-container'>
            
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">{ title??'' }</h5>
                {
                    children
                }
            </div>
        </div>          

    </div>
    )
}
