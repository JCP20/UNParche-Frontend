import "dayjs/locale/es-mx";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Modal } from "antd";
import type { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layout/Layout";
import dayjs from "dayjs";
import EventCardApp from "@/components/EventsCard";
import { getGroupByNameFn } from "@/services/groups.service";
import { getEventsUserFn } from "@/services/events.service";


dayjs.locale("es-mx");
var fecha = '';

const getListData = (value: Dayjs, datos: any) => {
  let listData = [];
  //listData =[{ type: 'success', content: datos[0] }]
  for (let i = 0; i < datos.length; i++) {
    listData.push({ type: 'success', content: datos[i] });
  }
  return listData || [];
};



const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (nn: string) => {

    setIsModalOpen(true);
    fecha = nn;
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs, datos: any) => {
    const listData = getListData(value, datos);
    //console.log(listData);
    return (
      <ul className="events">
        {listData.map((item) => (

          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        )

        )}
      </ul>
    );
  };
  const getData = async () => {
    const data = await getEventsUserFn("6451b2e42106d973347a5fc8");
    console.log(data[0].date);
    const fecha = dayjs(data[0].date, ("DD/MM/YY"));
    dateCellRender(fecha, data);
    //setCalendarEvents(data);
  };
  //const [calendarEvents, setCalendarEvents] = useState<any>([])
  useEffect(() => {
    getData(); //obtener información
  }, [])

  return (
    <MainLayout>
      <>
        <Modal title={"Eventos destacados del día  "} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <EventCardApp />
          <EventCardApp />
          <EventCardApp />
        </Modal>
        <h2>Calendario</h2>
        <div className="calendarContainer">
          <Calendar
            //dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onSelect={(e) => { showModal(e.format("DD/MM/YY")) }}

          />
        </div>
      </>
    </MainLayout>
  );
};

export default CalendarPage;
