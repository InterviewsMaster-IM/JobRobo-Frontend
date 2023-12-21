import React from 'react';
import ResumeUpload from '../components/resume/UploadResume';
import Header from '../components/Onboarding/Header';
import OnboardingLayout from '../components/Layouts/OnboardingLayout';

const DashboardPage = () => {
    return (
        <>
            <OnboardingLayout>
                <ResumeUpload />
            </OnboardingLayout>
        </>
    );
};

export default DashboardPage;
