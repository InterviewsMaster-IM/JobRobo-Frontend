import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { useNavigate } from 'react-router-dom';
import GreenLogo from '../../assets/images/GreenLogo.svg';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';

export const isExtensionInstalled = () => {
    try {
        let jrContainer = document.getElementsByTagName("jobrobo-container");
        return jrContainer[0]?.getAttribute("extention-id").trim();
    } catch (e) {
        console.log("Jobrobo extension required", e);
        return false;
    }
};

const ExtensionInstall = ({ handleBack }) => {

    const navigate = useNavigate();
    const [extensionDetails, setExtensionDetails] = useState("");

    useEffect(() => {
        let intervalId;
        if (!extensionDetails) {
            intervalId = setInterval(() => {
                let extId = isExtensionInstalled();
                extId && extId !== "" && setExtensionDetails(extId);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [extensionDetails]);

    const handleNext = () => {
        navigate('/home');
    }

    return (
        <Container>
            <Box display={'flex'} justifyContent={'center'}>
                <Card
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '62%', lg: '60%' },
                        padding: { xs: '1rem 1rem', sm: '2rem 3rem' },
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#FFF',
                        boxShadow: `0px 1px 2px 0px rgba(85, 185, 130, 0.06), 0px 0px 38px 0px rgba(85, 185, 130, 0.03), 0px 3px 70px 0px rgba(85, 185, 130, 0.02)`,
                        border: `1px solid rgba(0, 20, 5, 0.10)`,
                        borderRadius: '16px',
                    }}>
                    <CardMedia>
                        <ExtensionTwoToneIcon htmlColor='#55B982' sx={{ width: '56px', height: '56px' }} />
                    </CardMedia>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'8px'}>
                        <Typography variant='h5' fontWeight={'600'} textAlign={'center'}>
                            Install our chrome extension
                        </Typography>
                        <Typography variant='body2' fontWeight={'500'} color={'#7F8781'} textAlign={'center'}>
                            Install our extension to put your job applications on auto-pilot
                        </Typography>
                    </Box>
                    <Box marginTop={'1.5rem'} width={'70%'}>
                        <Card variant='outlined' sx={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '2rem 1.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 20, 5, 0.10)',
                            borderColor: extensionDetails ? '#55B982' : 'rgba(0, 20, 5, 0.10)',
                            background: extensionDetails ? 'rgba(234, 247, 239, 0.30)' : '#FFF',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <Grid container display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 64 }}
                                    image={GreenLogo}
                                    alt="JobRobo"
                                >
                                </CardMedia>
                                <Grid item rowGap={'4px'}>
                                    <Typography fontSize={'18px'} fontWeight={'600'}>
                                        JobRobo extension
                                    </Typography>
                                    <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                                        Our extension is required to run JobRobo features. Install now!
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        extensionDetails
                                            ?
                                            <Card variant='outlined'
                                                sx={{
                                                    width: '100%',
                                                    boxSizing: 'border-box',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '12px 14px',
                                                    border: '1px solid #55B982',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <Box
                                                    width={'2rem'}
                                                    height={'2rem'}
                                                    bgcolor={'rgba(234, 247, 239)'}
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    justifyContent={'center'}
                                                    borderRadius={'50%'}
                                                >
                                                    <DoneOutlineTwoToneIcon fontSize='small' htmlColor='#55B982' />
                                                </Box>
                                                <Typography>
                                                    Extension installed, let's go!!
                                                </Typography>
                                            </Card>
                                            :
                                            <PrimaryWhiteButton
                                                fullWidth
                                                onClick={() => {
                                                    window.open(process.env.REACT_APP_EXTENSION_PLAYSTORE_URL);
                                                }}
                                            >
                                                <Typography fontSize={'18px'} fontWeight={'500'}>
                                                    Install Extension
                                                </Typography>
                                                <NorthEastIcon fontSize='large' />
                                            </PrimaryWhiteButton>
                                    }
                                </Grid>
                            </Grid>
                        </Card>
                    </Box>
                    <Box width={'100%'} marginTop={'1.5rem'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <PrimaryWhiteButton sx={{ width: '45%', justifyContent: 'center' }} onClick={handleBack}>
                            Back
                        </PrimaryWhiteButton>
                        <PrimaryGreenButton sx={{ width: '45%' }} variant='container' disabled={!extensionDetails} onClick={handleNext}>
                            Continue
                        </PrimaryGreenButton>
                    </Box>
                </Card>
            </Box>
        </Container>
    )
}

export default ExtensionInstall;
