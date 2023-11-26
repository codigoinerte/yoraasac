import 'datatables.net';

import { ContainerInner } from "../../../components"
import { StockHistorialHeladoData, breadcrumb as bread } from '../../../interfaces';
import { useStockHeladosHistory } from '../../../../hooks';
import { Table, Pagination, IconButton } from 'rsuite';
import { useEffect, useState } from 'react';

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Stock', enlace: '/stock' },    
    { id:2, titulo: 'Stock Historial de movimientos', enlace: '' },
];
const { Column, HeaderCell, Cell } = Table;
const rowKey = 'id';

const NameDocumentCell = ({ rowData, dataKey, ...props }:any) => {
  let clase = 'text-bg-warning';
  if(rowData.id_tipo_movimiento == 1) clase = 'text-bg-success';
  return (
    <Cell {...props}>
      <span className={`badge ${clase}`}>
        {rowData.documento}
      </span>
    </Cell>
  );
};

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }:any) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key:any) => key === rowData[rowKey]) ? (
          <CollaspedOutlineIcon />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);

const renderRowExpanded = (rowData:any) => {
  return (
    <div>
      <p className='mb-1'><strong>Productos transferidos</strong></p>
      {
        rowData.detalle.length > 0 ? 
        (
          rowData.detalle.map((item:any, i:any)=>{
            return (
              
              <p key={`${rowData.id}${item.id}${i}`}>{item.codigo} - {item.nombre}: {item.cantidad}</p>
              
            )
          })

        ):
        (
          <p>Sin productos transferidos</p>
        )
      }      
    </div>
  );
};

export const StockHistorialHelados = () => {

  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  const { loadStockHelado } = useStockHeladosHistory();
  const [stock, setStock] = useState<StockHistorialHeladoData[]>();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey:any) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = stock !=undefined ? stock.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  }) : [];


  const handleExpanded = (rowData:any, dataKey:any) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach(key => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };


  useEffect(() => {
    loadStockHelado()
    .then((response)=>{

      
      setStock(response.data);

    });

  }, [])
      

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>
            <div>
              <Table 
                height={620} 
                data={data}

                shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table content area height changes.                
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                onRowClick={data => {
                  /*onclick on display */
                }}

                renderRowExpanded={renderRowExpanded}>
                <Column width={50} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded}/>
                </Column>

                <Column fixed>
                  <HeaderCell>codigo</HeaderCell>
                  <Cell dataKey="codigo_movimiento" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>documento</HeaderCell>
                  <NameDocumentCell dataKey="documento"/>
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>num. doc</HeaderCell>
                  <Cell dataKey="numero_documento" />
                </Column>
                <Column width={200}>
                  <HeaderCell>Fecha</HeaderCell>
                  <Cell dataKey="fecha_movimiento" />
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
