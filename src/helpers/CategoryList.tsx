import React from 'react'
import { CategoryListInterface } from '../interfaces'

export const CategoryList = ({id, name, children}: CategoryListInterface) => {

  return (
        <li key={id}>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                    {name}
                    
                    {
                        !!children && children.length > 0 &&
                        (
                            <ul>
                                {
                                    children.map(CategoryList)
                                }
                            </ul>
                        )
                    }
                </label>
            </div>
        </li>
  )
}
