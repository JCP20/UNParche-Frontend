import React, { useState } from 'react';
import { ShareAltOutlined, ExclamationOutlined, StarTwoTone, setTwoToneColor } from '@ant-design/icons';
import { Card, Modal, Input } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;
const defaultSrc ="https://www.artmajeur.com/medias/standard/v/i/virtual-dzines/artwork/7112695_sun-l.jpg?v=1585072675"
var toneColor = '#fddde6';
//"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"

interface NewFormProps {
    nombreEvento?: string;    
    descripcionEvento?: string;  
    fechaEvento?: string;  
    horaEvento?: string;  
    imagenSrc?: string;  
  }


const EventCardApp: React.FC<NewFormProps> = (props: NewFormProps) => {
    const { nombreEvento } = props;
    const { descripcionEvento } = props;
    const { fechaEvento } = props;
    const { horaEvento } = props;
    const { imagenSrc } = props;

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
        <><Card title=  {nombreEvento}
            hoverable            
            extra={<a href="#">nombreGrupo</a>}
            style={{ width: 350 }}
            cover={<img  src={defaultSrc} onDoubleClick={showModal} />}
            actions={[
                <StarTwoTone key="star"
                    twoToneColor="#eb2f96"
                    onClick={changeColor}
                />,
                /*<EditOutlined key="edit" />,*/
                <ShareAltOutlined />,
                <ExclamationOutlined key="report"
                    onClick={showModal}
                />,
            ]}
        >
            <Meta title={"Fecha: "+ fechaEvento + "    Hora: "+ horaEvento }  description={descripcionEvento}
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