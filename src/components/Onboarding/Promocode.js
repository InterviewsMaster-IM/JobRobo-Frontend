import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryGreenButton } from '../../styles/Buttons';
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone';
import { useNavigate } from 'react-router-dom';

const Promocode = ({ referralCode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (referralCode) {
            navigate('/onboarding');
        }
    }, [referralCode]);

    return (
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <Card
                sx={{
                    width: '100%',
                    padding: { xs: '1rem 1rem', sm: '2rem 3rem' },
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    backgroundColor: '#FFF',
                    boxShadow: `0px 1px 2px 0px rgba(85, 185, 130, 0.06), 0px 0px 38px 0px rgba(85, 185, 130, 0.03), 0px 3px 70px 0px rgba(85, 185, 130, 0.02)`,
                    border: `1px solid rgba(0, 20, 5, 0.10)`,
                    borderRadius: '16px',
                }}>
                <CardMedia>
                    <WavingHandTwoToneIcon htmlColor='#55B982' sx={{ width: '56px', height: '56px' }} />
                </CardMedia>
                <Typography variant='h5' fontWeight={'600'} textAlign={'center'}>
                    Welcome to JobRobo
                </Typography>
                <Typography variant='body1' fontWeight={'500'} textAlign={'center'}>
                    Congratulations! You've been referred by someone
                </Typography>
                <Box width={'100%'} marginTop={'1.5rem'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <PrimaryGreenButton id='Promocode-Card-Continue-Button' sx={{ width: '80%', gap: '8px' }}>
                        <Typography>
                            Continue
                        </Typography>
                        <CircularProgress color='white' size={20} thickness={4} />
                    </PrimaryGreenButton>
                </Box>
            </Card>
        </Box>
    )
}

export default Promocode;
