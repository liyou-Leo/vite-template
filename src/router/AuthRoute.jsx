import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    // const isLogin = localStorage.getItem("dataStorage");
    // return isLogin ? children : <Navigate to={"/login"} />;

    return children;
};

export default AuthRoute;