import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Dots from "react-activity/dist/Dots";
import Typography from '@mui/material/Typography';

const TokenHandler = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

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
            login();
            if (promocode) {
                navigate('/home');
            } else {
                navigate('/onboarding');
            }
        }
    }, []);

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                height: '100vh',
            }}>
                <Dots color='#55B982' size={'18'} />
                <Typography variant='body2' textAlign={'center'} fontSize={'24px'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
                    Processing Authentication
                </Typography>
            </Box>
        </div>
    );
};

export default TokenHandler;
