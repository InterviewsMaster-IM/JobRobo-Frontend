import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dots from "react-activity/dist/Dots";
import JobsTable from './JobsTable';
import { useGetJobsQuery } from '../../api/jobPostsApi';

const Jobs = ({ jobTitle, numberOfJobs }) => {
    const { data: jobsList, error: jobsError, isLoading: jobsLoading } = useGetJobsQuery({ job_titles: jobTitle?.split(',').map(title => title.trim()), start_date: '2024-06-13T19:37:44.323+00:00', no_of_jobs: numberOfJobs });

    return (<>
        {(jobsLoading) && <Box sx={{
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
        }

        <Box boxSizing={'border-box'} component={"main"} sx={{ flexGrow: 1 }} padding={'2rem'}>
            <Grid container alignItems={'center'} justifyContent={'space-between'} gap={'1rem'}>
                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'4px'}>
                    <Typography variant='h6' fontWeight={'500'}>
                        Jobs
                    </Typography>
                </Grid>
            </Grid>
            <Box marginTop={'1.5rem'}>
                {(!jobsList || jobsList.length === 0) ?
                    <Typography variant='h6'>No Jobs are there</Typography> :
                    <JobsTable jobsList={jobsList} />
                }
            </Box>
        </Box>
    </>
    );
}

export default Jobs;
