import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FreeCreditsDisplay from './FreeCreditsDisplay';
import HomePageCard from '../common/HomePageCard';
import JobSearchCard from '../common/JobSearchCard';

const HomeDashboard = () => {
    return (
        <Box component={"main"} sx={{ flexGrow: 1 }} marginTop={{ sm: '0', xs: '3rem' }}>
            <FreeCreditsDisplay />
            <Box padding={'2rem'}>
                <Typography variant='h5' fontWeight={'500'}>
                    Hey there, Rishikesh! Your dream job is just a click away
                </Typography>
                <Grid container marginTop={'2rem'} gap={4}>
                    <HomePageCard />
                    <JobSearchCard />
                </Grid>
            </Box>
        </Box>
    )
}

export default HomeDashboard;
