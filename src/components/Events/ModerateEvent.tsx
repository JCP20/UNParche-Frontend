import { IEvent } from "@/interfaces/events";
import { EyeOutlined } from "@ant-design/icons";
import { Card, Image, Modal, Button, Tooltip, Typography, message } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ReportReasons from "./ReportReasons";
import { IReports } from "@/interfaces/reports";
import { deleteEventFn } from "@/services/events.service";
import { deleteReportsByEventFn } from "@/services/reports.service";

const ModerateEvent = ({
  eventData,
  reports,
  after,
}: {
  eventData: IEvent;
  reports: IReports[];
  after?: () => void;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAcceptEvent = async () => {
    console.log("aceptar evento", eventData);
    Modal.confirm({
      title: "¿Estás seguro de aceptar este evento?",
      content: "Esta acción no se puede deshacer",
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          message.loading({
            content: "Eliminando reportes...",
            key: "deleteReports",
            duration: 0,
          });
          await deleteReportsByEventFn(eventData._id);

          after && (await after());
          message.success({
            content: "Reportes eliminados con éxito",
            key: "deleteReports",
          });
        } catch (error) {
          message.error({
            content: "No fue posible eliminar los reportes",
            key: "deleteReports",
          });
          console.log(error);
        }
      },
    });
  };

  const handleRejectEvent = () => {
    console.log("rechazar evento", eventData);
    Modal.confirm({
      title: "¿Estás seguro de eliminar este evento?",
      content: "Esta acción no se puede deshacer",
      okText: "Eliminar",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteEventFn(eventData._id);
          after && (await after());
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return (
    <>
      <Tooltip title="Ver evento">
        <Button
          shape="circle"
          onClick={() => setIsOpenModal(true)}
          icon={<EyeOutlined />}
        />
      </Tooltip>
      <Modal
        destroyOnClose
        width={1000}
        open={isOpenModal}
        centered
        onCancel={() => setIsOpenModal(false)}
        footer={[
          <Button danger onClick={handleRejectEvent}>
            Eliminar evento
          </Button>,
          <Button type="primary" onClick={handleAcceptEvent}>
            Aceptar evento
          </Button>,
        ]}
      >
        <>
          <h2>Revisar evento</h2>

          <div className="moderateContainer">
            <div className="moderateContainer__eventPreview">
              <Card
                title={eventData?.title}
                className="card__index shadow"
                cover={
                  <Image src={eventData?.photo} fallback="/escudoUnal.png" />
                }
              >
                <Card.Meta
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
            </div>
            <div className="reasons">
              <ReportReasons reports={reports} />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default ModerateEvent;
