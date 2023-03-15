import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IProtectedRoute } from "./ProtectedRouteType";

const ProtectedRoute = ({
    redirectPath,
    children
}: IProtectedRoute): JSX.Element => {
    if (localStorage.getItem("loginToken") === null) {
        return <Navigate to={{ pathname: redirectPath ?? "/" }} replace />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;
