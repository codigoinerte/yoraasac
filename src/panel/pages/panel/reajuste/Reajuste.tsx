import { Pagination, Table } from 'rsuite';
import { ContainerInner } from '../../../components'
import { breadcrumb as bread} from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { FormReajustesValues, Reajuste as ReajusteType } from '../../../../interfaces';
import { useAlert, useReajusteStore } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const breadcrumb:bread[] = [
    { id:1, titulo: 'Stock', enlace: '/stock' },    
    { id:2, titulo: 'Reajuste', enlace: '' },
];
const { Column, HeaderCell, Cell } = Table;
const rowKey = 'id';
const Detail = ({ rowData, dataKey, eliminar, ...props }:any) => {
  return (
    <Cell {...props}>
      <div className='d-flex gap-2'>
        <Link to={`/stock/reajuste/edit/${rowData.id}`} type="button" className="btn btn-sm btn-outline-primary"><i className="bi bi-eye"></i></Link>
        <button onClick={()=> eliminar(rowData.id)} type="button" className="btn btn-sm btn-outline-danger"><i className="bi bi-trash3"></i></button>
      </div>
    </Cell>
  );
};

export const Reajuste = () => {

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [reajuste, setReajuste] = useState<ReajusteType[]>([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const { status, loadReajustes, deleteReajuste } = useReajusteStore();

  const { register, handleSubmit } = useForm<FormReajustesValues>({});

  const { warningDelete } = useAlert();

  const navigate = useNavigate();

  const onNavigateBack = () => {
      navigate(-1);
  }

  const handleChangeLimit = (dataKey:any) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleSortColumn = (sortColumn:any, sortType:any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return typeof reajuste!="undefined" ? reajuste.sort((a, b) => {
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
    return data;
  };

  const data = reajuste !=undefined ? reajuste.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  }) : [];

  const onSubmit = () => {

  }

  const eliminar = (id:number) => {

    warningDelete(async function(){
        
            const result = await deleteReajuste(id);                

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

  useEffect(() => {

    loadReajustes().then((response) => {
      setReajuste(response.map((item, i)=>({...item, rowKey: (i+1)})))
    })
    
  }, []);
  

  return (
    <ContainerInner breadcrumb={breadcrumb}>
        <>
            <div className="d-flex gap-2">
              <div>
                <button type="button" onClick={() => { window.location.href = "/stock/reajuste/new" }} className="btn btn-primary btn-lg flex-fill">Nuevo</button>
              </div>
              <div>
                <button type='button' onClick={onNavigateBack} className="btn btn-danger btn-lg flex-fill">Atr&aacute;s</button>
              </div>
            </div>
            <form className="d-none flex-wrap gap-2" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" className="form-control w-auto flex-fill" placeholder="Ingrese su busqueda" {...register("buscar")} />
              <button className="btn btn-primary" type="submit">Buscar</button>              
            </form>
            <hr />
            <div>
              <Table 
                height={620}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                rowKey={rowKey}
                rowHeight={57}
                loading={loading}>
                <Column fixed width={50}>
                  <HeaderCell>#</HeaderCell>
                  <Cell dataKey="rowKey" />
                </Column>
                <Column fixed flexGrow={1}>
                  <HeaderCell>codigo</HeaderCell>
                  <Cell dataKey="codigo" />
                </Column>
                <Column width={200}>
                  <HeaderCell>codigo ingreso</HeaderCell>
                  <Cell dataKey="codigo_ingreso" />
                </Column>
                <Column width={200}>
                  <HeaderCell>codigo salida</HeaderCell>
                  <Cell dataKey="codigo_ingreso" />
                </Column>
                <Column width={200}>
                  <HeaderCell>fecha reajuste</HeaderCell>
                  <Cell dataKey="fecha_reajuste" />
                </Column>
                <Column width={200} >
                  <HeaderCell>Acciones</HeaderCell>
                  <Detail eliminar={eliminar} />
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
                  total={reajuste?.length??0}
                  limitOptions={[10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
    </div>
            </>
    </ContainerInner>
  )
}
