import { KeepAlive } from 'react-activation';

import Home from '@pages/Home';
import Test from '@pages/Test';
import Funds from '@pages/Funds';

export const ProductConfig = [
    {
        path: '/test',
        label: '产品管理',
        element: (
            <KeepAlive cacheKey='test'>
                <Test />
            </KeepAlive>
        )
    },
];

export const FundsConfig = [
    {
        path: '/funds',
        label: '资金管理',
        element: (
            <KeepAlive cacheKey='funds'>
                <Funds />
            </KeepAlive>
        )
    },
]

const RouterConfig = [
    {
        path: '/home',
        label: '首页',
        element: <Home />
    },
    ...ProductConfig,
    ...FundsConfig,
];

export default RouterConfig;