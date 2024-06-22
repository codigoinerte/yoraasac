import { Dispatch, SetStateAction, useEffect } from 'react'
import {  Grid, Row, Col, Button, Drawer } from 'rsuite'
import { useNotaHeladeroStore } from '../../hooks';
import { SubmitHandler, UseFormGetValues, UseFormSetValue, useFieldArray, useForm } from 'react-hook-form';
import { FormNotaHeladeroValues } from '../interfaces';
import moment from 'moment';
import { alert } from '../../helpers';
import { InputNotaGuardada } from './InputNotaGuardada';

interface ModalNotaHeladeroRegisterProps {
    openModal: boolean;
    handlerOpenModal: (state:boolean) => void;
    setValueOrigin: UseFormSetValue<FormNotaHeladeroValues>;
    getValuesOrigin: UseFormGetValues<FormNotaHeladeroValues>;
    updateStateHeladero: Dispatch<SetStateAction<number | null>>;
}

export const ModalNotaHeladeroRegister = ({ openModal, handlerOpenModal, setValueOrigin, getValuesOrigin, updateStateHeladero }: ModalNotaHeladeroRegisterProps) => {

    const {  saveNotaHeladero, updateDateOperation, active  } = useNotaHeladeroStore();

    const handleClose = () => handlerOpenModal(false);

    const { register, handleSubmit, setValue, getValues, control } = useForm<FormNotaHeladeroValues>({
        defaultValues:{
            productos: []
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "productos"
    });

    useEffect(() => {
        setValue('user_id', active?.user_id ?? 0);
        setValue('estado', active?.estado ?? 3);
        setValue('fecha_operacion', (moment(new Date()).format("YYYY-MM-DD HH:mm").toString()).replace('T', ' '));
        setValue('productos', (active?.detalle ?? []).map((item) => {
            const pedido = item.pedido??0;
            const devolucion = item.devolucion??0;
            const precio_operacion = item.precio_operacion??0;
            const pedido_result = item.is_litro == false ? (pedido+devolucion) : ((pedido*precio_operacion)+devolucion);
            const response =  {
            ...item,
            pedido: pedido_result,
            devolucion: 0
            };            
            return response;
        }));

    }, [active]);

    const removePaddingOnBody = () => {
        document.body.style.padding = '0px';
    }
    
    const onSubmit: SubmitHandler<FormNotaHeladeroValues> = (data) => {
        if(active?.id == null){
            alert({
                title : 'No se encuentro el registro padre',
                text : '',
                icon : 'warning',
                confirmButtonText : 'Cerrar modal',
                showCancelButton : true,
                preConfirm : () => {
                    handlerOpenModal(false);
                },
            }); 
            return;
        }



        updateDateOperation({
            fecha_operacion: data.fecha_operacion,
            id: active?.id ?? 0,
            estado: 3        
        });
        saveNotaHeladero({
            ...data,
            productos: (data.productos).map((item) => {
                return {
                    ...item,
                    pedido: 0,                
                    vendido: 0,
                    importe: 0
                }
            }),
            parent_id: active?.id ?? 0,
            estado: 4 //se guarda con estado pendiente a reapertura del dia siguiente
        }, true);

        updateStateHeladero(3);
        setValueOrigin("estado", 3);
        //("fecha_guardado", data.fecha_operacion);
        handlerOpenModal(false);
        removePaddingOnBody();
    }

    const onSave = (e:any) => {
        
       alert({
        title :'Desea guardar el registro?',
        text : 'Revise bien las cantidades guardadas',
        icon : 'question',
        confirmButtonText : 'Guardar registro',
        showCancelButton : true,
        preConfirm : () => {
            handleSubmit(onSubmit)();
        },
       });
    }

    const onClose = () => {
        alert({
            title : 'Seguro que desea salir?',
            text : 'Si cierra el modal se perderán los datos',
            icon : 'warning',
            confirmButtonText : 'Cerrar modal',
            showCancelButton : true,
            disableConfirmMessage: true,
            preConfirm : () => {
                updateStateHeladero(2);
                setValueOrigin("estado", 2);
                handleClose();
                removePaddingOnBody();
            },
        });        
    }

    return (
        <>

<Drawer backdrop={false} open={openModal} onClose={handleClose} size="xs" >
    <Drawer.Header closeButton={false} className='p-3'>
        <Drawer.Title>Guardar</Drawer.Title>
        <Drawer.Actions>
            <Button onClick={onSave} appearance="primary">Guardar Helados</Button>
            <Button onClick={onClose} appearance="subtle">Cancelar</Button>
        </Drawer.Actions>
    </Drawer.Header>
    <Drawer.Body className='p-3'>
        
        <form>
            <strong className='d-block mb-3'>Guardar helados del d&iacute;a, para el siguiente d&iacute;a</strong>
            <Grid fluid>
                <Row className="show-grid mb-3">
                    <Col xs={6}>Fecha del movimiento</Col>
                    <Col xs={18}>
                        <input type="datetime-local" className='form-control' {...register('fecha_operacion', {required: true})}/>
                        <input type="hidden" {...register('estado')} />
                    </Col>
                </Row>
                {
                    fields.map((item, index) => {
                        
                        return (
                        <Row className="show-grid mb-3" key={item.id}>
                            <Col xs={12} sm={12} md={12} className={ getValues(`productos.${index}.pedido`) ? ( (item.is_litro) ? "bg-info p-2" : "bg-warning p-2"):""}>
                                    { item.producto }
                                    {
                                        item.is_litro ? 
                                        (
                                            <small>
                                                <br/>
                                                <b>Total soles: {getValues(`productos.${index}.pedido`)}</b>
                                            </small>
                                        )
                                        :
                                        ''
                                    }
                                    <input type="hidden" className='form-control' {...register(`productos.${index}.pedido`)}/>
                                    <input type="hidden" className='form-control' {...register(`productos.${index}.codigo`)} />
                                    <input type="hidden" className='form-control' {...register(`productos.${index}.vendido`)} />
                                    <input type="hidden" className='form-control'  {...register(`productos.${index}.precio_operacion`)}/>
                                    <input type="hidden" className='form-control'  {...register(`productos.${index}.importe`)}/>
                            </Col>
                            <Col xs={12} sm={12} md={12}>{
                                    item.is_litro ? (
                                        <>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">S/</span>
                                                <InputNotaGuardada 
                                                register={register}
                                                getValues={getValues}
                                                index={index}
                                                is_litro={item.is_litro} />
                                            </div>
                                        </>
                                    ) : (
                                        <InputNotaGuardada
                                            register={register}
                                            getValues={getValues}
                                            index={index}
                                            is_litro={item.is_litro} />
                                    )
                                }
                            </Col>
                        </Row>
                        )
                    })

                }
            </Grid>
        </form>

    </Drawer.Body>
</Drawer>

        
        
        </>
    )
}
