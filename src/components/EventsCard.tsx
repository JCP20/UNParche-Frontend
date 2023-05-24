import React, { useContext, useState } from 'react';
import { ShareAltOutlined, ExclamationOutlined, StarTwoTone, setTwoToneColor, ExclamationCircleOutlined, ExclamationCircleFilled, CommentOutlined, CopyTwoTone, StarFilled } from '@ant-design/icons';
import { Card, Modal, Input, Space, Button } from 'antd';
import Share from './Share';
import SearchBar from './userSearchBar';
import { createReport } from '@/services/report.service';
import { highlightEventFn, removeHighlightFn } from '@/services/events.service';
import { AuthContext } from '@/context/auth/AuthContext';
const { info } = Modal;
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
  idEvento: string;
}
const copyToCliBoard = () => {

  const text = window.location.href;
  console.log(text);
  navigator.clipboard.writeText(window.location.href);
  alert("Copied the text: " + text);
}
const showConfirm = () => {
  info({
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
      /*onCancel() {
          console.log('Cancel');
      },*/
  });
};


const EventCardApp: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { nombreEvento } = props;
  const { descripcionEvento } = props;
  const { fechaEvento } = props;
  const { horaEvento } = props;
  const {nombreGrupo} = props;
  const { imagenSrc } = props;
  const { idEvento } = props;
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [destacado, setDestacado] = useState(false);
  let reportText = "";

  const setReason = (text: string) => {
      reportText = text;
  }
  const showModal = () => {
      setIsModalOpen(true);
  };

  const handleOk = () => {

      console.log("AAAA: ", reportText);
      const resp = createReport({ userId: user.id, eventId: idEvento, reason: reportText });
      console.log(resp);
      setIsModalOpen(false);
  };

  const handleCancel = () => {
      setIsModalOpen(false);
  };
  const destacar = () => {
      if (destacado) {
          setDestacado(false);
          setTwoToneColor('#575355');
          const resp = highlightEventFn({ username: user.username, eventId: idEvento });
          console.log(resp);
      } else {
          setDestacado(true);
          setTwoToneColor('#eb2f96');
          //colorStar="#eb2f96";
          const resp = removeHighlightFn({ username: user.username, eventId: idEvento });
          console.log(resp);
      }

  }

  return (
    <><Card title={nombreEvento}
    hoverable
    extra={<a href={nombreGrupo} >{nombreGrupo}</a>}
    style={{ width: 480 }}
    cover={<img src={defaultSrc} onDoubleClick={destacar} />}
    actions={[
        <StarTwoTone key="star"
            onClick={destacar}
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
            <TextArea name="just" rows={2} onChange={(e) => setReason(e.target.value)} />
        </Modal>
    </></>
);
};


export default EventCardApp;
