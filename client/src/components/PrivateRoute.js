import React, {useContext} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function PrivateRoute() {
    const {authUser} = useContext(useContext);
    const location = useLocation();

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to="to/signin" state={{from: location.pathname}}/>
    }
}

export default PrivateRoute