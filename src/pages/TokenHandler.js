import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import Cookies from 'js-cookie';

const TokenHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get('access'); // Assuming the token is passed as a query param
        const refresh_token = urlParams.get('refresh')
        const promocode = urlParams.get('promocode');

        if (access_token && refresh_token) {
            // Store the token - localStorage can be used for simplicity
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            // Store the tokens in cookies as well
            Cookies.set('access_token', access_token, { expires: 7 }); // Expires in 7 days
            Cookies.set('refresh_token', refresh_token, { expires: 7 }); // Expires in 7 days
            // Redirect to another page after successful token handling
            // console.log("navigating to dashboard");
            if (promocode) {
                navigate('/');
            } else {
                navigate('/onboarding');
            }
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
