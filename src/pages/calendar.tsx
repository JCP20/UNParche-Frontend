import "dayjs/locale/es-mx";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Modal } from "antd";
import type { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layout/Layout";
import dayjs from "dayjs";
import EventCardApp from "@/components/EventsCard";
import { getGroupByNameFn } from "@/services/groups.service";


dayjs.locale("es-mx");
var fecha = '';

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
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

  const showModal = (nn: string ) => {
    
    setIsModalOpen(true);
    fecha =nn;
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

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
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
  const getData = async () => {
    const data =  await getGroupByNameFn("/microUN");
    console.log(data);
    setCalendarEvents(data);
  };
  const [calendarEvents, setCalendarEvents] = useState<any>([])
  useEffect(() => {
    getData(); //obtener información
  }, [])

  return (
    <MainLayout>
      <>
      <Modal title={"Eventos destacados del día  "+ fecha} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <EventCardApp/>
      <EventCardApp/>
      <EventCardApp/>
      </Modal>
        <h2>Calendario</h2>
        <div className="calendarContainer">
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onSelect={(e)=>{showModal(e.format("DD/MM/YY"))}}
            
          />
        </div>
      </>
    </MainLayout>
  );
};

export default CalendarPage;
