import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import { Layout, Button, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import AuthRoute from "@/router/AuthRoute";
import { MenuConfig } from "@/router/RouterConfig";
import { ReactComponent as Logo } from "@common/images/logo.svg";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);
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

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                <div className="h-12 p-2 flex items-center justify-center">
                    <Logo className="w-full h-full" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={MenuConfig}
                />
            </Sider>

            <Layout className="bg-gray-100">
                <Header className="h-12 p-2 pr-6 bg-white flex items-center justify-between">
                    <div className="flex items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-16 h-12 text-base"
                        />
                        <div className='ml-2 text-xl font-bold'>基金运营</div>
                    </div>

                    <div>
                        <div>
                            <UserOutlined />
                            <span className="ml-2">陈凯</span>
                            <SettingOutlined className="ml-4" />
                            <LogoutOutlined className="ml-4" />
                        </div>
                    </div>
                </Header>
                <Content className="m-4 rounded-lg">
                    <AuthRoute>
                        <AliveScope>
                            <Outlet />
                        </AliveScope>
                    </AuthRoute>
                </Content>
            </Layout>
        </Layout >
    )
}
export default AppLayout;