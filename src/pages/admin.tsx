import React,{ useState } from 'react';
import { Col, Card, Row, Space, Button, Statistic, Popconfirm ,Layout, FloatButton, message, Collapse, Divider, Radio, Input, Form} from 'antd';
const { Header, Content } = Layout;
const { Panel } = Collapse;
const { Meta } = Card;
import EventCardApp from "@/components/EventsCard";
import Complaints from '@/components/Complaints';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const onFinish = (values: any) => {
  console.log('Success:', values);
};
const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error('Click on No');
};
  const onChange = (key: string) => {
    console.log(key);
  };
  const text =
<div>
    <Row gutter={[16, 16]}>
    <Col span={10}>
    <EventCardApp/>
    </Col>
    <Col span={14} >
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
    <Complaints/> 
    <Popconfirm
    title="Eliminar Evento"
    description="¿Estas seguro que quieres eliminar este evento?"
    onConfirm = {confirm}
    okText="Sí"
    cancelText="No"
  >
    <Button type="primary">Eliminar Evento</Button>
  </Popconfirm>  
  </Space>
  </Col>
  <FloatButton></FloatButton>
  <Col span={10}>
    <EventCardApp/>
    </Col>
    <Col span={14}>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
    <Complaints/>  
    <Popconfirm
    title="Eliminar Evento"
    description="¿Estas seguro que quieres eliminar este evento?"
    onConfirm = {confirm}
    okText="Sí"
    cancelText="No"
  >
    <Button type="primary">Eliminar Evento</Button>
  </Popconfirm>  
  </Space>
  </Col>
  </Row>
      </div> ;

const genExtra = () => (
  <Popconfirm
  title="Eliminar Grupo"
  description="¿Estas seguro que quieres eliminar este grupo?"
  onConfirm = {confirm}
  okText="Sí"
  cancelText="No"
  onClick={(event) => {
    event.stopPropagation();
  }}
>
  <Button>Eliminar Grupo</Button>
</Popconfirm> 
);

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

const Admin: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState<string>('app');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <Layout>
    <Content style={{ padding: '24px 24px',height: "100%"}}>
    <Row gutter={[16, 16]}>
    <Col span={12}>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      
    <div className='bienvenida'>
      <Card  bordered={false}  > 
        Bienvenido Equipo UnParche  
          
      </Card>
      </div>
      <Col>
      <Space direction="horizontal" size="middle" style={{ display: 'flex' }}> 
      <Button type='primary'>Todos</Button>
      <Form
       name="basic"
       onFinish={onFinish}
       autoComplete="off"
       layout="inline"
  >
    <Form.Item
      name="filtro"
    >
      <Radio.Group defaultValue="a" >
      <Radio.Button value="a">Eventos</Radio.Button>
      <Radio.Button value="b">Grupos</Radio.Button>
      <Radio.Button value="c">Usuarios</Radio.Button>
    </Radio.Group>
    </Form.Item>
    <Form.Item
      name="search"
    >
    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 220}} />
    </Form.Item>  
    </Form>
    </Space>
      </Col> 
      </Space>
    </Col>
    <Col span={6}>
      <Card  bordered={false}>
        <Statistic
          title="Usuarios Activos"
          value={32}
          valueStyle={{ color: '#2b3467' }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          title="Grupos Activos"
          value={10}
          valueStyle={{ color: '#2b3467' }}
        />
      </Card>
    </Col>
   
  </Row>
  <Divider plain>Eventos Denunciados</Divider>
  <Row gutter={[16, 16]}>
  <Col span={6}>
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
  Dueño del grupo
  <Card >jucardozope@unal.edu.co </Card>
  <Button danger>Eliminar Usuario</Button> 
  </Space>
  </Col>  
  <Col span={18}>
  <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Grupo 1" key="1" extra={genExtra()}>
        <p>{text}</p>
      </Panel>
      <Panel header="Grupo 2" key="2" extra={genExtra()}>
        <p>{text}</p>
      </Panel>
      <Panel header="Grupo 3" key="3" extra={genExtra()}>
        <p>{text}</p>
      </Panel>
    </Collapse>
  </Col>
  </Row>

    </Content>
  </Layout>
  );
};

export default Admin;
