import dayjs from "dayjs";

export const columnsGroups: any[] = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Administradores",
    dataIndex: "administrators",
    key: "administrators",
    render: (administrators: any[]) =>
      administrators.map((admin) => admin.username).join(", "),
  },
  {
    title: "Categoría",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Creado en",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
  },
];
