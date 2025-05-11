import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    timeout: 1000 * 60 * 3,
    withCredentials: false,//是否在跨域时携带cookie
    baseURL: '/',
});

class AxiosCancer {
    constructor() {
        this.queryMap = {};
        this.ignoreUrls = [];//不需要进行重复请求栏截的url
    }

    isIgnoredUrl = (url) => {
        return this.ignoreUrls.includes(url);
    }

    getToken = (config) => {
        const { url, method, data, params } = config;
        const queryData = data || params;
        if (queryData) {
            //request的config中data是对象,但response 的config 中datta是个JSON
            const key = typeof queryData === 'string' ? queryData : JSON.stringify(queryData);
            return url + '_' + method + '_' + key;
        }

        return url + '_' + method;
    }

    //请求前先取消上一次相同的请求
    addRequest = (config) => {
        if (this.isIgnoredUrl(config?.url)) return;

        const token = this.getToken(config);
        if (this.queryMap?.[token]) {
            this.queryMap[token].abort();
        }
        const controller = new AbortController();
        config.signal = controller.signal;
        this.queryMap[token] = controller;
    }
    removeRequest = (config) => {
        const token = this.getToken(config);
        delete this.queryMap[token]
    }
};

const axiosCancer = new AxiosCancer();

instance.interceptors.request.use(config => {
    axiosCancer.addRequest(config);
    return config;
}, error => {
    return Promise.reject(error);
})

instance.interceptors.response.use(response => {
    axiosCancer.removeRequest(response.config);

    return response;
}, error => {
    const { response = {} } = error;
    if (response.status === 403 && response?.request?.responseURL) {
        message.error('请求错误，无权限：' + response.request.responseURL);
    };
    if (axios.isCancel(error)) {
        console.log('请求被取消')
    }
    response?.config && axiosCancer.removeRequest(response.config);
    return Promise.reject(error);
})

window.axios = instance;

export default instance;