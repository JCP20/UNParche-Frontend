import {
  CalendarOutlined,
  CommentOutlined,
  HomeOutlined,
  PoweroffOutlined,
  CoffeeOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { getItem } from "./utils";
import { IGroup } from "@/interfaces/groups";

export const itemsMenuLayout = (groups: IGroup[], isAdmin: boolean) => {
  const menuItems = [
    getItem("Inicio", "/", <HomeOutlined />),
    getItem("Mis Grupos", "group", <TeamOutlined />, [
      ...groups.map((group) => getItem(group.name, `/groupPage/${group._id}`)),
      { type: "divider" },
      getItem("Crear grupo", "createGroup", <UserAddOutlined />),
    ]),
    getItem("Calendario", "/calendar", <CalendarOutlined />),
    getItem("Mensajes", "/messages", <CommentOutlined />),
    getItem("Salir", "logout", <PoweroffOutlined />),
  ];

  if (isAdmin) {
    menuItems.splice(
      4,
      0,
      getItem("Administrar", "/admin", <CoffeeOutlined />)
    );
  }

  return menuItems;
};
