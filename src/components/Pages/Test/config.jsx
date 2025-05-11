import { Tag } from "antd";

const baseUrl = "/api/t0TraderManagement/";
export const listUrl = baseUrl + "get_group_list";
export const updateUrl = baseUrl + "update_group";


export const mainColumns = () => [
    {
        title: "产品名称",
        dataIndex: "Id",
        width: 200,
    },
    {
        title: "产品类型",
        dataIndex: "Sid",
        width: 200,
        render: v => <Tag color="magenta">{v}</Tag>,
    },
    {
        title: "产品组别",
        dataIndex: "Name",
        width: 200,
    },
    {
        title: "分组权重",
        dataIndex: "Weight",
        width: 100,
    },
    {
        title: "更新时间",
        dataIndex: "UpdateTS",
        width: 200,
    },
];
