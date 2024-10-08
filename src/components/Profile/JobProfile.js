import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProfileStrengthSection from './ProfileStrengthSection';
import ProfileDetailsSection from './ProfileDetailsSection';
import RectangleMask from '../../assets/images/Rectanglesmaskgroup.png';

const JobProfile = () => {
    return (
        <Box component={"main"} boxSizing={'border-box'} sx={{ flexGrow: 1 }} padding={'2rem'}>
            <Grid container display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                <Grid item width={'100%'} boxSizing={'border-box'} padding={'1rem'} borderRadius={'16px'} border={'1px solid #55B982'} sx={{
                    backgroundImage: `url(${RectangleMask})`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`,
                    backgroundColor: 'rgba(85, 185, 130, 0.10)',
                }}>
                    <Typography variant='h6' fontWeight={'500'}>
                        JobRobo Profile
                    </Typography>
                    <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                        Your details that will be used to fill your applications in Auto-apply
                    </Typography>
                </Grid>
                {/* <Grid item width={'100%'}>
                    <ProfileStrengthSection />
                </Grid> */}
                <Grid item width={'100%'}>
                    <ProfileDetailsSection />
                </Grid>
            </Grid>
        </Box>
    )
}

export default JobProfile;
