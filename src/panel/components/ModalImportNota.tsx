import React, { RefObject, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Modal } from 'rsuite'
import { backendApi } from '../../api';
import { BuscarNotasHeladeros, FormImportNota } from '../interfaces';
import { toastMessage } from '../../helpers';
interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setBuscar: React.Dispatch<React.SetStateAction<BuscarNotasHeladeros>>
}
export const ModalImportNota = ({ open, setOpen, setBuscar }:Props) => {

    const componentRef = useRef<any>();

    const { register, handleSubmit, formState, setValue, getValues, control, reset } = useForm<FormImportNota>();

    const saveImportacion = async (postdata:FormImportNota) => {
        try {            
            const rutaEndpoint = '/importar-nota';

            const formData = new FormData();
            formData.append('file', postdata.file[0]);


            const { data:info } = await backendApi.post(rutaEndpoint, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });
            const result = info.data;
            toastMessage(info);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit: SubmitHandler<FormImportNota> = async (data) => {
        /* logica para guardar */
        await saveImportacion(data);
        setBuscar({
            documento: null,
            nombre:null,
            estado: null,
            buscar:true
        });
        setOpen(false)
    }

    const handleClose = () => setOpen(false);

    return (
        <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} ref={componentRef}>
            <Modal.Header>
                <Modal.Title>Importar Nota Heladero</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            
                    <div className="mb-3">
                        <label className="form-label">Archivo Excel (xls,xlsx)</label>
                        <input className="form-control" {...register("file", { required: true })} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    </div>
            
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' appearance="primary">Importar</Button>
                <Button onClick={handleClose} appearance="subtle">Cancel</Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}
