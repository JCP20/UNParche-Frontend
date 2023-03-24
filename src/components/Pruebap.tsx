import React, { useState } from 'react';
import {  
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,  
  UserOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Image, Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Inicio', '1', <HomeOutlined />),
  
  getItem('Mis Grupos', 'sub1', <TeamOutlined />, [
    getItem('Grupo 1', '2'),
    getItem('Grupo 2', '3'),
    getItem('Grupo 3', '4'),
  ]),    
  getItem('Calendario', '5', <CalendarOutlined  />), 
  getItem('Perfil', '6', <UserOutlined  />),
  
  

  getItem('Más', 'sub2', <MenuOutlined />, [
    getItem('Salir', '7', <PoweroffOutlined />),
    getItem('Cambiar Cuenta', '8',<UserSwitchOutlined />),
    getItem('Configuración', '9',<SettingOutlined/>),
    getItem('Cambiar Aspecto', '10',<Image src="/imagenes/darkModeIcon"/>),
  ]),
];

const PruebApp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: '#2B3467' }} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  </Layout>
  );
};

export default PruebApp;