import React from 'react'
import Header from '../Onboarding/Header'
import Box from '@mui/material/Box'
import RectangleMask from '../../assets/images/Rectanglesmaskgroup.png';

const OnboardingLayout = ({ children }) => {
    return (
        <Box minHeight={'100vh'}
            sx={{
                backgroundImage: `url(${RectangleMask})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
            }}>
            <Header />
            <Box paddingY={'4.6rem'}>
                {children}
            </Box>
        </Box>
    )
}

export default OnboardingLayout;
