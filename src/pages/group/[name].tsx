import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/components/Layout/Layout";
import CalendarApp from "@/components/calender";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  AntDesignOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  TabsProps,
  Tabs,
  Button,
  Calendar,
  List,
  Space,
  Tooltip,
  Layout,
  Badge,
  Tag,
  Row,
  Col
} from "antd";
const {Content, Sider } = Layout;
import type { Dayjs } from "dayjs";
import FormEvento from "@/components/FormEvent";
import FormGrupo from "@/components/CreateGroup";
import EventCardApp from "@/components/EventsCard";
import { createEventFn, EventsGroup, deleteEventFn } from "@/services/events.service";
import { updateGroupFn, GroupsNombre, usersGroup } from "@/services/groups.service";
import dayjs from "dayjs";
import { getUserById, Userenroll , Userquit } from "@/services/user.service";
import { AuthContext } from '@/context/auth/AuthContext';
dayjs.locale("es-mx");
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};


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


const Grupo: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const {user} = useContext(AuthContext);
  const [Grupo, setGrupoData] = useState<any>();
  const [Admin, setAdminData] = useState<any>();
  const [Events, setEventsData] = useState<any>();
  const [Users, setUsersData] = useState<any>();
 // console.log(user.id)
  const getGrupos = async (name:string) => {
    const data = await GroupsNombre(name);   
    if(data != null){
      setGrupoData(data);
      const eventos = await EventsGroup(data._id);
      const users = await  usersGroup(data._id); 
      const admin = await getUserById(data.administrators[0]);
      if(admin!= null){
        setEventsData(eventos);
        setAdminData(admin);
        setUsersData(users); 
      }        
    }
  }; 

  useEffect(() => {
    getGrupos(name as string);
  }, [name]);
  const enroll = async (username:string,name:string) => {
    const input= {username,name}
    const data = await  Userenroll(input); 
    console.log(data);  
  };
  const quit = async (username:string,name:string) => {
    const input= {username,name}
    const data = await  Userquit(input); 
    console.log(data);  
  };
  const deleteEvent = async (id:string) => {
    const data = await  deleteEventFn(id); 
    console.log(data);  
  }; 
  //console.log(Grupo.category)
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Eventos`,
      children: (
          <Row>
            <Col span={5}>
            <FormEvento service={createEventFn} initialValues={"Crear Evento"} />
            </Col>
            <Col span= {14}>
          <List
          itemLayout="vertical"
          dataSource={Events}
          renderItem={(item, index) => (
          <List.Item >
          <Space direction="vertical">
          <EventCardApp
          nombreEvento = {item.title}
          descripcionEvento={item.description}
          fechaEvento={item.date}
          horaEvento={item.schedule}
          nombreGrupo={name}
          ></EventCardApp>                 
          {Admin && (Admin._id == user.id) && (
            <Space>

          <Button
          onClick ={() => deleteEvent(item._id)}
          >Eliminar</Button>
          <Button>Editar</Button>
          </Space>
          ) 
          }          
          </Space>
        </List.Item>
          
      )}
    /> 
    </Col>      
        </Row>
      ),
    },
    {
      key: "2",
      label: `Calendario`,
      children: (
        <div>
           {Grupo && (<CalendarApp
            type="Group"
            id= {Grupo._id}
            ></CalendarApp>) }
        </div>
      ),
    },
    {
      key: "3",
      label: `Admin`,
      children: (
          <Row gutter={16}>
          <Col span={12}>         
          <Card actions={[
         <UserOutlined key="setting" />,]}>
          {Admin && (<Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
            title= {Admin.username}
            description= {Admin.email}

          />)}
          
        </Card>
          </Col>
          <Col span={12} style={{padding:'24px'}}>        
          <Button type="primary">Iniciar Chat</Button>
          </Col>
         </Row>
      ),
    },
  ];
    return (
      <MainLayout notShowHeader>       
          <Layout>
            <Content style={{padding: '24px', marginRight: 300 }}>
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
                //overflow: "auto",
                //height: "100vh",
                position: "fixed",
                right: "0",
                top: "5",
                //align-items: 'center',
                padding: "16px  16px",
              }}
            >
            {Grupo && (
              <Badge.Ribbon text= {Grupo.category} color="#2b3467">
                           
                <Card
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
              
                >
                    <Meta
                      title= { name }
                      description= {Grupo.description}
                    />
                    <Space direction="vertical">
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
                  
                  {Admin && (Admin._id == user.id) && (
                  <FormGrupo
                      service={updateGroupFn}
                      initialValues={"Editar"}
                    />)}
                   
                    {Users && (!Users.includes(user.id)) && !(Admin._id == user.id) && (                  
                    <Button
                     onClick ={() => enroll(user.username , name )}
                    >Unirme</Button>)}
                    {Users && (Users.includes(user.id)) &&  !(Admin._id == user.id) &&(
                    <Button
                    onClick ={() => quit(user.username , name)}
                    >Salirme</Button>                   
                    )}
                </Space>
                </Card>
              </Badge.Ribbon>
              )}
            </Sider>
          </Layout>
      </MainLayout>
    );
  };
  export default Grupo;