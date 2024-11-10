import { useNavigate } from 'react-router-dom';
import { ReportList } from '../interfaces'
import { Popover, Table, Tooltip, Whisper } from 'rsuite';
import { useEffect, useState } from 'react';
const { Cell } = Table;

const CustomCell = ({ index = 0, rowData, dataKey, showTooltip = false, ...props }:any) => {
    
    let value = '';
    
    for(let e in rowData ){
        if(e==dataKey){
            value = rowData[e];
        }
    }

    const popupContent = rowData["popupContent"] ?? '';
    
    const tooltip = (
        <Popover title="Observaciones de notas">
        <p><b>Heladero:</b> {rowData["Nombre"] ?? ''}</p>
        {
            popupContent.split(',').map((item:any) => <p>{item}</p>)
        }
      </Popover>        
    )

    return (
        <Cell {...props}>
            
            {
                showTooltip && !!popupContent ? 
                (
                    <div className='d-flex flex-row gap-2'>
                        { showTooltip && !!popupContent ? <i className="bi bi-exclamation-circle-fill"></i> : '' }
                        <Whisper placement="top" controlId={`control-id-hover-${dataKey}-${index}`} trigger="hover" speaker={tooltip}>                
                            <div dangerouslySetInnerHTML={{ __html:value  }} />
                        </Whisper>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html:value  }} />
                )
            }
            
        </Cell>
    );
};

export const ListReportes = ({cabecera, detalle, descargar, next = function(){}, prev = function(){}, children, routeBack, routeBackLabel, popupKey = 0 }:ReportList) => {

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [camposReseteados, setCamposReseteados] = useState<any[]>([]);
    const navigate = useNavigate();

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
                            >
                                {
                                    cabecera.map((data_key, i) => (
                                    <Column key={i} flexGrow={1} sortable resizable>
                                        <HeaderCell>{data_key}</HeaderCell>
                                        <CustomCell 
                                            dataKey={data_key}
                                            showTooltip={popupKey == i}
                                            index={i} />
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
