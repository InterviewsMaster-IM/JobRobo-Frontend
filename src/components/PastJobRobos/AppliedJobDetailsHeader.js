import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { PrimaryGreenButton } from '../../styles/Buttons';
import { extensionCommunicationSameJob } from '../../utils/Helpers';

const AppliedJobDetailsHeader = ({ campaignDetails }) => {

    const handleRunThisJobRobo = () => {
        extensionCommunicationSameJob("OPEN_JOB_BOARD_WITH_PROPS", {
            platform: campaignDetails?.job_board,
            jobLocation: campaignDetails?.location,
            jobTitle: campaignDetails?.campaign_keyword,
            jobCount: campaignDetails?.jobs_applied,
            jobType: ["Full-Time", "Part-Time"],
        });
    };

    return (
        <Box width={'100%'} boxSizing={'border-box'} padding={'16px'} borderRadius={'6px'} border={'1px solid #E5E5E5'} >
            <Box width={'auto'} display={'flex'} justifyContent={'space-between'} columnGap={'2rem'} flexWrap={'wrap'} rowGap={'2rem'}>
                <Grid container width={{ lg: '70%' }} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'nowrap'} columnGap={'3rem'} rowGap={'2rem'} >
                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            {campaignDetails?.job_board}
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Job Board
                        </Typography>
                    </Grid>
                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            {campaignDetails?.jobs_applied}
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Jobs Applied
                        </Typography>
                    </Grid>
                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            {campaignDetails?.location}
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Location
                        </Typography>
                    </Grid>
                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            3 Hours
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Time saved
                        </Typography>
                    </Grid>
                </Grid>
                <Grid textAlign={'right'}>
                    <PrimaryGreenButton sx={{ width: '12rem' }} onClick={handleRunThisJobRobo}>
                        Run this Job robo
                    </PrimaryGreenButton>
                </Grid>
            </Box>
        </Box>
    )
}

export default AppliedJobDetailsHeader;
