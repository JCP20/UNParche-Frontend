import React from 'react';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { EditOutlined, EllipsisOutlined, SettingOutlined,LikeOutlined, MessageOutlined, StarOutlined,AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, TabsProps, Tabs, Button, Calendar,List, Space, Tooltip ,Row,Col} from 'antd';
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
dayjs.locale("es-mx");
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};
const pdata = [
  {
    title: 'Pepito',
  },
  {
    title: 'Ana Maria',
  },
  {
    title: 'Juan',
  },
  {
    title: 'Jose',
  },
];

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Publicacion ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Evento en la concha Acústica ',
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

const items: TabsProps['items'] = [
  
  {
    key: '1',
    label: `Posts`,
    children: <div><Button type="primary">Nueva Publicacion</Button>
      <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  </div>
  },
  {
    key: '2',
    label: `Eventos`,
    children: <div><Button type="primary">Nuevo Evento</Button>
    <div>
     <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
    </div>
  },
  {
    key: '3',
    label: `Admins`,
    children: <div>
     <List
    itemLayout="horizontal"
    dataSource={pdata}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="@unal.edu.co"
        />
      </List.Item>
    )}
  />
    </div>}
];



const Grupo: React.FC = () => {



  return ( 
  <Row>   
  <Col span={16}>
  <Tabs
        defaultActiveKey="1" type="card" items={items} onChange={onChange}
      />
   
  </Col>
  <Col span={8} style={{ background: '#fcffe7',}}>
  <Row>
  <Card
    style={{ width: 300,position: 'fixed', top:32, left: 980}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Grupo 1"
      description="Descripcion del grupo"
    />
  </Card>
  </Row>
  <Row >
      <h1>Miembros </h1> 
      <Avatar.Group>
      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
      <a href="https://ant.design">
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
  </Row>
  </Col>

</Row>

  );
};

export default Grupo;