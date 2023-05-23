import { AuthContext } from "@/context/auth/AuthContext";
import { IGroup } from "@/interfaces/groups";
import { createGroupFn, getGroupsByUserFn } from "@/services/groups.service";
import { Button, Layout, Menu, Modal, Tooltip, Typography, theme } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CrearGrupo from "../Group/FromGroup";
import { itemsMenuLayout } from "./MenuItems";
import SearchBar from "./SearchBar";
import Head from "next/head";

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
      } else {
        router.push(e.key);
      }
    }
  };

  const getData = async () => {
    const res = await getGroupsByUserFn(user.id);
    console.log("me llame!");
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
        {/* <Switch
            checkedChildren={<CoffeeOutlined />}
            unCheckedChildren={<HomeOutlined />}
            defaultChecked
            onChange={() => setDarkMode(!darkMode)}
          /> */}
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
            items={itemsMenuLayout(groups, user.role === "admin")}
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
    </Layout>
  );
};

export default MainLayout;
