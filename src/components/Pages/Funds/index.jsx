import { useState } from "react";
import { Card, Button } from "antd";

const Funds = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <Card title="计数器">当前计数：{count}</Card>
            <Button type="primary" onClick={() => setCount(count + 1)}>ADD</Button>
        </>
    )
}

export default Funds;