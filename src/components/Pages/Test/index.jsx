import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";

const Test = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <Card title="计数器">当前计数：{count}</Card>
            <Button type="primary" onClick={() => setCount(count + 1)}>计数</Button>
            <Button type="primary" onClick={() => navigate('/home')}>跳转</Button>
        </>
    )
}

export default Test;