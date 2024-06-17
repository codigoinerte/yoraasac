import React from 'react'
import { ContainerInterface } from '../interfaces'

export const Container = ({children, classContainer}:ContainerInterface) => {
  return (
    <>
        <div className={`main ${classContainer}`}>
            <div className="container">
                {children}
            </div>
        </div>
    </>
  )
}
