
import React from 'react';
import { Breadcrumb, Layout, theme, Avatar, Badge, Space, Dropdown, MenuProps } from 'antd';
import SearchBar from './SearchBar';
import { UserOutlined, BellFilled } from '@ant-design/icons';
import NotiCardApp from '../NotificationCard';



const logo = "/imagenes/logRecort.png"
const { Header, Content, Footer } = Layout;

const items: MenuProps['items'] = [

    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
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
                    <SearchBar />
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
                        <Avatar shape="square" icon={<UserOutlined />} size='large' />
                    </Space>

                </Space>
            </Header>
        </Layout>
    );
};

export default HeaderApp;