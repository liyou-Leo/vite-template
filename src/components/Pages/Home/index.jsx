import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>首页</div>
            <Button type="primary" onClick={() => navigate('/test')}>跳转</Button>
        </>
    )
}
export default Home;