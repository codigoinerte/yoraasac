import { useEffect, useState } from 'react'
import { ContainerInner } from '../../../components'
import { BuscarProductos, FormBuscarProductosValues, Breadcrumb as bread } from '../../../interfaces';
import { useAlert, useProductosStore } from '../../../../hooks';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Table, Pagination } from 'rsuite';
import { Link } from 'react-router-dom';

const breadcrumb:bread[] = [  
    { id:1, titulo: 'Productos', enlace: '' },
];  

const { Column, HeaderCell, Cell } = Table;
const rowKey = 'id';

const DetailCell = ({ rowData, dataKey, eliminar, ...props }:any) => {
    return (
        <Cell {...props}>
            <Link to={`edit/${rowData.id}`} type="button" className="btn btn-sm btn-outline-primary flex-fill me-2"><i className="bi bi-pencil"></i></Link>
            <button onClick={()=> eliminar(rowData.id)} type="button" className="btn btn-sm btn-outline-danger flex-fill"><i className="bi bi-trash3"></i></button>
        </Cell>
    );
  };

export const Productos = () => {

    const { warningDelete } = useAlert();
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(13);
    const [page, setPage] = useState(1);
    
    const [buscar, setBuscar] = useState<BuscarProductos>({
        codigo: null,
        producto:null,
        fechaCreacion: null,
        buscar:false
    });

    const getData = () => {
        if (sortColumn && sortType) {
          return typeof detalle!="undefined" ? detalle.sort((a, b) => {
            let x:any = a[sortColumn]??'';
            let y:any = b[sortColumn]??'';
            
            if (isNaN(Number(x))) {
              x = x!.charCodeAt(0);
            }
            if (isNaN(Number(y))) {
              y = y!.charCodeAt(0);
            }
            if (sortType === 'asc') {
              return x - y;
            } else {
              return y - x;
            }
          }) : [];
        }
        return detalle;
    };

    const handleSortColumn = (sortColumn:any, sortType:any) => {
        setLoading(true);
        setSortColumn(sortColumn);
        setSortType(sortType);
        setLoading(false);
    };

    const handleChangeLimit = (dataKey:any) => {
        setPage(1);
        setLimit(dataKey);
    };

    const { productos, loadProductos, deleteProducto } = useProductosStore();

    useEffect(() => {        
        loadProductos("1", buscar);        
    }, [buscar]);

    const detalle:any[] = productos.map(({ id, codigo, nombre, moneda, precio_venta, estado, created_at_spanish}) => ({
            id,
            codigo:         codigo.toString(),
            nombre:         nombre.toString(),
            moneda:         moneda??''.toString(),
            precio_venta:   precio_venta.toString(),
            estado:         estado??''.toString(),
            created_at:     created_at_spanish.toString()
        
    }))
    .filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

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
        if(!codigo && !producto && !fechaCreacion)  return;
        setBuscar({codigo, producto, fechaCreacion, buscar:true})
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
        <>
        <ContainerInner breadcrumb={breadcrumb}>
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
                <hr />
                <div>
                    <Table 
                        height={620} 
                        data={getData()}
                        shouldUpdateScroll={false}
                        rowKey={rowKey}
                        sortColumn={sortColumn}
                        sortType={sortType}
                        onSortColumn={handleSortColumn}
                        loading={loading}
                        >
                            <Column width={100} align="center" sortable fixed>
                                <HeaderCell>Codigo</HeaderCell>
                                <Cell dataKey="codigo"/>
                            </Column>
                            <Column flexGrow={1} sortable fixed>
                                <HeaderCell>Producto</HeaderCell>
                                <Cell dataKey="nombre" />
                            </Column>
                            <Column width={120}>
                                <HeaderCell>Moneda</HeaderCell>
                                <Cell dataKey="moneda"/>
                            </Column>
                            <Column width={120} sortable>
                                <HeaderCell>Prec. Venta</HeaderCell>
                                <Cell dataKey="precio_venta" />
                            </Column>
                            <Column width={120} sortable>
                                <HeaderCell>Estado</HeaderCell>
                                <Cell dataKey="estado" />
                            </Column>
                            <Column width={120} sortable>
                                <HeaderCell>Fecha de creación</HeaderCell>
                                <Cell dataKey="created_at" />
                            </Column>
                            <Column width={120}>
                                <HeaderCell>Acciones</HeaderCell>
                                <DetailCell dataKey="id" eliminar={eliminar}/>
                            </Column>
                    </Table>
                    <div style={{ padding: 20 }}>
                        <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="md"
                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                        total={productos.length??0}
                        limitOptions={[13, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                        />
                    </div>

                </div>

            </>
        </ContainerInner>
        </>
    )
}
