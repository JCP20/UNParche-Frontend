import dayjs from "dayjs";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import DeleteItem from "./DeleteItem";
import { deleteUserFn } from "@/services/user.service";

export const columnsUsers = (after?: () => void) => {
  const operations = (_: any, record: any) => {
    return (
      <>
        <DeleteItem record={record} service={deleteUserFn} after={after} />
      </>
    );
  };

  return [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      search: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      search: true,
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      search: true,
    },
    {
      title: "Verificado",
      dataIndex: "verified",
      key: "verified",
      // use icons
      render: (verified: boolean) =>
        verified ? (
          <CheckCircleTwoTone twoToneColor={"#52c41a"} />
        ) : (
          <CloseCircleTwoTone twoToneColor={"#FF0000"} />
        ),
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
