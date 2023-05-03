
import {
  CalendarOutlined,
  HomeOutlined,
  BellOutlined,
  PoweroffOutlined,
  CommentOutlined,
  TeamOutlined,
  UserOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import { Avatar, Badge, ConfigProvider, Layout, Menu, MenuProps, Switch, theme, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthContext";
import { getItem } from "./utils";
import Image from "next/image";
const { Header, Content, Footer, Sider } = Layout;
import HeaderApp from "./Header";
import { text } from "stream/consumers";
type MenuItem = Required<MenuProps>["items"][number];
const logo = "/imagenes/logRecort.png"
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
  const [darkMode, setDarkMode] = useState(false);
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
  }}>
    <Layout style={{ height: "100vh" }} >
    <Header className="headerStyle">
                <Space size={180} >
                    <img src={logo} alt="App logo" width={100} />
                    <SearchBar  /> 
                    <Switch
           checkedChildren={<CoffeeOutlined />}
           unCheckedChildren={<HomeOutlined />}
           defaultChecked
           onChange={() => setDarkMode(!darkMode)}
            />
                               
                    </Space>
                    
              <div className="userNotify">
                 <p>@</p>
              <Badge dot>
              <Avatar shape="square"  icon={<BellOutlined />} />
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
    </ConfigProvider>
  );
};

export default MainLayout;
