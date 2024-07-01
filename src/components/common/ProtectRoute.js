import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';
import { useGetOnboardingDetailsQuery } from '../../api/onboardingApi';
import { useGetUploadedFilesQuery } from '../../api/resumesApi';
import Box from '@mui/material/Box';
import Dots from 'react-activity/dist/Dots';
import Typography from '@mui/material/Typography';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const extensionInstalled = document.getElementsByTagName("jobrobo-container").length > 0;

    const { data: onboardingDetailsData, isLoading: onboardingDetailsLoading, isSuccess: onboardingDetailsSuccess } = useGetOnboardingDetailsQuery();
    const { data: uploadedFiles, isLoading: resumeLoading, isSuccess: resumeSuccess } = useGetUploadedFilesQuery();
    const resume = uploadedFiles?.resume;

    useEffect(() => {
        if (isAuthenticated && resumeSuccess && onboardingDetailsSuccess) {
            if (!resume || !onboardingDetailsData?.race) {
                navigate('/onboarding');
            } else if (resume && onboardingDetailsData?.race && (location.pathname === '/' || location.pathname === '/token-handler')) {
                navigate('/home');
            }
        }
    }, [isAuthenticated, resume, onboardingDetailsData, resumeSuccess, onboardingDetailsSuccess]);

    if (loading || onboardingDetailsLoading || resumeLoading) {
        return (
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
        );
    }

    return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
