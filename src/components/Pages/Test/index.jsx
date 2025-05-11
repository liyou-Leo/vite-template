
import { useState, useEffect, useRef } from "react";
import { Button, message, Table, } from "antd";

import SearchForm from "./SearchForm";
import OperateModal from "./OperateModal";

import { mainColumns, listUrl, } from './config';

const Index = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 15,
        total: 0
    });
    const [tableList, setTableList] = useState([{
        Id: '天演中证1000指数增强产品',
        Sid: '指数增强型产品',
        Name: '未分组',
        Weight: 100,
        UpdateTS: '2021-11-11 11:11:11',
    }]);
    const [filterList, setFilterList] = useState([]);
    const [record, setRecord] = useState({});
    const [visible, setVisible] = useState(false);

    const searchFormRef = useRef(null);

    useEffect(() => {
        queryList();
    }, []);

    const queryList = async (params = {}) => {
        try {
            const res = await axios.post(listUrl, {
                ...params,
            });
            const { status, error, data = [] } = res.data || {};
            if (status) {
                setTableList(data);
                setPagination({
                    ...pagination,
                    total: data.length,
                });
            } else {
                message.error(error);
            }
        } catch (error) {
            console.error(error);
        } finally {
        }
    };

    const setOperateConfig = (record) => {
        setRecord(record);
        setVisible(true);
    };
    const handleAdd = () => {
        setOperateConfig(undefined);
    };
    const handleEdit = (record) => {
        setOperateConfig(record);
    };

    const queryListAfterAdd = () => {
        queryList();
    };

    const queryListAfterEdit = () => {
        queryList();
    };

    // 请求用户点击的页数，不用在这里更新页数，请求成功时接口返回的时候会更新
    const handleTableChange = ({ pageSize, current }, filters, sorter) => {
        setPagination({
            ...pagination,
            pageSize,
            current,
        });
    };

    const tableColumns = [
        ...mainColumns(),
        {
            title: '操作',
            dataIndex: "Operation",
            width: 100,
            render: (_, record) => {
                const { Id } = record;
                return (
                    <>
                        <a className="mr20" onClick={() => handleEdit(record)} >
                            编辑
                        </a>
                    </>
                )

            }
        },
    ]

    return (
        <div className="common-page-wrapper">
            <div className="page-query-search">
                <SearchForm
                    ref={searchFormRef}
                    queryList={queryList}
                />
            </div>

            <div className="page-query-content">
                <div className="table-top-info">
                    <div className="left-bar">
                        <h3>信息列表</h3>
                    </div>
                    <div className="right-bar">
                        <Button type="primary" onClick={handleAdd}>
                            新增
                        </Button>

                        {/* <CommonSetting
                            menuVisible={menuVisible}
                            sourceList={sourceList}
                            filterList={filterList}
                            dispatch={dispatch}
                        /> */}
                    </div>
                </div>

                <Table
                    size="middle"
                    dataSource={tableList}
                    columns={tableColumns}
                    pagination={{ ...pagination }}
                    onChange={handleTableChange}
                />

            </div>
            {
                visible &&
                <OperateModal
                    visible={visible}
                    record={record}
                    setRecord={setRecord}
                    setVisible={setVisible}
                    queryListAfterAdd={queryListAfterAdd}
                    queryListAfterEdit={queryListAfterEdit}
                />
            }
        </div >
    )
}

export default Index;
