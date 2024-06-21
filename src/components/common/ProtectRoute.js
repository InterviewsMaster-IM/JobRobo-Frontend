import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';
import { useGetOnboardingDetailsQuery } from '../../api/onboardingApi';
import { useGetUploadedFilesQuery } from '../../api/resumesApi';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const extensionInstalled = document.getElementsByTagName("jobrobo-container");

    const { data: onboardingDetailsData, isLoading: onboardingDetailsDataLoading, isSuccess: onboardingDetailsDataSuccess } = useGetOnboardingDetailsQuery();
    const { data: uploadedFiles, isLoading: resumeLoading, isSuccess: resumeSuccess } = useGetUploadedFilesQuery();
    const resume = uploadedFiles?.resume;

    useEffect(() => {
        if (isAuthenticated && resumeSuccess && onboardingDetailsDataSuccess) {
            if (!resume || !onboardingDetailsData?.race) {
                // if (!resume || !onboardingDetailsData?.race || !extensionInstalled.length) {
                navigate('/onboarding');
            }
        }
    }, [isAuthenticated, onboardingDetailsDataLoading, resumeLoading]);

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
