import React, { useState } from "react";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LikeOutlined,
  MessageOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Col,
  Card,
  Row,
  Tabs,
  Button,
  Statistic,
  Popconfirm,
  Layout,
  FloatButton,
  message,
} from "antd";
const { Header, Content, Sider } = Layout;
import { createGroupFn, updateGroupFn } from "@/services/groups.service";
import dayjs from "dayjs";

const confirm = (e: any) => {
  console.log(e);
  message.success("Click on Yes");
};
const tabList = [
  {
    key: "tab1",
    tab: "Eventos Denunciados",
  },
  {
    key: "tab2",
    tab: "Grupos",
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: (
    <p>
      {" "}
      <Popconfirm
        title="Eliminar Evento"
        description="¿Estas seguro que quieres eliminar este evento?"
        onConfirm={confirm}
        okText="Sí"
        cancelText="No"
      >
        <Button>Eliminar</Button>
      </Popconfirm>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>{" "}
      <Card bordered={false}>Bienvenido Equipo UnParche</Card>
      <FloatButton.BackTop />
    </p>
  ),
  tab2: <p>content2</p>,
};

const Grupo: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState<string>("app");

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Content style={{ padding: "24px 24px", height: "100%" }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card bordered={false}>Bienvenido Equipo UnParche</Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Usuarios Activos"
                  value={32}
                  valueStyle={{ color: "#2b3467" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Grupos Activos"
                  value={10}
                  valueStyle={{ color: "#2b3467" }}
                />
              </Card>
            </Col>
            <Card
              style={{ width: 1600 }}
              bordered={false}
              tabList={tabList}
              activeTabKey={activeTabKey2}
              onTabChange={onTab2Change}
            >
              {contentList[activeTabKey2]}
            </Card>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Grupo;
