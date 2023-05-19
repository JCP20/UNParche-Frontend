import {
  ExclamationOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { Card, Image, Input, Modal, Typography, message, Form } from "antd";
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
  const [isFilled, setIsFilled] = useState(false);

  const [form] = Form.useForm();

  const changeColor = () => {
    setIsFilled(!isFilled);

    if (!isFilled) {
      message.success("¡Evento guardado en favoritos!");
    } else {
      message.success("¡Evento eliminado de favoritos!");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        title={eventData?.title ?? "Titulo"}
        className="card__index shadow"
        cover={<Image src={eventData?.photo} fallback="/escudoUnal.png" />}
        actions={[
          isFilled ? (
            <StarTwoTone twoToneColor={"#fd028c"} onClick={changeColor} />
          ) : (
            <StarOutlined onClick={changeColor} />
          ),
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
              {eventData?.description ?? "Descripción"}
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
          El reporte será enviado al equipo de UnParche para revisar el
          contenido del evento.
        </p>
        <Form form={form}>
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el motivo del reporte",
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventCard;
