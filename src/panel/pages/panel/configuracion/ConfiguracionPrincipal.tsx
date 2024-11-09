import React, { useEffect, useState } from 'react'
import { ContainerInner, FormControls } from '../../../components'
import { Configuration, ContactoConfig, breadcrumb as bread, formConfiguracion } from '../../../interfaces';
import { useConfiguration } from '../../../../hooks';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const breadcrumb:bread[] = [
    { id:1, titulo: 'Configuración', enlace: '/configuracion' },
    { id:2, titulo: 'Configuración principal', enlace: '' }
];

export const ConfiguracionPrincipal = () => {


    //const [configuration, setConfiguration] = useState<Configuration>();

    const { configuration, contacts, loadConfiguration, deleteContacts, saveConfiguration } = useConfiguration();

    useEffect(() => {
      
        loadConfiguration()
        .then((response)=>{
            
           setValue('logo_field', undefined);

           setValue('ruc', response.ruc);
           setValue('razon_social', response.razon_social);
           setValue('razon_comercial', response.razon_comercial);
           setValue('pagina_web', response.pagina_web);
           setValue('igv', response.igv);
           setValue('cargo_baterias', response.cargo_baterias);
           setValue('email_empresa', response.email_empresa);
           setValue('logo', response.logo);
           setValue('contactos', response.contactos.map((e:ContactoConfig)=>({
            ...e,
            key: e.id,
           })));
           setValue('celular', response.celular);
            
        });


    }, []);
    

    const { register, handleSubmit, reset, formState, setValue, getValues, control } = useForm<formConfiguracion>({
        defaultValues:{       
            ...configuration,
            contactos: configuration?.contactos
            //productos: []
        }
    });

    const URL_IMAGENES = import.meta.env.VITE_URL_IMAGES;

    //prepend, remove, swap, move, insert, replace
    const { fields, append, remove } = useFieldArray({
        control,
        name: "contactos"
    });

    const deleteContact = async (id:number = 0, i:number) => {

        if(id == 0) return false;

        await deleteContacts(id);

        remove(i);
    }

    const onSubmit: SubmitHandler<formConfiguracion> = async (data) => {

        reset({
            contactos: []
        });

        const response = await saveConfiguration(data);

        setValue("contactos", response!.contactos.map((e:ContactoConfig)=>({
            ...e,
            key: e.id,
        })));
    }


    return (
        <ContainerInner breadcrumb={breadcrumb}>
            <>

            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControls 
                    page="configuracion" 
                    save={()=>console.log(1) } 
                    tipo='edit'
                    onNavigateBack={()=>{
                        window.location.href = '/configuracion'
                    }}
                    routeBackLabel={'Volver a las categorias'} />

                <hr className='border border-1 opacity-50'/>

                <div className="card">
                    <div className="card-header">
                        Datos del emisor
                    </div>
                    <div className="card-body">
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="ruc" className="form-label">Ruc</label>
                                    <input type="text" className="form-control" placeholder='Ruc'  {...register('ruc', { required:true })}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Razon social</label>
                                    <input type="text" className="form-control" id="razon-social"  {...register('razon_social', { required:true })}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="razon-comercial" className="form-label">Razon comercial</label>
                                    <input type="text" className="form-control" placeholder='Razon comercial'  {...register('razon_comercial', { required:true })}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="pagina-web" className="form-label">P&aacute;gina web</label>
                                    <input type="text" className="form-control" placeholder='Pagina web'  {...register('pagina_web')}/>
                                </div>

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email de la empresa</label>
                                    <input type="email" className="form-control" placeholder='Email'  {...register('email_empresa', { required:true })} />
                                </div>

                            </div>                        
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                
                                <div className="mb-3">
                                    <label htmlFor="celular" className="form-label">Celular empresa</label>
                                    <input type="tel" className="form-control" placeholder='Email'  {...register('celular')} />
                                </div>

                            </div>


                        </div>


                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        Logo
                    </div>
                    <div className="card-body">
                        
                        <input type="file" {...register('logo_field')} readOnly={false} className='form-control'/>

                        {
                            (configuration?.logo) &&
                            <img src={`${URL_IMAGENES}${configuration.logo}`} alt="..."/>
                        }

                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        Contactos de la empresa
                    </div>
                    <div className="card-body"> 
                        <div className="row">
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <button type="button" className="btn btn-primary mb-3" onClick={()=> { append({
                                    celular:'',
                                    email:'',
                                    nombre:'',
                                    principal:0,                                
                                }); } }>
                                    <i className="bi bi-person-plus-fill"></i> Agregar contacto
                                </button>
                            </div>
                        </div>

                        {
                            fields.map((contact, i) =>{                                                         
                            return (


                                <div key={contact.id??i} className="row">

                                    
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-10">

                                        <div className="row">
                                            
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">                                
                                                <div className="mb-3">
                                                    <label htmlFor="nombre_contacto" className="form-label">Nombre</label>
                                                    <input type="text" className="form-control" placeholder='Nombre'  {...register(`contactos.${i}.nombre`)} />
                                                    <input type="hidden" {...register(`contactos.${i}.id`)} />
                                                </div>                            
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                                <div className="mb-3">
                                                    <label htmlFor="email_contacto" className="form-label">Email</label>
                                                    <input type="email" className="form-control" placeholder='Email' {...register(`contactos.${i}.email`)}/>
                                                </div>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                                <div className="mb-3">
                                                    <label htmlFor="celular_contacto" className="form-label">Celular</label>
                                                    <input type="tel" className="form-control" placeholder='Celular' {...register(`contactos.${i}.celular`)}/>
                                                </div>
                                            </div>
                                            
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Principal</label>
                                                    <select className='form-control' {...register(`contactos.${i}.principal`)}>
                                                        <option value="0">No</option>
                                                        <option value="1">Si</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-2 d-flex align-items-center">
                                        <button type="button" className='btn btn-danger' onClick={() => deleteContact(contact.key, i)}>
                                            Eliminar
                                        </button>
                                    </div>
                                
                                </div>

                            )
                            
                            })
                        }


                    </div>
                </div>
                
                <div className="card mt-3">
                    <div className="card-header">
                        Configuraci&oacute;n de facturas, boletas, notas, etc.
                    </div>
                    <div className="card-body"> 

                        <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <label htmlFor="precio_venta" className="form-label">IGV</label>
                                    <select className='form-control'  {...register('igv', { required:true })}>
                                        {
                                            configuration?.igvs.map((item)=>(
                                                <option key={item.id} value={item.id}>{item.valor}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>                           

                        </div>

                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        Extras
                    </div>
                    <div className="card-body"> 

                        <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <label htmlFor="precio_venta" className="form-label">Cargo fijos por baterias</label>
                                    <input type="number" {...register('cargo_baterias', { required:true })} className='form-control' />
                                </div>
                            </div>                           

                        </div>

                    </div>
                </div>

            </form>

            </>
        </ContainerInner>
    )
}
