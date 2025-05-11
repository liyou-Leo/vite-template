import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import { Layout, Button, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';


import AuthRoute from "@/router/AuthRoute";
import { ProductConfig, FundsConfig } from "@/router/RouterConfig";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                <div style={{ height: '40px', background: 'gray', borderRadius: borderRadiusLG, margin: '8px' }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: 'home',
                            icon: <UserOutlined />,
                            label: <Link to='/home'>首页</Link>,
                        },
                        {
                            key: 'product_config',
                            icon: <VideoCameraOutlined />,
                            label: '产品配置',
                            children: ProductConfig.map(({ path, label }) => ({
                                key: path,
                                label: <Link to={path}>{label}</Link>,
                            })),
                        },
                        {
                            key: 'funds_config',
                            icon: <UploadOutlined />,
                            label: '资金配置',
                            children: FundsConfig.map(({ path, label }) => ({
                                key: path,
                                label: <Link to={path}>{label}</Link>,
                            })),
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <AuthRoute>
                        <AliveScope>
                            <Outlet />
                        </AliveScope>
                    </AuthRoute>
                </Content>
            </Layout>
        </Layout>
    )
}
export default AppLayout;