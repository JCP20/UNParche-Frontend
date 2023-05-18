import dayjs from "dayjs";
import DeleteItem from "./DeleteItem";
import { deleteEventFn } from "@/services/events.service";

export const columnsEvents = (after?: () => void) => {
  const operations = (_: any, record: any) => {
    return (
      <>
        <DeleteItem record={record} service={deleteEventFn} after={after} />
      </>
    );
  };

  return [
    {
      title: "Grupo creador",
      dataIndex: "group",
      key: "group",
      render: (text: any) => text.name,
    },
    {
      title: "Nombre",
      dataIndex: "title",
      key: "title",
      search: true,
    },
    {
      title: "Fecha de realización",
      dataIndex: "date",
      key: "date",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm a"),
    },
    {
      title: "Creado en",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: operations,
    },
  ];
};
