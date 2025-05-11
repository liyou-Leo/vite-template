import React, { useState } from "react";
import { Button, Form, message, Input, InputNumber, Select, DatePicker, Drawer } from "antd";

import { updateUrl } from './config';

const { Item } = Form;

const operateModal = ({
    visible,
    record,
    setRecord,
    setVisible,
    queryListAfterAdd,
    queryListAfterEdit
}) => {
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();
    const { validateFields } = form;

    const isAdd = true;

    const handleClose = () => {
        setVisible(false);
        setRecord(undefined);
    };

    const handleSubmit = () => {
        validateFields().then(async (values) => {
            setLoading(true);
            const data = isAdd ? values : { ...record, ...values }
            try {
                const res = await axios.post(updateUrl, data);
                const { status, error } = res.data || {};
                if (status) {
                    message.success("操作成功");
                    handleClose();
                    isAdd ? queryListAfterAdd() : queryListAfterEdit();
                } else {
                    message.error(error);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        });
    };

    return (
        <Drawer
            title='产品管理'
            width={500}
            open={visible}
            maskClosable={false}
            onClose={handleClose}
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button onClick={handleClose} style={{ marginRight: 8 }}>
                        取消
                    </Button>

                    <Button loading={loading} onClick={handleSubmit} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                initialValues={{
                    ...record,
                }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Item label="产品名称" name="Id">
                    <Input placeholder="请输入" disabled />
                </Item>

                <Item label="产品分组" name="Sid" rules={[{ required: true, message: "此项必填" }]}>
                    <Select
                        isDetail={false}
                        showSearch
                        placeholder="请选择"
                        dataList={[]}
                    />
                </Item>

                <Item label="分组权重" name="Weight" rules={[{ required: true }]}>
                    <InputNumber style={{ width: "100%" }} placeholder="请输入" precision={0} addonAfter="%" />
                </Item>

                <Item label="生效时间" name="StartDate" rules={[{ required: true }]}   >
                    <DatePicker style={{ width: "100%" }} />
                </Item>
            </Form >
        </Drawer >
    );
};

export default operateModal;

