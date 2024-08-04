import { ContainerInner } from "../../../components"
import { StockData, breadcrumb as bread } from '../../../interfaces';
import { useStock } from '../../../../hooks';
import { Table, Pagination } from 'rsuite';
import { useEffect, useState } from 'react';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
    { id:2, titulo: 'Stock restante', enlace: '' },
];
const { Column, HeaderCell, Cell } = Table;

const TotalCell = ({ rowData, dataKey, ...props }:any) => {
  let clase = 'text-bg-success';
  if(rowData.total < rowData.stock_alerta) clase = 'text-bg-danger';
  return (
    <Cell {...props}>
      <span className={`badge ${clase}`}>
        {rowData.total}
      </span>
    </Cell>
  );
};

export const StockRestante = () => {

  const { loadStockHelado } = useStock();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<StockData[]>([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey:any) => {
    setPage(1);
    setLimit(dataKey);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return typeof stock!="undefined" ? stock.sort((a, b) => {
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


  const handleSortColumn = (sortColumn:any, sortType:any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const data = stock !=undefined ? stock.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  }) : [];


  useEffect(() => {
    loadStockHelado()
    .then((response)=>{      
      setStock(response.data.map((item:StockData, i:number)=>{
        
        let cantidad_cajas = item.cantidad_caja ?? 0;
        let entrantes = item.entrantes ?? 0;
        let salientes = item.salientes ?? 0;
        let total = entrantes-salientes;
        let cajas_restantes = total > 0 ? Math.ceil(total / cantidad_cajas) : 0;

        return {
            ...item,
            id:i+1,
            total,
            cajas_restantes
        }
      }));

    });

  }, [])
      

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>
            <div>
              <Table 
                height={850} 
                data={getData()}                
                onRowClick={data => {
                  /*onclick on display */
                }}
                
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}

                >
                <Column width={50} align="center" resizable sortable>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id"/>
                </Column>

                <Column width={110} resizable sortable>
                  <HeaderCell>codigo</HeaderCell>
                  <Cell dataKey="codigo" />
                </Column>

                <Column width={220} flexGrow={1} resizable sortable>
                  <HeaderCell>nombre</HeaderCell>
                  <Cell dataKey="nombre" />
                </Column>
                <Column width={90} resizable sortable>
                  <HeaderCell>cant. alerta</HeaderCell>
                  <Cell dataKey="stock_alerta" />
                </Column>
                <Column width={80} resizable sortable>
                  <HeaderCell>cant. caja</HeaderCell>
                  <Cell dataKey="cantidad_caja" />
                </Column>                
                <Column width={80} resizable sortable>
                  <HeaderCell>Entradas</HeaderCell>
                  <Cell dataKey="entrantes" />
                </Column>
                <Column width={80} resizable sortable>
                  <HeaderCell>Salidas</HeaderCell>
                  <Cell dataKey="salientes" />
                </Column>
                <Column width={110} resizable sortable>
                  <HeaderCell>Total (unid.)</HeaderCell>
                  <TotalCell dataKey="total" />
                </Column>
                <Column width={110} resizable sortable>
                  <HeaderCell>Cajas restantes</HeaderCell>
                  <Cell dataKey="cajas_restantes" />
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
                  total={stock?.length??0}
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
