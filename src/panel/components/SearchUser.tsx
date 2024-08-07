import { SyntheticEvent } from "react"
import { Control, Controller, ValidationRule } from "react-hook-form"
import { SelectPicker } from "rsuite"
import { BuscarUsuario } from "../interfaces"

interface Props {
    control: Control<any> | undefined,
    onSearch?: ((searchKeyword: string, event?: SyntheticEvent<Element, Event> | undefined) => void) | undefined
    onChange?: ((value: any, event: SyntheticEvent<Element, Event>) => void) | undefined,
    className?: string | undefined,
    required?: string | ValidationRule<boolean> | undefined,
    listUsuario: BuscarUsuario[],
    loadBuscarUsuario: (buscar?: any, type?: string) => Promise<false | undefined>
}
export const SearchUser = ({ control, onSearch, onChange, className, required , listUsuario, loadBuscarUsuario }: Props) => {

    const updateData = (buscar:string) => {
        
        if(typeof buscar == "undefined") return false;
        
        loadBuscarUsuario(buscar);        
    }

    return (
        <Controller
            name="user_id"
            control={control}
            rules={{required}}                            
            render={({ field }) => 

            <SelectPicker   
                    {...field}                      
                    data={
                        listUsuario.map((usuario)=>({
                            label: `${usuario.documento??''} - ${usuario.name??''} ${usuario.apellidos??''}`,
                            value: usuario.id??''
                        }))
                    }
                    style={{ width: 224 }}                        
                    onSearch={updateData}
                    onChange={onChange}
                    placeholder='Buscar Usuario'
                    className={ className }
                />
            
            
        }/>
    )
}
