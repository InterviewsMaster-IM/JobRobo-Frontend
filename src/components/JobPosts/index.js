import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import JobPostsTable from './JobPostsTable';
import { useGetJobPostsQuery } from '../../api/jobPostsApi';

const JobPosts = () => {
    const { data: postsList } = useGetJobPostsQuery();

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
                {
                    postsList?.length > 0
                        ?
                        <JobPostsTable postsList={postsList} />
                        :
                        <h4>No Posts are there</h4>
                }
            </Box>
        </Box>
    )
}

export default JobPosts;
