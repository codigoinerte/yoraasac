import { useEffect, useState } from 'react'

import { BuscarPersonas, PersonalList, FormBuscarPersonasValues } from '../../interfaces'
import { useAlert, usePersonasStore } from '../../../hooks';
import { Loader } from '../Loader';
import { SubmitHandler, useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

import { Table, Pagination } from 'rsuite';
import { Link } from 'react-router-dom';

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

export const ListPersonal = ({ tipo = 4 }:PersonalList) => {

    const { register, handleSubmit, reset } = useForm<FormBuscarPersonasValues>();
    
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(13);
    const [page, setPage] = useState(1);

    const [pageActive, setPageActive] = useState<string | null>("1");
    
    const [buscar, setBuscar] = useState<BuscarPersonas>({
        documento: null,
        nombres:null,
        fechaCreacion: null,
        buscar:false
    });

    const { status, personas, loadPersonas, deletePersona } = usePersonasStore();

    const { warningDelete } = useAlert();

    useEffect(() => {
        
        loadPersonas(tipo, pageActive!=null ? pageActive : "1", buscar);
        
    }, [pageActive, buscar]);

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

    const eliminar = (id:number) => {

        warningDelete(async function(){
            
                const result = await deletePersona(id);                

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

    const detalle:any[] = personas.map(({ id, documento, name, apellidos, created_at, created_at_spanish}) => ({
            id: id.toString(),
            documento: documento.toString(),
            nombres: `${name} ${apellidos}`,
            create_at: (created_at_spanish??(created_at??'')).toString()                    
    }));

    const onSubmit: SubmitHandler<FormBuscarPersonasValues> = ({ documento, nombres, fechaCreacion }) => {
        if(!documento && !nombres && !fechaCreacion) return;
        setPageActive(null);
        setBuscar({documento, nombres, fechaCreacion, buscar:true})
    };
    
    const resetQuery = () => {
        
        reset({
            documento:null,
            fechaCreacion:null,
            nombres:null
        });

        const buscar = {documento:null, nombres:null, fechaCreacion:null, buscar:true};
        
        loadPersonas(tipo, "1", buscar);
    }

  return (
    <>
        {
            (status === true) &&
            (

                <Loader />
            )
            
        }

        <form onSubmit={handleSubmit(onSubmit)}> 
            <div className="row">
                <div className="col-xs-12">
                    <h5>Buscador</h5>
                </div>
            </div>
            <div className="row">

                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="documento" className="form-label">Documento</label>
                        <input  type="text" 
                                className="form-control" 
                                id="documento" 
                                aria-describedby="Buscador" 
                                placeholder='Documento'
                                {...register('documento')}/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="mb-3">
                        <label htmlFor="nombres" className="form-label">Nombre y apellido</label>
                        <input  type="text" 
                                className="form-control" 
                                id="nombres" 
                                aria-describedby="Buscador" 
                                placeholder='Nombre y/o apellido'
                                {...register('nombres')}/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
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
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row justify-content-center align-items-end gap-3 ">
                    
                    <button className="btn btn-primary text-center w-100" type="submit"><i className="bi bi-search"></i> Buscar</button>
                    <button onClick={resetQuery} className="btn btn-secondary text-center w-100 mt-1"><i className="bi bi-x-lg"></i> Resetear</button>
                    <Link to={`new`} className="btn btn-primary text-center w-100">Nuevo</Link>
                    
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
                    <Column width={140} align="center" sortable fixed>
                        <HeaderCell>Documento</HeaderCell>
                        <Cell dataKey="documento"/>
                    </Column>
                    <Column flexGrow={1} sortable fixed>
                        <HeaderCell>Nombre</HeaderCell>
                        <Cell dataKey='nombres' />
                    </Column>
                    <Column width={140} sortable>
                        <HeaderCell>Fecha de creación</HeaderCell>
                        <Cell dataKey="create_at" />
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
                total={personas.length??0}
                limitOptions={[13, 30, 50]}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
             
    </>
  )
}
