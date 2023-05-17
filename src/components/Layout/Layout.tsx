import { AuthContext } from "@/context/auth/AuthContext";
import { IGroup } from "@/interfaces/groups";
import { createGroupFn, getGroupsByUserFn } from "@/services/groups.service";
import { Layout, Menu, Spin, Tooltip, theme } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CrearGrupo from "../CreateGroup";
import { itemsMenuLayout } from "./MenuItems";
import SearchBar from "./SearchBar";

const { Header, Content, Footer, Sider } = Layout;

interface MainLayoutProps {
  children: JSX.Element;
  notShowHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  notShowHeader,
}: MainLayoutProps) => {
  const { logout } = useContext(AuthContext);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="headerStyle">
        <div className="logoLayout">
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
            <p>© 2023 UnParche</p>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
