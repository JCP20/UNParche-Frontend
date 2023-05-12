import {
  CalendarOutlined,
  CommentOutlined,
  HomeOutlined,
  PoweroffOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getItem } from "./utils";
import { IGroup } from "@/interfaces/groups";

export const itemsMenuLayout = (groups: IGroup[]) => {
  return [
    getItem("Inicio", "/", <HomeOutlined />),
    // getItem("Mis Grupos", "group", <TeamOutlined />, [
    //   getItem("Grupo 1", "/group"),
    //   getItem("Grupo 2", "/group"),
    //   getItem("Grupo 3", "/group"),
    //   { type: "divider" },
    //   getItem("Crear grupo", "createGroup", <UserAddOutlined />),
    // ]),
    getItem("Mis Grupos", "group", <TeamOutlined />, [
      ...groups.map((group) => getItem(group.name, `/groupPage/${group._id}`)),
      { type: "divider" },
      getItem("Crear grupo", "createGroup", <UserAddOutlined />),
    ]),
    getItem("Calendario", "/calendar", <CalendarOutlined />),
    // getItem("Perfil", `/profile/${id}`, <UserOutlined />),
    getItem("Mensajes", "/messages", <CommentOutlined />),

    getItem("Salir", "logout", <PoweroffOutlined />),
  ];
};
