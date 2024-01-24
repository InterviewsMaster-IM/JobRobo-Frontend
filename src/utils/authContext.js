import React, { createContext, useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Dots from "react-activity/dist/Dots";
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');

        setIsAuthenticated(!!access_token && !!refresh_token);
        setLoading(false);
    }, []);

    const login = () => {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');

        setIsAuthenticated(!!access_token && !!refresh_token);
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        setIsAuthenticated(false);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {loading ? (
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
                        Please Wait
                    </Typography>
                </Box>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
