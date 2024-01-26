import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ExtensionInstall from './ExtensionInstall';
import NonResumeQuestions from './NonResumeQuestions';
import ResumeUpload from '../resume/UploadResume';
import { useGetUploadedFilesQuery } from '../../api/resumesApi';
import { useNavigate } from 'react-router-dom';
import { useGetOnboardingDetailsQuery } from '../../api/onboardingApi';

const steps = ['Upload Resume', 'Details', 'Install Extension'];

const OnboardingDetails = () => {

    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const extensionInstalled = document.getElementsByTagName("jobrobo-container");

    const { data: onboardingDetailsData, isFetching: onboardingDetailsDataFetching } = useGetOnboardingDetailsQuery();

    const onboardingDetails = {
        onboardingDetailsData,
        onboardingDetailsDataFetching,
    };

    const { data: uploadedFiles, isLoading: resumeLoading } = useGetUploadedFilesQuery();
    const resume = uploadedFiles?.resume;

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    useEffect(() => {
        if (resume) {
            setActiveStep(1);
        }
        if (onboardingDetailsData?.race) {
            setActiveStep(2);
        }
        if (resume && onboardingDetailsData?.race && extensionInstalled.length) {
            navigate('/home');
        }
    }, [resumeLoading, onboardingDetailsDataFetching])

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Container>
            <Box sx={{ width: '100%', position: 'relative', height: 'auto' }}>
                <Stepper activeStep={activeStep} sx={{ position: 'sticky', top: '4.6rem', zIndex: '100', paddingY: '4rem', background: `#fefdfd` }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <Box>
                    {activeStep === 0
                        ? <ResumeUpload handleNext={handleNext} />
                        : activeStep === 1
                            ? <NonResumeQuestions handleNext={handleNext} onboardingDetails={onboardingDetails} />
                            : <ExtensionInstall handleBack={handleBack} />
                    }
                </Box>
            </Box>
        </Container>
    );
}

export default OnboardingDetails;
