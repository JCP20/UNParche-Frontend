import {
  CalendarOutlined,
  HomeOutlined,
  BellOutlined,
  PoweroffOutlined,
  CommentOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Menu, MenuProps, Switch } from "antd";
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
    "/calendarCopy", 
      <CalendarOutlined />
    
  ),
  getItem("Perfil", "6", <UserOutlined />),
  getItem("Mensajes", "/messages", <CommentOutlined />),

  getItem("Salir", "logout", <PoweroffOutlined />),
  getItem("Darkmode", "",
  <Switch />),
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
   
    <Layout style={{ height: "100vh" }} >
      <Header className="headerStyle">
          <div className="logo"></div>
          <SearchBar/>
          <div className="userNotify">
            <p>@{user.username}</p>
            <Badge dot>
              <Avatar shape="square" size={"small"} icon={<BellOutlined />} />
            </Badge>
          </div>
        </Header>
    <Layout >
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
          theme="light"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleOnClick}
        />
      </Sider>
      <Layout  style={{ overflow: 'scroll' }}>
      <Content>{children}</Content>
      </Layout> 
      <Footer style={{background: '#F4F4F4',width:'15%'}}>
        <p>Política de cookies</p>
          <p>© 2023 UnParche, Inc.</p></Footer> 
    </Layout>
    
    </Layout>
  );
};

export default MainLayout;
