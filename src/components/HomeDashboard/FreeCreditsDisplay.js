import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { useGetUserCreditsQuery } from '../../api/creditsApi';
import { useNavigate } from 'react-router-dom';

const FreeCreditsDisplay = () => {
    const { data: userCredits, refetch: fetchCredits } = useGetUserCreditsQuery();
    const navigate = useNavigate();

    const handleUpgradePlanButton = () => {
        navigate('/pricing');
    }

    useEffect(() => {
        fetchCredits();
    }, []);

    return (
        <Box width={'100%'} sx={{
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 20, 5, 0.10)',
            background: 'rgba(229, 229, 229, 0.35)',
            boxShadow: '0px 2px 2px 0px rgba(11, 19, 36, 0.04)',
            padding: '20px 32px',
        }}>
            <Grid container width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'20px'}>
                <Grid item display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={'12px'}>
                    <CircularProgress sx={{ color: '#001405' }} variant="determinate" value={75} />
                    <Grid item>
                        <Typography variant='body2' fontWeight={'600'}>
                            Only {userCredits?.total_credits || 0} free credits left!
                        </Typography>
                        <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                            Upgrade now to keep auto-applying and get your next job using JobRobo
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={'16px'}>
                    <PrimaryWhiteButton onClick={handleUpgradePlanButton}>
                        <RocketLaunchOutlinedIcon htmlColor='#656565' fontSize='small' />
                        <Typography variant='body2' fontWeight={'500'}>
                            Upgrade plan
                        </Typography>
                    </PrimaryWhiteButton>
                    <PrimaryWhiteButton>
                        <Typography variant='body2' fontWeight={'500'}>
                            Earn credits
                        </Typography>
                    </PrimaryWhiteButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FreeCreditsDisplay;
