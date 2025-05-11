import { Link } from 'react-router-dom';
import { KeepAlive } from 'react-activation';
import { UploadOutlined, HomeOutlined, VideoCameraOutlined, } from '@ant-design/icons';

import Home from '@pages/Home';
import Test from '@pages/Test';
import Funds from '@pages/Funds';

// 单个路由配置
const SingRouteConfig = [

];


// 首页路由配置
const HomeConfig = [
    {
        key: '/home',
        label: '首页',
        icon: <HomeOutlined />,
        element: <Home />
    },
];

// 产品路由配置
export const ProductConfig = [
    {
        key: 'product_menu',
        icon: <VideoCameraOutlined />,
        label: '产品配置',
        children: [
            {
                key: '/test',
                label: '产品管理',
                element: (
                    <KeepAlive cacheKey='test'>
                        <Test />
                    </KeepAlive>
                )
            }
        ]
    },
];

// 资金路由配置
export const FundsConfig = [
    {
        key: 'funds_menu',
        icon: <UploadOutlined />,
        label: '产品配置',
        children: [
            {
                key: '/funds',
                label: '资金管理',
                element: (
                    <KeepAlive cacheKey='funds'>
                        <Funds />
                    </KeepAlive>
                )
            },
        ]
    },
];

const getRouteConfig = (config) => {
    return config.reduce((total, current) => {
        // 如果当前项有element，说明是路由配置
        if (current?.element) {
            return [
                ...total,
                {
                    path: current.key,
                    element: current.element
                }
            ];
        }
        // 如果当前项有children，递归处理children
        if (Array.isArray(current?.children)) {
            const childRoutes = getRouteConfig(current.children);
            return [...total, ...childRoutes];
        }
        return total;
    }, []);
};

const getMenuConfig = (config) => {
    return config.reduce((total, current) => {
        if (!current) return total;

        const menuItem = {
            key: current.key,
            label: current.label
        };

        // 如果有icon，添加icon属性
        if (current?.icon) {
            menuItem.icon = current.icon;
        }

        // 如果有children，说明是父级菜单
        if (Array.isArray(current?.children)) {
            menuItem.children = getMenuConfig(current.children);
        } else if (current?.element) {
            // 如果没有children但有element，说明是叶子节点
            menuItem.label = <Link to={current.key}>{current.label}</Link>;
        }

        return [...total, menuItem];
    }, []);
};

export const MenuConfig = [
    ...getMenuConfig(HomeConfig),
    ...getMenuConfig(ProductConfig),
    ...getMenuConfig(FundsConfig),
];

export const RouterConfig = [
    ...getRouteConfig(HomeConfig),
    ...getRouteConfig(ProductConfig),
    ...getRouteConfig(FundsConfig),
    ...SingRouteConfig,
];
