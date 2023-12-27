import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';

const TokenHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get('access'); // Assuming the token is passed as a query param
        const refresh_token = urlParams.get('refresh')

        if (access_token && refresh_token) {
            // Store the token - localStorage can be used for simplicity
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            // Redirect to another page after successful token handling
            // console.log("navigating to dashboard");
            navigate('/dashboard');
        }
    }, []);

    return (
        <div>
            <h1>Processing authentication...</h1>
            {/* You can add a loader here */}
        </div>
    );
};

export default TokenHandler;
