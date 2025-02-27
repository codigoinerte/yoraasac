import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerInner, List } from '../../../components';
import { BuscarStockHelado, FormBuscarStockHeladoValues, breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useAlert, useStockHeladosStore } from '../../../../hooks';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHelpers } from '../../../../hooks/useHelpers';

const breadcrumb:bread[] = [
  { id:1, titulo: 'Movimientos', enlace: '/movimiento' },    
  { id:2, titulo: 'Helados', enlace: '' },
];

export const StockHelados = () => {

const buttonPrev = useRef<any>();
const buttonNext = useRef<any>();

const cabecera = [
    "Codigo movimiento",
    "Tipo movimiento",
    "Fecha de movimiento"
];

const { warningDelete } = useAlert();

const [pageActive, setPageActive] = useState<string | null>("1");

const [buscar, setBuscar] = useState<BuscarStockHelado>({
    codigo: null,
    movimiento:null,
    fechaCreacion: null,
    buscar:false
});

const { loadMovimientos, listMovimiento } = useHelpers();
const { status, StockHelado, nextPage, prevPage, loadStockHelado, deleteStockHelado } = useStockHeladosStore();

useEffect(()=>{
    loadMovimientos();
},[]);

useEffect(() => {
    
    loadStockHelado(pageActive!=null ? pageActive : "1", buscar);
    
}, [pageActive, buscar]);

const detalle:listaDetalle[] = StockHelado.map(({ id, codigo_movimiento, movimiento,  created_at}) => ({
    id: id.toString(),
    campos: [
        codigo_movimiento.toString(),
        movimiento??''.toString(),
        created_at.toString()
    ]

}));

const next = (e:paginationInterface) => {
    
    buttonNext.current = e.target;

    if(nextPage == null) 
    {
        // e.currentTarget.setAttribute("disabled", "true");
    }
    else
    {
        // e.currentTarget.removeAttribute("disabled");
        setPageActive(nextPage);
    }

    if(prevPage == null)
    {
        // buttonPrev.current?.removeAttribute("disabled");
    }
   
    
}

const prev = (e:paginationInterface) => {
        
    buttonPrev.current = e.target;

    if(prevPage == null) 
    {
        // e.currentTarget.setAttribute("disabled", "true");
    }
    else
    {
        // e.currentTarget.removeAttribute("disabled");
        setPageActive(prevPage);
    }

    if(nextPage == null)
    {
        // buttonNext.current?.removeAttribute("disabled");
    }
}

const eliminar = (id:number) => {

    warningDelete(async function(){
        
            const result = await deleteStockHelado(id);                

            if(result){
                Swal.fire(
                    'Eliminado!',
                    'Tu registro fue eliminado con exito.',
                    'success'
                )
            }else{
                Swal.fire(
                    'Error',
                    'Hubo un error al momento de ejecutar el proceso vuelva a intentarlo mas tarde',
                    'question'
                  )
            }

        
    });
}

const { register, handleSubmit, reset, formState:{ errors } } = useForm<FormBuscarStockHeladoValues>();

const onSubmit: SubmitHandler<FormBuscarStockHeladoValues> = ({ codigo, movimiento, fechaCreacion }) => {
  
    
    if(codigo != '' || movimiento!= '' || fechaCreacion?.toString() !== "") 
    {
        setPageActive(null);
        setBuscar({codigo, movimiento, fechaCreacion, buscar:true})

    }
    else
    {
        false
        // agregar toast booostrap in version react, buscar alternativa solo codigo

    }
};

const resetQuery = () => {
    
    reset({
        codigo:null,
        fechaCreacion:null,
        movimiento:null
    });

    const buscar = {codigo:null, movimiento:null, fechaCreacion:null, buscar:true};
    
    loadStockHelado("1", buscar);
}

return (
  <ContainerInner breadcrumb={breadcrumb}>
    <List   page='helados'
            category='movimiento'
            cabecera={cabecera} 
            detalle={detalle}            
            eliminar={eliminar}
            next={next}
            prev={prev}
            >
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-xs-12">
                    <h5>Buscador</h5>
                </div>
            </div>
            <div className="row">

                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Codigo</label>
                        <input type="text" 
                                className="form-control" 
                                id="codigo" 
                                aria-describedby="Buscador" 
                                placeholder='codigo'
                                {...register('codigo')}/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="movimiento" className="form-label">Movimiento</label>
                        <select className="form-control" 
                                id="movimiento" 
                                aria-describedby="Buscador" 
                                placeholder='Movimiento'                        
                                {...register('movimiento')}>
                                    <option value="">Seleccione una opción</option>
                            {
                                listMovimiento.map(({ id, movimiento }) => (
                                    <option key={id} value={movimiento.toLowerCase()}>{movimiento}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="mb-3">
                        <label htmlFor="fecha_creacion" className="form-label">Fecha de creaci&oacute;n</label>
                        <input type="date" 
                                placeholder="dd-mm-yyyy" 
                                className="form-control" 
                                id="fecha_creacion" 
                                aria-describedby="fechacreacion"
                                {...register('fechaCreacion')}/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-end">
                    <div className="mb-3 w-100">                                
                        <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Buscar</button>
                        <button onClick={resetQuery} className="btn btn-secondary text-center w-100 mt-1"><i className="bi bi-x-lg"></i> Resetear</button>
                    </div>
                </div>

            </div>
        </form>
        </>
    </List>
  </ContainerInner>
)
}
