
import React from 'react';
import { Breadcrumb, Layout, theme, Avatar, Badge, Space, Dropdown, MenuProps } from 'antd';
import SearchBar from './SearchBar';
import { UserOutlined, BellFilled, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import NotiCardApp from '../NotificationCard';
import SelectApp from '../SelecCategory';



const logo = "/imagenes/logRecort.png"
const { Header, Content, Footer } = Layout;

const items: MenuProps['items'] = [

    {
        label: <a href=""> {"Blablablabla"}  </a> ,
        key: '1',
        icon:<UserOutlined/>,
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const options: MenuProps['items'] = [

    {
        label: <a href="http://localhost:3000/login"> Cerrar Sesión  </a> ,
        key: '1',
        icon:<PoweroffOutlined />,
    },
    {
        type: 'divider',
    },
    {
        label: <a href=""> Configuración </a> ,
        key: '2',
        icon:<SettingOutlined />,
    },
];



const HeaderApp: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <Space size={350} align="center">
                    <img src={logo} alt="App logo" width={150} />
                    <Space.Compact  direction='vertical'>
                        <SearchBar />     
                        <SelectApp/>
                    </Space.Compact>
                    <Space>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Badge count={3}>
                                        <Avatar shape="circle" icon={<BellFilled />} size='large' />
                                    </Badge>
                                </Space>
                            </a>
                        </Dropdown>
                        <Dropdown menu={{ items:options }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                            <Avatar shape="square" icon={<UserOutlined />} size='large' />
                            </a>
                        </Dropdown>
                        
                    </Space>

                </Space>
            </Header>
        </Layout>
    );
};

export default HeaderApp;