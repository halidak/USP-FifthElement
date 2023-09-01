import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const RequireAuthC = () => {
    const { auth } = useContext(AuthContext);
    const comp = JSON.parse(localStorage.getItem('company'));
    const location = useLocation();

    return (
             comp
                ? <Outlet />
                : <Navigate to="/login-companies" state={{ from: location }} replace />
    );
}

export default RequireAuthC;