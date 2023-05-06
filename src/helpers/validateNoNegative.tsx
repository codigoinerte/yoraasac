import React from 'react'

export const validateNoNegative = (e:any) => {
    return parseInt(e.currentTarget.value)<0?0:e.currentTarget.value
}
