import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RectangleMask from '../../assets/images/Rectanglesmaskgroup.png';
import JobSearchFilter from './JobSearchFilter';

const JobSearch = () => {
    return (
        <Box component={"main"} boxSizing={'border-box'} sx={{ flexGrow: 1 }} padding={'2rem'}>
            <Grid container display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'16px'}>
                <Grid item width={'100%'} boxSizing={'border-box'} padding={'1rem'} borderRadius={'16px'} border={'1px solid #55B982'} sx={{
                    backgroundImage: `url(${RectangleMask})`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`,
                    backgroundColor: 'rgba(85, 185, 130, 0.10)',
                }}>
                    <Typography variant='h6' fontWeight={'500'}>
                        Job Search
                    </Typography>
                    <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                        Provide your preference details to get relevant jobs
                    </Typography>
                </Grid>
                <Grid item width={'100%'}>
                    <JobSearchFilter />
                </Grid>
            </Grid>
        </Box>
    )
}

export default JobSearch;
