import React from 'react'

export const Loader = () => {
  return (
    <div className='loader fixed-top fixed-bottom d-flex justify-content-center align-items-center bg-white '>
        <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
