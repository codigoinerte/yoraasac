import { useEffect, useRef, useState } from 'react'
import { ContainerInner, List } from '../../../components'
import { BuscarProductos, FormBuscarProductosValues, Breadcrumb as bread, listaDetalle, paginationInterface } from '../../../interfaces';
import { useAlert, useProductosStore } from '../../../../hooks';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';

const breadcrumb:bread[] = [  
    { id:1, titulo: 'Productos', enlace: '' },
];  

export const Productos = () => {

    const { warningDelete } = useAlert();

    const [pageActive, setPageActive] = useState<string | null>("1");
    
    const [buscar, setBuscar] = useState<BuscarProductos>({
        codigo: null,
        producto:null,
        fechaCreacion: null,
        buscar:false
    });

    const buttonPrev = useRef<any>();
    const buttonNext = useRef<any>();

    const cabecera = [
        "Código",
        "Producto",
        "Moneda",
        "Prec. venta",
        "Estado",
        "Fecha de creación"
    ];
    
    const { productos, nextPage, prevPage, loadProductos, deleteProducto } = useProductosStore();

    useEffect(() => {
        
        loadProductos(pageActive!=null ? pageActive : "1", buscar);
        
    }, [pageActive, buscar]);

    const detalle:listaDetalle[] = productos.map(({ id, codigo, nombre, moneda, precio_venta, estado,  created_at}) => ({
            id: id.toString(),
            campos: [
                codigo.toString(),
                nombre.toString(),
                moneda??''.toString(),
                precio_venta.toString(),
                estado??''.toString(),
                created_at.toString()
            ]
        
    }));

    const next = (e:paginationInterface) => {
        console.log(1);
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
            
                const result = await deleteProducto(id);                

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

    const { register, handleSubmit, reset} = useForm<FormBuscarProductosValues>();

    const onSubmit: SubmitHandler<FormBuscarProductosValues> = ({ codigo, producto, fechaCreacion }) => {
      
        
        if(codigo != '' || producto!= '' || fechaCreacion?.toString() !== "") 
        {
            setPageActive(null);
            setBuscar({codigo, producto, fechaCreacion, buscar:true})

        }
        else
        {
            // false
            // agregar toast booostrap in version react, buscar alternativa solo codigo

        }
    };

    const resetQuery = () => {
        
        reset({
            codigo:null,
            fechaCreacion:null,
            producto:null
        });

        const buscar = {codigo:null, producto:null, fechaCreacion:null, buscar:true};
        
        loadProductos("1", buscar);
    }

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <List   page='productos'
                    cabecera={cabecera} 
                    detalle={detalle}                    
                    eliminar={eliminar}
                    next={next}
                    prev={prev}>
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
                                <label htmlFor="codigo" className="form-label">Código</label>
                                <input  type="text" 
                                        className="form-control" 
                                        id="codigo" 
                                        aria-describedby="Buscador" 
                                        placeholder='Código'
                                        {...register('codigo')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="producto" className="form-label">Producto</label>
                                <input  type="text" 
                                        className="form-control" 
                                        id="producto" 
                                        aria-describedby="Buscador" 
                                        placeholder='Productos'
                                        {...register('producto')}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="mb-3">
                                <label htmlFor="fecha_creacion" className="form-label">Fecha de creaci&oacute;n</label>
                                <input  type="date" 
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
