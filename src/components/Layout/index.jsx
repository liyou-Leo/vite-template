import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import { Layout, Button, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';

import AuthRoute from "@/router/AuthRoute";
import { MenuConfig } from "@/router/RouterConfig";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);
    console.log("🚀 ~ AppLayout ~ openKeys:", openKeys)
    const location = useLocation();

    // 根据当前路径找到需要展开的父级菜单
    const findOpenKeys = (pathname, menuItems) => {
        const keys = menuItems.reduce((total, current) => {
            if (Array.isArray(current?.children)) {
                const childKeys = findOpenKeys(pathname, current.children);
                if (childKeys.length) {
                    return [...total, current.key];
                }
                // 检查当前children中是否有匹配的路径
                if (current.children.some(child => child.key === pathname)) {
                    return [...total, current.key];
                }
            }
            return total;
        }, []);

        // 如果找不到目标路径，返回空数组
        return keys;
    };

    // 当路由变化时，更新展开的菜单
    useEffect(() => {
        const keys = findOpenKeys(location.pathname, MenuConfig);
        // 保留之前展开的菜单项，并添加新展开的菜单项
        setOpenKeys(prevKeys => [...new Set([...prevKeys, ...keys])]);
    }, [location.pathname]);

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                <div className='h-24 bg-red-500' />
                <Menu
                    theme="dark"
                    mode="inline"
                    inlineCollapsed={false}
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={MenuConfig}
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