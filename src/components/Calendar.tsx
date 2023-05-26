import React, { useContext, useEffect, useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { getEventsUserFn } from '@/services/events.service';
import EventCardApp from '@/components/Events/EventsCard';
import {getEventsByGroupFn } from '@/services/events.service';
interface CalenderProps {
  type?: string;
  id: string;
}

var actDate = '';
const getListData = (value: Dayjs, data: any) => {
  let listData;
  if (data.length > 0) {
    const fecha = value.format("DD/MM/YY");
    //console.log(data[1].date, fecha);

    for (let i = 0; i < data.length; i++) {
      if (fecha == data[i].date) {
        listData = [
          { type: 'warning', content: data[i].title }
        ];
        break;
      }
    }
  }
  return listData || [];
};




const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarApp: React.FC<CalenderProps> = (props) => {
  const { type, id } = props;
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
    if(type == "Group" ){
        const data = await getEventsByGroupFn(id);
        setCalendarEvents(data);
    }
    else{
        const data = await getEventsUserFn(id);
        setCalendarEvents(data);
    }
    //const fecha = dayjs(data[0].date, ("DD/MM/YY"));
    
  };
  const [calendarEvents, setCalendarEvents] = useState<any>([]);

  useEffect(() => {
    getData(); //obtener información
  }, [])
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
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current, calendarEvents);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  const loadEvents = (eventos: any) => {
    console.log(eventos);
    const result = eventos.filter((e: any) => e.date === actDate);
    return result.map((e: any) => <EventCardApp
      eventData={e.data}
      />);
  };

  return (

      <>
        <Modal title={"Eventos destacados del día  " + actDate} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(85vh - 10em)', padding: "1em"}}
          width={'41em'}
        >          
          {loadEvents(calendarEvents)}
        </Modal>
        <Calendar cellRender={cellRender}
          onSelect={(e) => { showModal(e.format("DD/MM/YY"), calendarEvents) }}

        />;

      </>
  )
};
export default CalendarApp;
