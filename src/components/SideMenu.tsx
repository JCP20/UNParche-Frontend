import React, { useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Image } from "antd";
import { icons } from "antd/es/image/PreviewGroup";

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
const darkModeIcon = "https://icons8.com/icon/y5BgSIdWF2fl/night-mode";
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

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SideMenu;
