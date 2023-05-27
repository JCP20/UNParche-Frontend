import { AuthContext } from "@/context/auth/AuthContext";
import {
  addUserToEventFn,
  removeUserFromEventFn,
} from "@/services/events.service";
import { reportEventFn } from "@/services/reports.service";
import {
  CopyTwoTone,
  ExclamationOutlined,
  StarTwoTone,
  StarOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Card, Form, Image, Input, Modal, Typography, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useContext, useState, useMemo } from "react";
import UserSearchBar from "../Messages/UserSearchBar";
import ShareSocials from "./ShareSocials";

const { Meta } = Card;
const { TextArea } = Input;

interface NewFormProps {
  eventData: any;
  noShowActions?: boolean;
  isAdmin?: boolean;
}

const EventCard: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { eventData, noShowActions, isAdmin } = props;

  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateClass, setAnimateClass] = useState("");
  const [isFilled, setIsFilled] = useState(
    eventData?.users?.includes(user?.id)
  );

  const [form] = Form.useForm();

  const router = useRouter();

  const addUserToEvent = async () => {
    try {
      message.loading({
        content: "Cargando...",
        key: "event",
        duration: 2,
      });
      setIsFilled(true);
      await addUserToEventFn(eventData._id);
      message.success({
        content: "Evento agregado a tu lista de eventos",
        key: "event",
      });
      setAnimateClass("animate__animated animate__heartBeat");
    } catch (error) {
      message.error({
        content: "Ha ocurrido un error",
        key: "event",
      });
    }
  };

  const removeUserFromEvent = async () => {
    try {
      message.loading({
        content: "Cargando...",
        key: "event",
        duration: 2,
      });
      setIsFilled(false);
      await removeUserFromEventFn(eventData._id);
      message.success({
        content: "Evento eliminado de tu lista de eventos",
        key: "event",
      });
      setAnimateClass("animate__animated animate__heartBeat");
    } catch (error) {
      message.error({
        content: "Ha ocurrido un error",
        key: "event",
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkReport = async () => {
    try {
      message.loading({
        content: "Enviando reporte...",
        key: "report",
        duration: 2,
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

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url + "event/" + eventData._id);
    message.success({
      content: "URL del evento copiada al portapapeles",
      key: "event",
    });
  };

  const handleShare = () => {
    Modal.confirm({
      title: "¿Cómo quieres compartir el evento?",
      icon: <ShareAltOutlined />,
      content: (
        <>
          <UserSearchBar
            router={router}
            actualUser={user}
            shareText={window.location.href + "event/" + eventData._id}
          />
          <ShareSocials url={window.location.href + "event/" + eventData._id} />

          <div className="shareLink">
            <span>Copiar link</span>
            <Input
              placeholder="Link de evento"
              style={{ width: "90%", marginRight: "1rem" }}
              value={window.location.href + "event/" + eventData._id}
            />
            <CopyTwoTone onClick={copyToClipboard} />
          </div>
        </>
      ),
      onOk() {
        console.log("OK");
      },
    });
  };

  const actions = useMemo(() => {
    if (noShowActions) {
      return [];
    }

    const actions: React.ReactNode[] = [
      isFilled ? (
        <StarTwoTone
          className={animateClass}
          twoToneColor={"#fd028c"}
          onClick={removeUserFromEvent}
        />
      ) : (
        <StarOutlined className={animateClass} onClick={addUserToEvent} />
      ),
      <ShareAltOutlined onClick={handleShare} />,
      <ExclamationOutlined key="report" onClick={showModal} />,
    ];

    // if (isAdmin) {
    //   actions.push(<EllipsisOutlined />);
    // }

    return actions;
  }, [isFilled, isAdmin]);

  const highlight = async () => {
    if (!isFilled) {
      await addUserToEvent();
    } else {
      await removeUserFromEvent();
    }
  };

  return (
    <>
      <Card
        title={eventData?.title ?? "Titulo"}
        hoverable
        onDoubleClick={highlight}
        className="card__index shadow animate__animated animate__fadeIn"
        cover={
          <Image
            style={{ maxHeight: 300, objectFit: "cover" }}
            src={eventData?.photo}
            fallback="/escudoUnal.png"
          />
        }
        actions={actions}
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
        onOk={handleOkReport}
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
