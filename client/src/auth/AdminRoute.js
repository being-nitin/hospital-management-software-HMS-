import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Check if the user is logged in and is an admin
    return userInfo ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminRoute;
