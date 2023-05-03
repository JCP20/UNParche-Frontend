
import React from 'react';
import { Breadcrumb, Layout, theme, Avatar, Badge, Space, Dropdown, MenuProps } from 'antd';
import SearchBar from './SearchBar';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import NotiCardApp from '../NotificationCard';
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthContext";
import { getItem } from "./utils";


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
            
        </Layout>
    );
};

export default HeaderApp;