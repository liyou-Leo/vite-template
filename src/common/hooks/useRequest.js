import { useState, useEffect } from "react";
import { message } from 'antd';
import useSWR from "swr";

import instance from "../utils/request";

const postFetcher = ([url, params]) => instance.post(url, params);
const getFetcher = ([url, params]) => params ? instance.get(url, { params }) : instance.get(url);

const useRequest = ({
    method = 'POST',
    url = null,
    params = {},
    refreshDeps = [],
    onSuccess = (data) => data,
    onError = (error) => error,
    swrOptions = {},
}) => {
    const [data, setData] = useState(undefined);
    const fetcher = method === 'POST' ? postFetcher : getFetcher;

    const { data: swrData, error: swrError, isLoading } = useSWR([url, params, ...refreshDeps], fetcher, {
        ...swrOptions,
    })

    useEffect(() => {
        if (swrError) {
            console.error(swrError);
            const error = onError(swrError);
            message.error(error || `${url}请求失败`);
            onError(swrError);
        }

        if (swrData) {
            const { status, error, data } = swrData;
            if (status) {
                const successData = onSuccess(data);
                setData(successData);
            } else {
                message.error(error);
                setData(undefined);
            }
        }
    }, [swrData, swrError]);

    return { data, isLoading };
};

export default useRequest;