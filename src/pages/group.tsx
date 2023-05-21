import FormGrupo from "@/components/Group/FromGroup";
import EventCard from "@/components/Events/EventsCard";
import FormEvento from "@/components/Events/FormEvent";
import { createEventFn } from "@/services/events.service";
import { updateGroupFn } from "@/services/groups.service";
import {
  AntDesignOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Calendar,
  Card,
  Col,
  Image,
  Layout,
  List,
  Row,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Tooltip,
} from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";
import MainLayout from "../components/Layout/Layout";
const { Header, Content, Sider } = Layout;
dayjs.locale("es-mx");
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
const pdata = [
  {
    title: "Pepito",
  },
  {
    title: "Ana Maria",
  },
  {
    title: "Juan",
  },
  {
    title: "Jose",
  },
];
const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `Publicacion ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "Evento en la concha Acústica ",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
}));
const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const { Meta } = Card;
const onChange = (key: string) => {
  console.log(key);
};
const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Eventos`,
    children: (
      <Row>
        <Col span={5}>
          <FormEvento service={createEventFn} initialValues={"Crear Evento"} />
        </Col>
        <List
          itemLayout="vertical"
          dataSource={pdata}
          renderItem={(item, index) => (
            <List.Item>
              <Space direction="vertical">
                <EventCard />
                <Space>
                  <Button>Eliminar</Button>
                  <Button>Editar</Button>
                </Space>
              </Space>
            </List.Item>
          )}
        />
      </Row>
    ),
  },
  {
    key: "2",
    label: `Calendario`,
    children: (
      <div>
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </div>
    ),
  },
  {
    key: "3",
    label: `Admin`,
    children: (
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title="Pepito Perez"
              description="pepitoperez@unal.edu.co"
            />
          </Card>
        </Col>
        <Col span={12} style={{ padding: "24px" }}>
          <Button type="primary">Iniciar Chat</Button>
        </Col>
      </Row>
    ),
  },
];

const Grupo: React.FC = () => {
  return (
    <MainLayout notShowHeader>
      <Layout>
        <Content style={{ padding: "24px", marginRight: 300 }}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            items={items}
            onChange={onChange}
          />
        </Content>
        <Sider
          width={300}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            right: "0",
            padding: "16px  16px",
          }}
        >
          <Badge.Ribbon text="Público" color="#2b3467">
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <FormGrupo service={updateGroupFn} initialValues={"Editar"} />,
                <Button>Unirme </Button>,
              ]}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Meta
                  title="Grupo 1"
                  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                />
                <Tag color="magenta">Religion</Tag>
              </Space>
              <Card style={{ marginTop: 48 }}>
                <Avatar.Group maxCount={6}>
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                  <Tooltip title="Ant User">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Avatar
                    style={{ backgroundColor: "#1890ff" }}
                    icon={<AntDesignOutlined />}
                  />
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                  <Tooltip title="Ant User">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Avatar
                    style={{ backgroundColor: "#1890ff" }}
                    icon={<AntDesignOutlined />}
                  />
                </Avatar.Group>
              </Card>
            </Card>
          </Badge.Ribbon>
        </Sider>
      </Layout>
    </MainLayout>
  );
};
export default Grupo;
