import React, { useContext, useEffect, useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Modal } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import MainLayout from "@/components/Layout/Layout";
import dayjs from "dayjs";
import { AuthContext } from "@/context/auth/AuthContext";
import EventCard from "@/components/Events/EventsCard";
import { getEventsUserFn } from "@/services/events.service";
import "dayjs/locale/es-mx";

dayjs.locale("es-mx");

var actDate = "";

const getListData = (value: Dayjs, data: any) => {
  let listData;
  if (data.length > 0) {
    const fecha = value.format("DD/MM/YY");
    //console.log(data[1].date, fecha);

    for (let i = 0; i < data.length; i++) {
      if (fecha == data[i].date) {
        listData = [{ type: "warning", content: data[i].title }];
        break;
      }
    }
  }
  return listData || [];
};

const CalendarApp: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [calendarEvents, setCalendarEvents] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (nn: string, eventos: any) => {
    setIsModalOpen(true);
    actDate = nn;
    for (let i = 0; i < eventos.length; i++) {
      if (actDate == eventos[i].date) {
        console.log("funnciona");
      }
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    const data = await getEventsUserFn(user.id);
    // console.log(data);
    // const fecha = dayjs(data[0].date, ("DD/MM/YY"));
    setCalendarEvents(data);
  };

  useEffect(() => {
    getData(); //obtener información
  }, []);

  const dateCellRender = (value: Dayjs, datos: any) => {
    const listData = getListData(value, datos);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current, calendarEvents);
    return info.originNode;
  };

  const loadEvents = (eventos: any) => {
    const result = eventos.filter((e: any) => e.date === actDate);
    return result.map((e: any) => <EventCard eventData={e} />);
  };

  return (
    <MainLayout title="Calendario">
      <div className="p-1">
        <Modal
          title={"Eventos destacados del día  " + actDate}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          bodyStyle={{
            overflowY: "auto",
            maxHeight: "calc(85vh - 10em)",
            padding: "1em",
          }}
          width={"41em"}
        >
          {loadEvents(calendarEvents)}
        </Modal>
        <h2>Calendario</h2>
        <Calendar
          cellRender={cellRender}
          onSelect={(e) => {
            showModal(e.format("DD/MM/YY"), calendarEvents);
          }}
        />
      </div>
    </MainLayout>
  );
};
export default CalendarApp;
