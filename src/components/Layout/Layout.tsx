import {
  CalendarOutlined,
  HomeOutlined,
  BellOutlined,
  PoweroffOutlined,
  CommentOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Menu, MenuProps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthContext";
import { getItem } from "./utils";
import Image from "next/image";
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
  getItem("Mensajes", "/messages", <CommentOutlined />),

  getItem("Salir", "logout", <PoweroffOutlined />),
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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [selectedKey]);

  const handleOnClick = (e: any) => {
    if (e.key === "logout") {
      logout();
    } else {
      router.push(`/${e.key}`);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }} >
      <Sider
        collapsible
        onCollapse={(collapsed) => setIsCollapsed(collapsed)}
        collapsed={isCollapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
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

      <Layout>
        <Header className="headerStyle">
          <div className="logo"></div>
          <SearchBar /*className="searchBarHeader"*/ />
          <div className="userNotify">
            <p>@{user.username}</p>
            <Badge dot>
              <Avatar shape="square" size={"small"} icon={<BellOutlined />} />
            </Badge>
          </div>
        </Header>
        <Layout style={{ height: "100%", width: "100%" }}>
          <div className="contentStyle">
            <Content>{children}</Content>
            {!notShowHeader && (
              <Sider
                style={{
                  background: "#f6f6f6",
                  width: "30%",
                  // padding: "20px",
                }}
              >
                <p>Política de cookies</p>
                <p>© 2023 UnParche, Inc.</p>
              </Sider>
            )}
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
