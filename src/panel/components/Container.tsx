import React from 'react'
import { ContainerInterface } from '../interfaces'

export const Container = ({children}:ContainerInterface) => {
  return (
    <>
        <div className="main">
            <div className="container">
                {children}
            </div>
        </div>
    </>
  )
}
