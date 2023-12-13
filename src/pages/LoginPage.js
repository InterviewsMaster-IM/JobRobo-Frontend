import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Redirect to Google on button click
        window.location.href = process.env.REACT_APP_LOGIN_URL;
        // after login
        // navigate('/dashboard');
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Sign in with LinkedIn</button>
        </div>
    );
};

export default LoginPage;
