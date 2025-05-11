import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';

import Layout from "@/components/Layout";
import Login from "@/components/Login";
import NotFound from "@/components/NotFound";

import RouterConfig from './RouterConfig';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/login' />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Layout />,
        children: RouterConfig
    },
    {
        path: '*',
        element: <NotFound />
    },
]);

const BaseRouter = () => {
    return (
        <RouterProvider router={Router} />
    )
}

export default BaseRouter;