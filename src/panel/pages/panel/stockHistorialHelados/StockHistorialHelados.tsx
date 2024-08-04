
import { ContainerInner } from "../../../components"
import { StockHistorialHeladoData, breadcrumb as bread } from '../../../interfaces';
import { usePrintCsv, useStockHeladosHistory } from '../../../../hooks';
import { Table, Pagination, IconButton } from 'rsuite';
import { useEffect, useState } from 'react';

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';

import { useForm } from "react-hook-form";
import moment from "moment";

type FormValues = {
  buscar: string
}

const breadcrumb:bread[] = [
    { id:1, titulo: 'Reportes', enlace: '/reportes' },
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
              
              <p key={`${rowData.id}${item.id}${i}`}><b>{item.codigo} - {item.nombre}:</b>  Cantidad por cajas: {item.caja_cantidad} | Cajas: {item.caja} | Total unidades: {item.cantidad}</p>
              
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

  const fileName = `stockhistorialhelados${Math.floor(new Date().getTime() / 1000)}`;
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  const { loadStockHelado } = useStockHeladosHistory();
  const [stock, setStock] = useState<StockHistorialHeladoData[]>();
  const [stockOriginal, setOriginalStock] = useState<StockHistorialHeladoData[]>();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const { print } = usePrintCsv();

  const { register, handleSubmit, reset } = useForm<FormValues>({});
  const onSubmit = handleSubmit(({buscar = ''}) => {
    if(buscar == "") {
      setStock(stockOriginal);
      return false;
    }
    /*buscar por terminos*/
    let resultadoBusqueda = stock?.filter((item)=> item.codigo_movimiento.toLowerCase().includes(buscar.toLowerCase()) || item.documento.toLowerCase().includes(buscar.toLowerCase()) || item.numero_documento.toLowerCase().includes(buscar.toLowerCase()) || item.fecha_movimiento.toLowerCase().includes(buscar.toLowerCase()));
    setStock(resultadoBusqueda);
    /*buscar por terminos*/
  });

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
      setOriginalStock(response.data);

    });

  }, [])
const resetForm = () => {
  reset();
  setStock(stockOriginal);
}
/*export to excel*/
const exportToExcel = async() => {
  
  print(stock?.map(({ codigo_movimiento, created_at, documento, numero_documento })=> ({ codigo_movimiento, documento, numero_documento, created_at: moment(created_at).format("DD-MM-YYYY") })), fileName);
}
/*export to excel*/
      

    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>
            <form className="d-flex flex-wrap gap-2" onSubmit={onSubmit}>
              <input type="text" className="form-control w-auto flex-fill" placeholder="Ingrese su busqueda" {...register("buscar")} />
              <button className="btn btn-primary" type="submit">Buscar</button>
              <button className="btn btn-info" type="button" onClick={resetForm}>Resetear</button>
              <button className="btn btn-info" type="button" onClick={exportToExcel}>Exportar</button>
            </form>
            <hr />
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
