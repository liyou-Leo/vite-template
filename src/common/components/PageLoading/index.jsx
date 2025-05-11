import { Suspense } from 'react';
import { Spin } from 'antd';

const PageLoading = (Component, loadingStyle) => props => (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 250, ...loadingStyle }}><Spin size="large" /></div>}>
        <Component {...props} />
    </Suspense>
);
export default PageLoading;

export const loadPage = Component => PageLoading(Component, { height: 'calc(100vh - 42px)' });