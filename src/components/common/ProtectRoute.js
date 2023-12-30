import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    // console.log(isAuthenticated);

    return (
        <>
            {isAuthenticated ? (
                <Component />
            ) : (
                <Navigate to="/" replace />
            )}
        </>
    );
};

export default ProtectedRoute;
