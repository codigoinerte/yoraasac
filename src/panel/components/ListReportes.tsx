import { useNavigate } from 'react-router-dom';
import { ReportList } from '../interfaces'
import { IconButton, Popover, Table, Tooltip, Whisper } from 'rsuite';
import { useEffect, useState } from 'react';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
const { Cell } = Table;
const rowKey = 'Documento';
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }:any) => {
    return (
        <Cell {...props} style={{ padding: 5 }}>
            <IconButton
                appearance="subtle"
                onClick={() => {
                    onChange(rowData);
                }}
                icon={
                    expandedRowKeys.some((key:any) => key == rowData[rowKey]) ? (
                    <CollaspedOutlineIcon />
                    ) : (
                    <ExpandOutlineIcon />
                    )
                }
            />
            {rowData[dataKey] ?? ''}
        </Cell>
    );
}

const renderRowExpanded = (rowData:any) => {
    let key = '';
    let n = 0;
    for(let i in rowData){
        key = (n == 0) ? i : '';
       break;
    }
    return (
      <div>
        
        <p>Documento: {rowData[key] ?? ''}</p>
        { rowData['popupContent'].split(',').map((item:any, i:number) => <p key={i}>{item}</p>) }
      </div>
    );
  };

const CustomCell = ({ index = 0, rowData, dataKey, showTooltip = false, expandedRowKeys, handleExpanded, ...props }:any) => {
    
    let value = '';
    
    for(let e in rowData ){
        if(e==dataKey){
            value = rowData[e];
        }
    }

    const popupContent = rowData["popupContent"] ?? '';
    
    // const tooltip = (
    //     <Popover title="Observaciones de notas">
    //     <p><b>Heladero:</b> {rowData["Nombre"] ?? ''}</p>
    //     {
    //         popupContent.split(',').map((item:any) => <p>{item}</p>)
    //     }
    //   </Popover>        
    // )

    return (
        <>
            {
                showTooltip && !!popupContent ? 
                (
                    <ExpandCell 
                        rowData={rowData}
                        dataKey={dataKey} 
                        expandedRowKeys={expandedRowKeys} 
                        onChange={handleExpanded} 
                        {...props}/>
                ) : (
                    <Cell {...props}>                                                       
                        <div dangerouslySetInnerHTML={{ __html:value  }} />                        
                    </Cell>
                )
            }
        
        </>
    );
};

export const ListReportes = ({cabecera, detalle, descargar, next = function(){}, prev = function(){}, children, routeBack, routeBackLabel, popupKey = 0 }:ReportList) => {

    const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [camposReseteados, setCamposReseteados] = useState<any[]>([]);
    const navigate = useNavigate();

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

    const onNavigateBack = () => {
        if(routeBack){
            window.location.href = `${routeBack}`;
        }else{
            navigate(-1);
        }
    }

    const { Column, HeaderCell } = Table;



    const getData = () => {
        if (sortColumn && sortType) {
          return typeof camposReseteados!="undefined" ? camposReseteados.sort((a, b) => {
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
        return camposReseteados;
    };

    const handleSortColumn = (sortColumn:any, sortType:any) => {
        setLoading(true);
        setSortColumn(sortColumn);
        setSortType(sortType);
        setLoading(false);
    };

    useEffect(() => {
      
        const newArray = detalle.map((item) => {

            const campos = item.campos ?? [];
            const popupContent = item.popupContent ?? '';
            let obj:any = {};
    
            campos.forEach((item_campos, i) => {
    
                    obj[`${cabecera[i]}`] = item_campos ?? '';                                
            });
    
            obj['popupContent'] = popupContent ?? '';
    
            return obj;
        });
        setCamposReseteados(newArray);
        
    }, [detalle]);

    return (
        <>            
            <div className="d-flex gap-2 mb-4">           
                <button onClick={onNavigateBack} className="btn btn-danger btn-lg">{routeBackLabel ? routeBackLabel : 'Atr&aacute;s'}</button>
            </div>

            <hr className='border border-1 opacity-50'/>

            <div className="buscador">
                { children }
            </div>            

            {
                detalle.length > 0 ?
                (
                    <>

                        <Table 
                            height={620} 
                            data={getData()}
                            shouldUpdateScroll={false}
                            sortColumn={sortColumn}
                            sortType={sortType}
                            onSortColumn={handleSortColumn}
                            loading={loading}

                            rowKey={rowKey}
                            expandedRowKeys={expandedRowKeys}
                            renderRowExpanded={renderRowExpanded}
                            >
                                {
                                    cabecera.map((data_key, i) => ( 
                                    <Column key={i} flexGrow={1} sortable resizable>
                                        <HeaderCell>{data_key}</HeaderCell>
                                        {                                            
                                            <CustomCell 
                                                        expandedRowKeys={expandedRowKeys}
                                                        handleExpanded={handleExpanded}
                                                        key={`${data_key}-${i}`}
                                                        dataKey={data_key}
                                                        showTooltip={popupKey == i}
                                                        index={i} />                                            
                                        }
                                    </Column>
                                    ))
                                }                                
                        </Table>

                        <table className='table d-none'>
                            <thead>
                                <tr>
                                    {
                                        cabecera.map((titulo)=>(
                                            <th key={titulo} scope="col">{ titulo }</th>
                                        ))
                                    }                                        
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    detalle.map(({ id, popupContent, popupKey = 0, campos })=>{
                                        
                                        const keyrow = `fila${id}`;
                                    return (                                    
                                        
                                            <tr key={keyrow}>
                                                {
                                                    campos?.map(( texto, index )=> {
                                                        
                                                        const cabeceraChildren = cabecera[index];
                                                        const childrenRowKey = `children_${cabeceraChildren}_${id}`                                                        
                                                        return (
                                                        <td key={childrenRowKey} 
                                                            scope="row" 
                                                            data-label={cabeceraChildren}
                                                            data-tooltip-id={(popupKey == index) ? `tooltip-html-${index}` : ''}
                                                            data-tooltip-html={ (popupKey == index) ? `
                                                                <div style="text-align:left">
                                                                    ${
                                                                        popupContent 
                                                                            ? popupContent.split(',').forEach((item) => <p>{item}</p>)
                                                                            : ''
                                                                    }
                                                                </div>
                                                            ` : ''}
                                                            >
                                                            {
                                                                popupKey == index ? 
                                                                <i className="bi bi-exclamation-circle-fill"></i>
                                                                : ''
                                                            }
                                                            {texto}
                                                            {
                                                                popupKey == index ? 
                                                                <Tooltip id={`tooltip-html-${index}`} />
                                                                : ''
                                                            }
                                                        </td>  
                                                    )})
                                                }
                                            </tr>
                                        
                                    )})
                                }
                                
                            </tbody>
                        </table>                           
                    </>
                )
                :
                (
                    <>
                        <div className="alert alert-warning d-flex justify-content-center gap-3 fs-2 mt-5" role="alert">
                            <i className="bi bi-exclamation-triangle"></i>
                            <div>
                                <b>No se encontraron registros</b>
                            </div>
                        </div>
                    </>
                )

            }
        </>    
    )
}
