import React, { useState } from 'react';
import { ShareAltOutlined, ExclamationOutlined, StarTwoTone, setTwoToneColor, ExclamationCircleOutlined, ExclamationCircleFilled, CommentOutlined, CopyTwoTone } from '@ant-design/icons';
import { Card, Modal, Input, Space, Button } from 'antd';
import Share from './Share';
import SearchBar from './prueba';
const { confirm } = Modal;
const { Meta } = Card;
const { TextArea } = Input;
const defaultSrc = "https://www.artmajeur.com/medias/standard/v/i/virtual-dzines/artwork/7112695_sun-l.jpg?v=1585072675"
var toneColor = '#fddde6';
//"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"


interface NewFormProps {
    nombreEvento?: string;
    descripcionEvento?: string;
    fechaEvento?: string;
    horaEvento?: string;
    imagenSrc?: string;
    nombreGrupo?: string;
    enlaceGrupo?: string;
}
const copyToCliBoard = () => {

    const text = window.location.href;
    console.log(text);
    navigator.clipboard.writeText(window.location.href);
    alert("Copied the text: " + text);
}
const showConfirm = () => {

    confirm({
        title: '¿Cómo quieres compartir el evento?',
        icon: <ShareAltOutlined />,
        content: <Space direction="vertical">
            <Space>
                <Input value={window.location.href} />
                <CopyTwoTone onClick={copyToCliBoard} />

            </Space>

            <Share description={'Evento destacado'} />
            <Space direction="vertical">
                Mensaje privado
                <SearchBar />
            </Space>
        </Space>,
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};



const EventCardApp: React.FC<NewFormProps> = (props: NewFormProps) => {

    const { nombreEvento } = props;
    const { descripcionEvento } = props;
    const { fechaEvento } = props;
    const { horaEvento } = props;
    const { imagenSrc } = props;
    const {nombreGrupo} = props;
    const {enlaceGrupo} = props;

    const [isModalOpen, setIsModalOpen] = useState(false);


    const changeColor = () => {
        setTwoToneColor('#a5b377');
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <><Card title={nombreEvento}
            hoverable
            extra={<a href={enlaceGrupo} >{nombreGrupo}</a>}
            style={{ width: 480 }}
            cover={<img src={defaultSrc} onDoubleClick={showModal} />}
            actions={[
                <StarTwoTone key="star"
                    twoToneColor="#eb2f96"
                    onClick={changeColor}
                />,
                /*<EditOutlined key="edit" />,*/
                <ShareAltOutlined key="confirm"
                    onClick={showConfirm} />,
                <ExclamationOutlined key="report"
                    onClick={showModal}
                />,
            ]}
        >
            <Meta title={"Fecha: " + fechaEvento + "    Hora: " + horaEvento} description={descripcionEvento}
            />
        </Card><>
                <Modal title="Reporte" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>El reporte será enviado a los administradores para revisar el contenido de la publicación</p>
                    <TextArea rows={2} />
                </Modal>
            </></>
    );
};


export default EventCardApp;
