import { useEffect } from "react";
import { useDireccion, useSeriesStore } from "../../../../hooks";
import { ContainerInner, FormControls } from "../../../components";
import { FormSeries, SucursalesSeriesResponse, breadcrumb as bread } from "../../../interfaces";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Locales y series', enlace: '' }
];

export const LocalesSeries = () => {

    const responseFillLayers = (response: SucursalesSeriesResponse) => {

        loadDireccion();

        setValue('series', []);
        setValue('sucursales', []);

        const newSucursals = (response.sucursales!=undefined) ? response.sucursales.map((sucursal)=>({
            ...sucursal,
            identify : sucursal.id,
        })) : [];
        
        setValue('series', response.series??[]);
        setValue('sucursales', newSucursals);
    }

    const { series, sucursales, sucursal ,loadSeries, saveSeries, deleteSeries  } = useSeriesStore();

    const { loadDireccion, loadProvincias, loadDistritos, departamentos, provincias, distritos } = useDireccion();


    useEffect(() => {
      
        loadSeries().then(responseFillLayers);
        
    }, []);

    const { register, handleSubmit, setValue, control } = useForm<FormSeries>({
        defaultValues:{
            series: [],
            sucursales: []
        }
    });

    const { fields, remove } = useFieldArray({
        control,
        name: "sucursales"
    });
    

    const onSubmit: SubmitHandler<FormSeries> = async (data) => {
        saveSeries(data).then(responseFillLayers);
        clearFields();
    }

    const deleteSucursal = (id:number, idx:number) =>{
        if(id == 0 || idx == 0) return false;

        remove(idx);
        deleteSeries(id);
    };

    const editSucursal = async (id:number) => {
        
        const result = sucursales.map((sucursal)=>{
            if( sucursal.id == id ) return sucursal;
        });

        
        if(result[0]){

            const {  id = 0, codigo = '', nombre = '', codigo_sunat = '', ubigeo = '', departamento = 0, provincia = 0, distrito = 0, direccion = '', pagina_web='' } = result[0];

            setValue('codigo', codigo);
            setValue('nombre', nombre);
            setValue('codigo_sunat', codigo_sunat);
            setValue('ubigeo', ubigeo);
            setValue('departamento', departamento);
            setValue('id', id);

            console.log({departamento, provincia, distrito});
            
            const responseProvincia = await loadProvincias(departamento);

            if(responseProvincia && provincia!=0){
            
                setValue('provincia', provincia); 

                const responseDistrito = await loadDistritos(provincia);

                if(responseDistrito){

                    setValue('distrito', distrito);            
                    
                }

            }
            
                       
            
            setValue('direccion', direccion);            
            setValue('pagina_web', pagina_web);
        }

    };

    const clearFields = ()=>{
        setValue('codigo', "");
        setValue('nombre', "");
        setValue('codigo_sunat', "");
        setValue('ubigeo', "");
        setValue('departamento', 0);
        setValue('provincia', 0);
        setValue('distrito', 0);
        setValue('direccion', "");
        setValue('pagina_web', "")
        setValue('id', 0)
    }

    return(
        <ContainerInner breadcrumb={breadcrumb}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControls page="configuracion" save={()=>console.log(1)} tipo='edit' />

                <hr className='border border-1 opacity-50'/>

                <div className="card">
                    <div className="card-header">
                        Locales
                    </div>
                    <div className="card-body">
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Codigo</label>
                                    <input type="text" className="form-control" placeholder='Codigo' {...register("codigo")}/>
                                    <input type="hidden" {...register("id") } />
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" placeholder='Nombre'  {...register("nombre")}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="codigo-sunat" className="form-label">Codigo sunat</label>
                                    <input type="text" className="form-control" placeholder='Codigo sunat'  {...register("codigo_sunat")}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="ubigeo" className="form-label">Ubigeo</label>
                                    <input type="text" className="form-control" placeholder='Pagina web'  {...register("pagina_web")}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="departamento" className="form-label">Departamento</label>
                                    <select className='form-control'  {...register("departamento", { onChange: (e)=> loadProvincias(e.target.value) })}>
                                        {
                                            [{ id: 0, nombre: 'Seleccione una opción' }, ...departamentos]
                                            .map(( { id, nombre } ) => (
                                                <option value={id} 
                                                        key={id}>{nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="provincia" className="form-label">Provincia</label>
                                    <select className='form-control'  {...register("provincia", { onChange: (e)=> loadDistritos(e.target.value) })}>
                                        {                                           
                                            
                                            [{ id: 0, nombre: 'Seleccione una opción' }, ...provincias]
                                            .map(( { id, nombre } ) => (
                                                <option value={id} 
                                                        key={id} >{nombre}</option>
                                            ))                                                                                        
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="distrito" className="form-label">Distrito</label>
                                    <select className='form-control'  {...register("distrito")}>
                                        {
                                            [{ id: 0, nombre: 'Seleccione una opción' }, ...distritos]                                            
                                            .map(( { id, nombre } ) => (
                                                <option value={id} 
                                                        key={id} >{nombre}</option>
                                            ))
                                        }                                        
                                    </select>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="direccion" className="form-label">Direcci&oacute;n</label>
                                    <input type="text" className='form-control' placeholder='Dirección'  {...register("direccion")} />
                                </div>

                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                <button className="btn btn-info" type="button" onClick={()=> clearFields() }><i className="bi bi-arrow-clockwise"></i> Limpiar campos</button>
                            </div>

                        </div>


                    </div>
                </div>

                {
                    fields.length > 0 && (
                        <table className='table mt-3'>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Codigo</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fields.map((item, index)=>(
                                        <tr key={item.id+index}>
                                            <td>{index+1}</td>
                                            <td>{item.codigo}</td>
                                            <td>{item.nombre}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary me-2" onClick={async ()=> await editSucursal(item.identify) }>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>

                                                <button type="button" className="btn btn-danger" onClick={()=> deleteSucursal(item.identify, index) }>
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    </table>
                    )
                    
                }


                <div className="card mt-3">
                    <div className="card-header">
                        Series de documentos de venta
                    </div>
                    <div className="card-body">
                        
                        <div className="row">
                            {
                                series.map((serie, i)=>(

                                    <div key={`serie-${serie.documento.replaceAll(" ", "")}`} className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        
                                        <div className="mb-3">
                                            <label className="form-label">{serie.documento}</label>

                                            <input type="hidden" {...register(`series.${i}.id`, { value: serie.id })} />
                                            <input type="hidden" {...register(`series.${i}.idtipo`, { value: serie.idtipo })} />
                                            <input type="hidden" {...register(`series.${i}.documento`, { value: serie.documento })} />

                                            <div className="row">
                                            
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                    <input type="text" className="form-control" placeholder='Serie' defaultValue="F001" {...register(`series.${i}.serie`, { value: serie.serie })} />
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                    <input type="text" className="form-control" placeholder='Correlativo' defaultValue="1" {...register(`series.${i}.correlativo`, { value: serie.correlativo })}/>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))
                            }
                                                    
                        </div>


                    </div>
                </div>

            </form>
        </ContainerInner>
    );
}