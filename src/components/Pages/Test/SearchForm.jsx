import React, { forwardRef, useImperativeHandle } from "react";
import { Row, Col, Button, Form, Select, DatePicker, Input } from "antd";

const { Item } = Form;

const SearchForm = forwardRef(({ queryList, spanNum = 6 }, ref) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
        queryList();
    };

    // button按钮事件的第一个参数位为e
    const handleSubmit = (e, params = {}) => {
        form.validateFields().then((data) => {
            queryList({
                ...data,
                ...params,
            });
        });
    };

    useImperativeHandle(ref, () => ({
        onReset,
        handleSubmit,
    }));

    return (
        <>
            <Form form={form}>
                <Row gutter={[20, 0]}>
                    <Col span={spanNum}>
                        <Item label="日期" name="TradingDay">
                            <DatePicker style={{ width: "100%" }} />
                        </Item>
                    </Col>

                    <Col span={spanNum}>
                        <Item label="产品名称" name="Name">
                            <Select
                                allowClear
                                mode="multiple"
                                placeholder="请选择"
                                dataList={[]}
                            />
                        </Item>
                    </Col>

                    <Col span={spanNum}>
                        <Item label="产品分类" name="Sid">
                            <Select
                                isDetail={false}
                                showSearch
                                placeholder="请选择"
                                dataList={[]}
                            />
                        </Item>
                    </Col>

                    <Col span={spanNum}>
                        <Item label="查询条件" name="Sid">
                            <Input />
                        </Item>
                    </Col>

                    <Col flex="auto" className="text-right">
                        <Item >
                            <Button className="mr-3" onClick={onReset}>
                                重置
                            </Button>
                            <Button type="primary" onClick={handleSubmit} >
                                查询
                            </Button>
                        </Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
})

export default SearchForm;
