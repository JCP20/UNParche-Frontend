import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
  PoweroffOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Image, Layout, Menu } from "antd";
import React from "react";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Inicio", "1", <HomeOutlined />),

  getItem("Mis Grupos", "sub1", <TeamOutlined />, [
    getItem("Grupo 1", "2"),
    getItem("Grupo 2", "3"),
    getItem("Grupo 3", "4"),
  ]),
  getItem("Calendario", "5", <CalendarOutlined />),
  getItem("Perfil", "6", <UserOutlined />),

  getItem("Más", "sub2", <MenuOutlined />, [
    getItem("Salir", "7", <PoweroffOutlined />),
    getItem("Cambiar Cuenta", "8", <UserSwitchOutlined />),
    getItem("Configuración", "9", <SettingOutlined />),
    getItem("Cambiar Aspecto", "10", <Image src="/imagenes/darkModeIcon" />),
  ]),
];

interface SideMenuProps {
  children: JSX.Element;
}

const SideMenu: React.FC<SideMenuProps> = ({ children }: SideMenuProps) => {
  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider
        collapsible
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: 32 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SideMenu;
