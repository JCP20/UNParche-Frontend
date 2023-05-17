import dayjs from "dayjs";

export const columnsEvents: any[] = [
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
];
