import { AuthContext } from "@/context/auth/AuthContext";
import { IGroup } from "@/interfaces/groups";
import { createGroupFn, getGroupsByUserFn } from "@/services/groups.service";
import {
  CalendarOutlined,
  CoffeeOutlined,
  CommentOutlined,
  EyeOutlined,
  HomeOutlined,
  PoweroffOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Layout,
  List,
  Menu,
  Modal,
  Tooltip,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CrearGrupo from "../Group/FromGroup";

import Head from "next/head";
import SearchBar from "./SearchBar";
import { getItem } from "./utils";

const { Header, Content, Footer, Sider } = Layout;

interface MainLayoutProps {
  children: JSX.Element;
  title?: string;
  notShowHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  notShowHeader,
}: MainLayoutProps) => {
  const { logout } = useContext(AuthContext);
  // const { defaultAlgorithm, darkAlgorithm } = theme;
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const collapsedState = localStorage.getItem("collapsedState");
    return collapsedState ? JSON.parse(collapsedState) : false;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cookiesModal, setCookiesModal] = useState(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  // const [darkMode, setDarkMode] = useState(false);

  const handleOnClick = (e: any) => {
    if (e.key === "logout") {
      logout();
    } else {
      if (e.key === "createGroup") {
        setIsModalOpen(true);
      } else if (e.key === "seeMore") {
        setIsDrawerOpen(true);
      } else {
        router.push(e.key);
      }
    }
  };

  const getData = async () => {
    const res = await getGroupsByUserFn(user.id);
    if (res?.ok) {
      setGroups(res.data);
    }
  };

  useEffect(() => {
    setSelectedKey(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("collapsedState", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const renderGroupItems = () => {
    const MAX_GROUPS = 3;
    const displayedGroups = groups.slice(0, MAX_GROUPS);

    const groupItems = displayedGroups.map((group) =>
      getItem(group.name, `/groupPage/${group._id}`)
    );

    groupItems.push(
      { type: "divider" },
      getItem("Ver más", "seeMore", <EyeOutlined />)
    );

    return groupItems;
  };

  const itemsMenu = useMemo(() => {
    const groupItems = renderGroupItems();

    const menuItems = [
      getItem("Inicio", "/", <HomeOutlined />),
      getItem("Mis Grupos", "group", <TeamOutlined />, groupItems),
      getItem("Calendario", "/calendar", <CalendarOutlined />),
      getItem("Mensajes", "/messages", <CommentOutlined />),
      getItem("Salir", "logout", <PoweroffOutlined />),
    ];

    if (user.role === "admin") {
      menuItems.splice(
        4,
        0,
        getItem("Administrar", "/admin", <CoffeeOutlined />)
      );
    }

    return menuItems;
  }, [groups, user.role]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="headerStyle">
        <Head>
          <title>UnParche | {title ?? ""}</title>
        </Head>
        <div className="logoLayout" onClick={() => router.push("/")}>
          <img src="/imagenes/logRecort.png" />
        </div>
        <SearchBar className="searchBarHeader" />
        <Tooltip placement="bottom" title={"Ir a mi perfil"}>
          <div
            className="userNotify"
            onClick={() => router.push(`/profile/${user.id}`)}
          >
            <p>@{user.username}</p>
          </div>
        </Tooltip>
      </Header>
      <CrearGrupo
        user={user.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        service={createGroupFn}
        after={getData}
      />
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
            items={itemsMenu}
            onClick={handleOnClick}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              overflowY: "auto",
              background: "#0000",
              height: "100%",
              width: "100%",
            }}
          >
            <>{children}</>
          </Content>
        </Layout>
        {!notShowHeader && (
          <Footer
            style={{
              background: "#F4F4F4",
              width: "18%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Modal
              title="Política de Cookies"
              open={cookiesModal}
              onCancel={() => setCookiesModal(false)}
              footer={
                <>
                  <Button type="primary" onClick={() => setCookiesModal(false)}>
                    Ok
                  </Button>
                </>
              }
            >
              <Typography>
                <Typography.Paragraph>
                  Este sitio web utiliza cookies para fines de autenticación. Al
                  continuar utilizando este sitio, aceptas el uso de cookies
                  para autenticación. Estas cookies se utilizan para mantener tu
                  sesión de inicio de sesión y garantizar una experiencia de
                  usuario segura. No recopilamos ninguna información personal o
                  sensible a través de estas cookies.
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Puedes controlar y gestionar las cookies en la configuración
                  de tu navegador. Consulta la documentación de ayuda de tu
                  navegador para obtener más información sobre cómo bloquear,
                  eliminar o desactivar las cookies.
                </Typography.Paragraph>
              </Typography>
            </Modal>
            <p>
              <a onClick={() => setCookiesModal(true)}>Política de cookies</a>
            </p>
            <div className="creditsEnd">
              <p className="credits">
                Hecho con <span className="credits__hearth">❤</span> por equipo
                UNParche
              </p>
              <p className="credits">Universidad Nacional de Colombia, 2023</p>
            </div>
          </Footer>
        )}
      </Layout>
      <Drawer
        title="Mis Grupos"
        placement="left"
        closable={false}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <div className="drawerContent">
          <List
            className="drawerList"
            dataSource={groups}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  style={{ width: "100%", textAlign: "center" }}
                  title={
                    <a
                      onClick={() => {
                        router.push(`/groupPage/${item._id}`);
                      }}
                    >
                      {item.name}
                    </a>
                  }
                />
              </List.Item>
            )}
          />

          <div className="drawerCreateGroup">
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Crear grupo
            </Button>
          </div>

          <p className="drawerAdditional">UnParche</p>
        </div>
      </Drawer>
    </Layout>
  );
};

export default MainLayout;
