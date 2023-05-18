import { IEvent } from "@/interfaces/events";
import { EyeOutlined } from "@ant-design/icons";
import { Card, Image, Modal, Button, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ReportReasons from "./ReportReasons";
import { IReports } from "@/interfaces/reports";

const ModerateEvent = ({
  eventData,
  reports,
}: {
  eventData: IEvent;
  reports: IReports[];
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

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
          <Button danger>Rechazar</Button>,
          <Button type="primary">Aceptar</Button>,
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
