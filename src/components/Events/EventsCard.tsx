import {
  ExclamationOutlined,
  ShareAltOutlined,
  StarTwoTone,
  setTwoToneColor,
} from "@ant-design/icons";
import { Card, Image, Input, Modal, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

const { Meta } = Card;
const { TextArea } = Input;

interface NewFormProps {
  eventData: any;
}

const EventCard: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { eventData } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeColor = () => {
    setTwoToneColor("#a5b377");
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
    <>
      <Card
        title={eventData?.title}
        className="card__index shadow"
        cover={<Image src={eventData?.photo} fallback="/escudoUnal.png" />}
        actions={[
          <StarTwoTone
            key="star"
            twoToneColor="#eb2f96"
            onClick={changeColor}
          />,
          /*<EditOutlined key="edit" />,*/
          <ShareAltOutlined />,
          <ExclamationOutlined key="report" onClick={showModal} />,
        ]}
      >
        <Meta
          title={dayjs(eventData?.date).format("DD/MM/YYYY, hh:mm a")}
          description={
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
                expandable: true,
                symbol: "Ver más...",
              }}
            >
              {eventData?.description}
            </Typography.Paragraph>
          }
        />
      </Card>

      <Modal
        title="Reporte"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          El reporte será enviado a los administradores para revisar el
          contenido de la publicación
        </p>
        <TextArea rows={2} />
      </Modal>
    </>
  );
};

export default EventCard;
