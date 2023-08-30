import {  Menu } from '../interfaces'
export const CategoryList = (menu: Menu, loadMenuSelecteds:Function) => {

    const { id, nombre = '', children } = menu; //checked
  return (
        <li key={id}>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={(ele)=>loadMenuSelecteds(ele)} value={menu.id}/>

                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                    {nombre}
                    
                    {
                        !!children && children.length > 0 &&
                        (
                            <ul>
                                {
                                    children.map((item) => CategoryList(item, loadMenuSelecteds))
                                }
                            </ul>
                        )
                    }
                </label>
            </div>
        </li>
  )
}
