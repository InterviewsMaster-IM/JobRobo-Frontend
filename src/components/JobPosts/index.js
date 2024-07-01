import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dots from "react-activity/dist/Dots";
import JobPostsTable from './JobPostsTable';
import { useGetJobPostsQuery } from '../../api/jobPostsApi';

const JobPosts = ({ jobTitles, countryLocation, experienceYears, datePosted, numberOfJobs }) => {
    const { data: postsList, error: jobsError, isLoading: jobsLoading } = useGetJobPostsQuery({
        job_titles: jobTitles ? jobTitles.split(',').map(title => title.trim()) : [],
        country: countryLocation,
        minimum_years_of_experience: experienceYears,
        date_posted: datePosted,
        no_of_jobs: numberOfJobs
    });

    if (jobsLoading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                height: '100vh',
            }}>
                <Dots color='#55B982' size={'18'} />
                <Typography variant='body2' textAlign={'center'} fontSize={'24px'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
                    Please Wait
                </Typography>
            </Box>
        );
    }

    return (
        <Box boxSizing={'border-box'} component={"main"} sx={{ flexGrow: 1 }} padding={'2rem'}>
            <Grid container alignItems={'center'} justifyContent={'space-between'} gap={'1rem'}>
                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'4px'}>
                    <Typography variant='h6' fontWeight={'500'}>
                        Job Posts
                    </Typography>
                </Grid>
            </Grid>
            <Box marginTop={'1.5rem'}>
                {(!postsList || postsList.length === 0 || jobsError) ?
                    <Typography variant='p'>No job posts are currently available for your recent search. We're constantly updating our listings, so check back soon or refine your search to discover new opportunities.</Typography> :
                    <JobPostsTable postsList={postsList} />
                }
            </Box>
        </Box>
    );
}

export default React.memo(JobPosts);
