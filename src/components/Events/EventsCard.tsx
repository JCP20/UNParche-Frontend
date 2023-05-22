import { reportEventFn } from "@/services/reports.service";
import {
  ExclamationOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card, Form, Image, Input, Modal, Typography, message } from "antd";
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
  const [animateClass, setAnimateClass] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const [form] = Form.useForm();

  const changeColor = () => {
    setIsFilled(!isFilled);

    setAnimateClass("animate__animated animate__heartBeat");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      message.loading({
        content: "Enviando reporte...",
        key: "report",
      });
      const values = await form.validateFields();
      const newReport = await reportEventFn({
        event: eventData._id,
        reason: values.reason,
      });

      if (newReport.ok) {
        message.success({
          content: "Reporte enviado con éxito",
          key: "report",
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error({
        content: "No fue posible generar el reporte",
        key: "report",
      });
    }

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
            <HeartTwoTone
              className={animateClass}
              twoToneColor={"#fd028c"}
              onClick={changeColor}
            />
          ) : (
            <HeartOutlined className={animateClass} onClick={changeColor} />
          ),
          <ShareAltOutlined />,
          <MessageFilled key="message" />,
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
