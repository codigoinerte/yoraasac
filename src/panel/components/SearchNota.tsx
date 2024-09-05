import { SyntheticEvent, useEffect, useState } from "react"
import { Control, Controller, ValidationRule } from "react-hook-form"
import { SelectPicker } from "rsuite"
import { backendApi } from "../../api"
import { DataNoteIncomplete, NotaIncomplete } from "../../interfaces"

interface Props {
    control: Control<any> | undefined,
    onSearch?: ((searchKeyword: string, event?: SyntheticEvent<Element, Event> | undefined) => void) | undefined
    onChange?: ((value: any, event: SyntheticEvent<Element, Event>) => void) | undefined,
    className?: string | undefined,
    required?: string | ValidationRule<boolean> | undefined,
    setLoadFind?: (nota:DataNoteIncomplete) => void;
    readOnly?: boolean;
    documento?: any;
    //listUsuario: BuscarUsuario[],
    //loadBuscarUsuario: (buscar?: any, type?: string) => Promise<false | undefined>
}

export const SearchNota = ({control, required, className, readOnly = false, documento = null, setLoadFind}: Props) => {

    const [data, setNotaList] = useState<DataNoteIncomplete[]>([])

    const loadBuscarNota = async() =>{
        try {
            const { data } = await backendApi.get<NotaIncomplete>(`/buscar-nota-incompleta`,{
                params: {
                    documento 
                }
            });
            setNotaList(data.data);                
        } catch (error) {
            setNotaList([]);
        }
    }

    useEffect(() => {
        loadBuscarNota();
    }, []);
    
    return (
        <>
            <Controller
                name="numero_documento"
                control={control}
                rules={{required}}                            
                render={({ field }) => 

                    <SelectPicker 
                        {...field}
                        data={data.map((item)=> ({
                            label: item.codigo,
                            value: item.codigo
                        }))} 
                        style={{ width: 224 }}                        
                        placeholder='Buscar Nota'
                        className={ className }
                        onChange={(codigo)=>{
                            const nota = data.find((item)=> item.codigo == codigo);
                            if(setLoadFind && nota)
                                setLoadFind(nota);
                        }}

                        readOnly={readOnly}
                    />

            }/>

        </>
    )
}
