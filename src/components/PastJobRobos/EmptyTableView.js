import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import RectangleMask from '../../assets/images/Rectanglesmaskgroup.png';
import { PrimaryGreenButton } from '../../styles/Buttons';

const EmptyTableView = ({ handleExtensionButton }) => {

    return (
        <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} paddingY={'5rem'} paddingX={'1rem'} boxSizing={'border-box'} borderRadius='6px' border='1px solid #E5E5E5'
            sx={{
                backgroundImage: `url(${RectangleMask})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
                backgroundColor: 'rgba(229, 229, 229, 0.1)',
            }}>
            <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'8px'}>
                <BusinessCenterTwoToneIcon htmlColor='#7F8781' sx={{ fontSize: '56px' }} />
                <Typography variant='h6' fontWeight={'500'} color={'#001405'} textAlign={'center'}>
                    You have not run any JobRobos yet!
                </Typography>
                <Typography maxWidth={'22rem'} variant='body2' fontWeight={'500'} color={'#7F8781'} textAlign={'center'}>
                    Easily apply to many jobs using JobRobo Auto-apply. Click the button below to get started!
                </Typography>
                <PrimaryGreenButton sx={{ marginTop: '2rem', width: '20rem' }} onClick={() => handleExtensionButton()}>
                    New Job Robo
                </PrimaryGreenButton>
            </Box>
        </Box>
    )
}

export default EmptyTableView;
