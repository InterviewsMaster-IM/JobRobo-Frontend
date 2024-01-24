import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IllustrationImage from '../../assets/images/IllustrationSection.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PrimaryGreenButton } from '../../styles/Buttons';
import { extensionCommunication } from '../../utils/Helpers';

const HomePageCard = () => {
    const extensionInstalled = document.getElementsByTagName("jobrobo-container");

    const handleExtensionButton = () => {
        if (extensionInstalled.length) {
            extensionCommunication("OPEN_JOB_BOARD");
        } else {
            window.open(process.env.REACT_APP_EXTENSION_PLAYSTORE_URL);
        }
    }

    return (
        <Card variant='outlined' sx={{ width: '368px', borderRadius: '16px' }}>
            <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'contain' }}
                image={IllustrationImage}
                alt="JobRobo"
            >
            </CardMedia>
            <CardContent>
                <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                    Auto-apply
                </Typography>
                <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                    Submit 100s of job applications within minutes using Job Robo
                </Typography>
                <PrimaryGreenButton sx={{ justifyContent: 'space-between', width: '100%', marginTop: '2rem' }}
                    onClick={() => handleExtensionButton()}>
                    <Typography variant='h6' fontSize={'18px'} fontWeight={'500'}>
                        New Job Robo
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
                </PrimaryGreenButton>
            </CardContent>
        </Card>
    )
}

export default HomePageCard;
