import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, } from 'react-redux'




const PrivateRoute = ({ component: Component, ...rest }) => {

    const userLogin = useSelector((state) => state.userLogin)
    console.log(userLogin)
    const { userInfo } = userLogin


    console.log(userInfo)
    return <Route
        {...rest}
        render={props =>
            userInfo ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
}

export default PrivateRoute;