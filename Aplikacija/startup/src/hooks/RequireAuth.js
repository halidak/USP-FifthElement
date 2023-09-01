import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import AuthContext from "../context/AuthProvider";

const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));
    // const comp = JSON.parse(localStorage.getItem('company'));
    const location = useLocation();

    return (
             user
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;