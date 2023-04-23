import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { Modal, Button, Form, Input, message, Radio, Upload, DatePicker } from 'antd';
import { TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;

const layout = {
    labelCol: { span: 50 },
    wrapperCol: { span: 50 },
};

interface NewFormProps {
    initialValues?: any
    service: (value: any) => void
}


const CrearEventoApp: React.FC<NewFormProps> = (props: NewFormProps) => {
    const { service } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    //Declaración de constandes

    const [form] = Form.useForm();
    const nameValue = Form.useWatch('nombreEvento', form);
    const desValue = Form.useWatch('descripcion', form);
    var fotoValue = "error"//Form.useWatch('foto', form);

    var fechaValue = Form.useWatch('Fecha', form);

    var horaValue = Form.useWatch('Hora', form);
    if (horaValue == undefined) {
        horaValue = dayjs('12:00 a', "h:mm a")
    }
    if (fechaValue == undefined) {
        fechaValue = dayjs()
    }


    //Mensaje de exito
    const onFinish = () => {
        message.success('Envento creado exitosamente!');
    };

    //Mensaje de error
    const onFinishFailed = () => {
        message.error('Creación de evento fallida!');
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Nuevo Evento
            </Button>

            <Modal width="50REM" title="Creación de Evento" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <div className='container123'>
                    <div className='card'>
                        <h2>Formulario</h2>
                        <Form className='form' id='formCrearGrupo'      //Detalles del Formulario
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            name="wrap"
                            labelAlign="left"
                            style={{ maxWidth: 600 }}
                            {...layout}
                            scrollToFirstError
                        >
                            <Form.Item
                                name='nombreEvento'  //Label usuario
                                label='Nombre del Evento'
                                rules={[{
                                    required: true,
                                    message: 'Porfavor ingrese el nombre del evento'
                                }]}
                            >
                                <Input placeholder="Escribe el nombre de tu evento" />
                            </Form.Item>
                            <Form.Item name='descripcion' label="Descripción">
                                <TextArea rows={2} />
                            </Form.Item>
                            <Form.Item label="Imagen del evento" valuePropName="fileList">
                                <ImgCrop rotationSlider>
                                    <Upload
                                        name="foto"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                        beforeUpload={file => {
                                            console.log("aaa")
                                            return true
                                        }}
                                    >
                                        {fileList.length < 1 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
                            </Form.Item>
                            <Form.Item label="Repetitivo">
                                <Radio.Group>
                                    <Radio value="Si"> Sí </Radio>
                                    <Radio value="No"> No </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='Fecha' label="Fecha del Evento">
                                <DatePicker format={'DD/MM/YY'} />
                            </Form.Item>
                            <Form.Item name='Hora' label="Hora del Evento">
                                <TimePicker use12Hours format="h:mm a" defaultValue={dayjs('12:00 a', "h:mm a")} />
                            </Form.Item>
                            <Form.Item name='botonCrearEvento'>
                                <Button block type="primary" htmlType="submit">
                                    Crear Evento
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='card'>
                        <h2>Vista previa</h2>
                        <Form className='form' id='formCrearGrupo'>
                            <Title level={2}> {nameValue} </Title>
                            <Upload
                                name="foto2"
                                listType="picture-card"
                                fileList={fileList}
                                disabled={true}
                            >
                                {fileList.length < 1 && 'No image'}
                            </Upload>
                            <Form.Item label="Descripción">
                                <TextArea rows={2}
                                    value={desValue} />
                            </Form.Item>
                            <Form.Item label="Fecha">
                                {fechaValue.format('DD/MM/YY')}

                            </Form.Item>
                            <Form.Item label="Hora">
                                {
                                    horaValue.format("h:mm a")
                                }
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Modal >


        </>
    );
};


export default CrearEventoApp;