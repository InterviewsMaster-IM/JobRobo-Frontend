import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

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
