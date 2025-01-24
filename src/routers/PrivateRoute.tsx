import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const PrivateRoute = ({ element, ...rest }) => {
    const location = useLocation();
    const { isAuthenticated } = useContext(UserContext);
    return isAuthenticated() ? (
        element
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
