import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ContainerInterface } from '../interfaces'

export const Container = ({children, classContainer, className}:ContainerInterface) => {
  
  return (
    <>
        <div className={twMerge('main inner-page flex-1 bg-stone-50', classContainer, className)}>
            <div className="container">
                {children}
            </div>
        </div>
    </>
  )
}
