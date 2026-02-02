import React from 'react'
import { ContainerInterface } from '../interfaces'

export const Container = ({children, classContainer, className}:ContainerInterface) => {
  
  return (
    <>
        <div className={`main py-8 inner-page  flex-1 bg-stone-50 ${classContainer} ${className}`}>
            <div className="container">
                {children}
            </div>
        </div>
    </>
  )
}
