import {
  CalendarOutlined,
  HomeOutlined,
  BellOutlined,
  PoweroffOutlined,
  CommentOutlined,
  TeamOutlined,
  UserOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  ConfigProvider,
  Layout,
  Menu,
  MenuProps,
  Switch,
  theme,
  Space,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthContext";
import { GroupsfromAdmin } from "@/services/groups.service";
import { getItem } from "./utils";
import Image from "next/image";
const { Header, Content, Footer, Sider } = Layout;
import HeaderApp from "./Header";
import { text } from "stream/consumers";
type MenuItem = Required<MenuProps>["items"][number];
const logo = "/imagenes/logRecort.png";
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
    "/gruop",

    <TeamOutlined />,
    [
      getItem("Grupo 1", "/group"),
      getItem("Grupo 2", "/group"),
      getItem("Grupo 3", "/group"),
      
    ]
  ),
  getItem(
    "Calendario",
    "/calendar",
    <Link href={"calendar"}>
      <CalendarOutlined />
    </Link>
  ),
  getItem("Perfil", "/profile", <UserOutlined />),
  getItem("Mensajes", "/messages", <CommentOutlined />),

  getItem("Salir", "logout", <PoweroffOutlined />),
];

interface MainLayoutProps {
  children: JSX.Element;
  notShowHeader?: boolean;
}

const Grupos: React.FC<MainLayoutProps>=() =>{
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const { user } = useContext(AuthContext);
    const test =  await GroupsfromAdmin(user.id);
    console.log(test.data);
  }, []);
  return(
    console.log(data)
  );
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
  const [darkMode, setDarkMode] = useState(false);

  const items: MenuItem[] = [
    getItem(
      "Inicio",
      "",

      <HomeOutlined />
    ),

    getItem(
      "Mis Grupos",
      "gruop",

      <TeamOutlined />,
      [
        getItem("Grupo 1", "/group"),
        getItem("Grupo 2", "/group"),
        getItem("Grupo 3", "/group"),
      ]
    ),
    getItem(
      "Calendario",
      "calendar",

      <CalendarOutlined />
    ),
    getItem("Perfil", `profile/${user.id}`, <UserOutlined />),
    getItem("Mensajes", "messages", <CommentOutlined />),

    getItem("Salir", "logout", <PoweroffOutlined />),
  ];

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
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Header className="headerStyle">
          <div className="logo"></div>
          <SearchBar className="searchBarHeader" />
          <div className="userNotify">
            <p>@{user.username}</p>
          </div>
          {/* <Switch
            checkedChildren={<CoffeeOutlined />}
            unCheckedChildren={<HomeOutlined />}
            defaultChecked
            onChange={() => setDarkMode(!darkMode)}
          /> */}
        </Header>
        <Layout hasSider>
          <Sider
            collapsible
            onCollapse={(collapsed) => setIsCollapsed(collapsed)}
            collapsed={isCollapsed}
            style={{
              overflow: "auto",
              position: "sticky",
              top: 0,
              left: 0,
            }}
          >
            <Menu
              selectedKeys={[selectedKey]}
              mode="inline"
              items={items}
              onClick={handleOnClick}
            />
          </Sider>
          <Layout>
            <Content
              style={{
                overflowY: "auto",
                background: "#0000",
                padding: "1rem",
                height: "100%",
                width: "100%",
              }}
            >
              {children}
            </Content>
          </Layout>
          {!notShowHeader && (
            <Footer style={{ background: "#F4F4F4", width: "20%" }}>
              <p>Política de cookies</p>
              <p>© 2023 UnParche, Inc.</p>
            </Footer>
          )}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
