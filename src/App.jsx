import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider as JotaiRootProvider } from 'jotai';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { SWRConfig } from 'swr';

import BaseRouter from './router';
import { printAppInfo, clearWarning } from '@common/utils/print';

// 设置 dayjs
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

printAppInfo();
clearWarning();

const Index = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <JotaiRootProvider>
            <BaseRouter />
          </JotaiRootProvider>
        </SWRConfig>
      </AntdApp>
    </ConfigProvider>
  )
};

export default Index;