import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

    const token = localStorage.getItem("@angola-connect:token");
    const userId = localStorage.getItem("@angola-connect:userId");

    if (!token || !userId) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;