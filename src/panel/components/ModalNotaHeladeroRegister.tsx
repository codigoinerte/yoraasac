import { Dispatch, SetStateAction, useEffect } from 'react'
import {  Grid, Row, Col, Button, Modal } from 'rsuite'
import { useNotaHeladeroStore } from '../../hooks';
import { SubmitHandler, UseFormGetValues, UseFormSetValue, useFieldArray, useForm } from 'react-hook-form';
import { FormNotaHeladeroValues } from '../interfaces';
import moment from 'moment';
import { alert } from '../../helpers';

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
            const response =  {
            ...item,
            pedido: ((item.pedido??0)+(item.devolucion??0)),
            devolucion: 0
            };            
            return response;
        }));

    }, [active]);
    
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
            },
        });        
    }

    return (
        <>
        <Modal
                backdrop="static"
                size="full"
                open={openModal}
                onClose={handleClose}
            >
            <form>
                <Modal.Header>
                    <Modal.Title>Guardar helados del día, para el siguiente día</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    <Col xs={12} sm={10} md={8} className={ getValues(`productos.${index}.pedido`) ? "bg-warning p-2":""}>
                                            { item.producto }
                                            <input type="hidden" className='form-control' {...register(`productos.${index}.pedido`)}/>
                                            <input type="hidden" className='form-control' {...register(`productos.${index}.codigo`)} />
                                            <input type="hidden" className='form-control' {...register(`productos.${index}.vendido`)} />
                                            <input type="hidden" className='form-control'  {...register(`productos.${index}.precio_operacion`)}/>
                                            <input type="hidden" className='form-control'  {...register(`productos.${index}.importe`)}/>
                                    </Col>
                                    <Col xs={12} sm={14} md={14}>
                                        <input type="number" className='form-control' {...register(`productos.${index}.devolucion`, {
                                            min: 0,
                                            onChange: (e) => {
                                                const devolucion = 0; //getValuesOrigin(`productos`).find((item)=> item.codigo == getValues(`productos.${index}.codigo`))?.devolucion ?? 0;
                                                const pedido = getValues(`productos.${index}.pedido`) ?? 0;
                                                const menor = (parseInt(pedido.toString())+parseInt(devolucion.toString()));
                                                if(menor < e.target.value){                                                    
                                                    e.target.value = 0;
                                                }
                                            }
                                        })} 
                                        readOnly={getValues(`productos.${index}.pedido`) == 0}
                                        />

                                    </Col>
                                </Row>
                                )
                            })

                        }
                    </Grid>
                </Modal.Body>
                <Modal.Footer className='p-3'>
                    <Button onClick={onSave} appearance="primary">
                        Guardar Helados
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
        </>
    )
}
