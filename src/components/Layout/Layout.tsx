import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
  PoweroffOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter } from "next/router";
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
  getItem(
    "Inicio",
    "/",
    <Link href={"/"}>
      <HomeOutlined />
    </Link>
  ),

  getItem("Mis Grupos","/grupo",
       
      <TeamOutlined />,
[
    getItem("Grupo 1","/grupo", <Link href={"grupo"}></Link>),
    getItem("Grupo 2","/grupo", <Link href={"grupo"}></Link>),
    getItem("Grupo 3","/grupo", <Link href={"grupo"}></Link>),
  ]),
  getItem(
    "Calendario",
    "/calendar",
    <Link href={"calendar"}>
      <CalendarOutlined />
    </Link>
  ),
  getItem("Perfil", "6", <UserOutlined />),

  getItem("Más", "sub2", <MenuOutlined />, [
    getItem("Salir", "7", <PoweroffOutlined />),
    getItem("Configuración", "9", <SettingOutlined />),
  ]),
];

interface MainLayoutProps {
  children: JSX.Element;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  const [selectedKey, setSelectedKey] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [selectedKey]);

  return (
    <Layout style={{ minHeight: "100vh", background: "$color-base" }} hasSider>
      <Sider
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
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="mainLayoutContainer">
        <Content className="contentContainer">{children}</Content>
        <Content
          className="searchBarContainer"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <SearchBar />
          <div className="additionalInfo">
            <p>Política de cookies</p>
            <p>© 2023 UnParche, Inc.</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
