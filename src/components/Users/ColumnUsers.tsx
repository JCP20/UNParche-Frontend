import dayjs from "dayjs";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

export const columnsUsers: any[] = [
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
];
