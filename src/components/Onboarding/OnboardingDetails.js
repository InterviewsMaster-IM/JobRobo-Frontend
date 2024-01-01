import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExtensionInstall from './ExtensionInstall';
import Promocode from './Promocode';
import NonResumeQuestions from './NonResumeQuestions';
import ResumeUpload from '../resume/UploadResume';
import RectangleMask from '../../assets/images/Rectanglesmaskgroup.png';

const steps = ['Upload Resume', 'Details', 'Install Extension'];

const ActiveStepComponent = ({ activeStep, handleBack, handleNext }) => {
    if (activeStep === 0) {
        return <ResumeUpload handleNext={handleNext} />;
    } else if (activeStep === 1) {
        return <NonResumeQuestions handleNext={handleNext} />;
    } else {
        return <ExtensionInstall handleBack={handleBack} />;
    }
}

const OnboardingDetails = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

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
                    <ActiveStepComponent activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />
                </Box>
            </Box>
        </Container>
    );
}

export default OnboardingDetails;
