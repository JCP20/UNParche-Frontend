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
import Image from "next/image";
const { Header, Content, Footer, Sider } = Layout;
import { text } from "stream/consumers";
type MenuItem = Required<MenuProps>["items"][number];
import { useThemeContext } from '@/context/auth/ThemeContext';
const logo = "/imagenes/logRecort.png";
//const {contextTheme, setContextTheme} = useThemeContext()

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
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(AuthContext);
  const [GruposAdmin, setGruposData] = useState<any>();
  const getGrupos = async () => {
    const data = await GroupsfromAdmin(user.id);   
    if(data != null){
      setGruposData(data);
    }
  }; 
 
  const menuGrupos = (data: any) => {
    return data && data.map((group: any) => {
      return {
        key: `group/${group.name}`, 
        label: group.name
      };
    });
  };
  
  useEffect(() => {
    getGrupos();
  }, [])
  const items: MenuProps['items'] = [
    {
      label: 'Inicio',
      key: '',
      icon: <HomeOutlined />      ,
    },
    {
      label: 'Mis Grupos',
      key: 'group',
      icon:  <TeamOutlined />,
      children: menuGrupos(GruposAdmin)
    },
    {
      label: 'Calendario',
      key: 'calendar',
      icon:  <CalendarOutlined />,
   
    },
    {
      label:  'Perfil',
      key: `profile/${user.id}`,
      icon:  <UserOutlined />,
    },
    {
      label: 'Mensajes',
      key: 'messages',
      icon:  <CommentOutlined />,
    },
    {
      label: 'Salir',
      key: 'logout',
      icon:  <PoweroffOutlined />,
    },
  ];


  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [selectedKey]);
  const handleToggleTheme = () => {
    //const newTheme = contextTheme === 'lightMode' ? 'darkMode' : 'lightMode';
    //setContextTheme(newTheme);
  };
  const handleOnClick = (e: any) => {
    if (e.key === "logout") {
      logout();
    } else {
      router.push(`/${e.key}`);
    }
  };
  return (
    <ConfigProvider
    //theme={{
    //  algorithm: contextTheme === 'darkMode' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    //}}
  >
      <Layout style={{ height: "100vh" }}>
        <Header className="headerStyle">
          <div className="logo"></div>
          <SearchBar className="searchBarHeader" />
          <div className="userNotify">
            <p>@{user.username}</p>
          </div>
          <Switch
           checkedChildren={<CoffeeOutlined />}
           unCheckedChildren={<HomeOutlined />}
           defaultChecked
           onChange={handleToggleTheme}
            />
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
                //padding: "1rem",
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
