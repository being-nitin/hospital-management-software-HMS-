import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // If the user is not logged in, navigate to the sign-in page
    return userInfo ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
