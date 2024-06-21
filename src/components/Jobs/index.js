import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import JobsTable from './JobsTable';
import { useGetJobsQuery } from '../../api/jobPostsApi';
import { useLocation } from 'react-router-dom';

const Jobs = () => {
    const location = useLocation();
    const { job_titles, start_date, end_date, no_of_jobs } = location.state || {};
    const { data: jobsList } = useGetJobsQuery({ job_titles, start_date, end_date, no_of_jobs });
    // useEffect(() => {
    //     if (!jobsList) {
    //         navigate('/jobsearch')
    //     }
    // }, [jobsList])

    return (
        <Box boxSizing={'border-box'} component={"main"} sx={{ flexGrow: 1 }} padding={'2rem'}>
            <Grid container alignItems={'center'} justifyContent={'space-between'} gap={'1rem'}>
                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'4px'}>
                    <Typography variant='h6' fontWeight={'500'}>
                        Jobs
                    </Typography>
                </Grid>
            </Grid>
            <Box marginTop={'1.5rem'}>
                {
                    jobsList?.length > 0
                        ?
                        <JobsTable jobsList={jobsList} />
                        :
                        <h4>No Jobs are there</h4>
                }
            </Box>
        </Box>
    )
}

export default Jobs;
