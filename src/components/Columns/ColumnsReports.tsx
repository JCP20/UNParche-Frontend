import { IEvent } from "@/interfaces/events";
import dayjs from "dayjs";
import ModerateEvent from "../Events/ModerateEvent";

export const columnsReports = (after?: () => void) => {
  const operations = (_: any, record: any) => {
    return (
      <>
        <ModerateEvent
          after={after}
          eventData={record.event}
          reports={record.reports}
        />
      </>
    );
  };

  return [
    {
      title: "Evento",
      dataIndex: "event",
      key: "event",
      render: (event: IEvent) => event.title,
    },
    {
      title: "Fecha del evento",
      dataIndex: "event",
      key: "event",
      render: (event: IEvent) => dayjs(event.date).format("DD/MM/YYYY a"),
    },
    {
      title: "Cantidad de reportes",
      dataIndex: "count",
      key: "count",
      sorter: (a: any, b: any) => a.count - b.count,
      width: 400,
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: operations,
    },
  ];
};
