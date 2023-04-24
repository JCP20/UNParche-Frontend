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
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthContext";
import { getItem } from "./utils";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  getItem(
    "Inicio",
    "/",
    <Link href={"/"}>
      <HomeOutlined />
    </Link>
  ),

  getItem(
    "Mis Grupos",
    "/grupo",

    <TeamOutlined />,
    [
      getItem("Grupo 1", "/grupo", <Link href={"grupo"}></Link>),
      getItem("Grupo 2", "/grupo", <Link href={"grupo"}></Link>),
      getItem("Grupo 3", "/grupo", <Link href={"grupo"}></Link>),
    ]
  ),
  getItem(
    "Calendario",
    "/calendar",
    <Link href={"calendar"}>
      <CalendarOutlined />
    </Link>
  ),
  getItem("Perfil", "6", <UserOutlined />),

  getItem("Más", "sub2", <MenuOutlined />, [
    getItem("Salir", "logout", <PoweroffOutlined />),
    getItem("Configuración", "9", <SettingOutlined />),
  ]),
];

interface MainLayoutProps {
  children: JSX.Element;
  notShowHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  notShowHeader,
}: MainLayoutProps) => {
  const { logout } = useContext(AuthContext);

  const [selectedKey, setSelectedKey] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [selectedKey]);

  const handleOnClick = (e: any) => {
    if (e.key === "logout") {
      logout();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "$color-base" }} hasSider>
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
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleOnClick}
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
          {!notShowHeader && <SearchBar />}
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
