import dayjs from "dayjs";
import DeleteItem from "./DeleteItem";
import { deleteGroupFn } from "@/services/groups.service";

export const columnsGroups = (after?: () => void) => {
  const operations = (_: any, record: any) => {
    return (
      <>
        <DeleteItem record={record} service={deleteGroupFn} after={after} />
      </>
    );
  };

  return [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      search: true,
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
      search: true,
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
