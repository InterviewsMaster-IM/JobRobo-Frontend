import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AppliedJobDetailsHeader from './AppliedJobDetailsHeader';
import AppliedJobDetailsTable from './AppliedJobDetailsTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignJobsQuery, useGetUserCampaignsListQuery } from '../../api/campaignsApi';

const AppliedJobDetails = () => {

    const navigate = useNavigate();
    const params = useParams();
    const { data: campaignJobsList } = useGetCampaignJobsQuery(params.id);
    const { data: userCampaignsList } = useGetUserCampaignsListQuery();
    const [campaignDetails, setCampaignDetails] = useState({});

    useEffect(() => {
        const campaignDetails = userCampaignsList?.find((campaign) => campaign.id == params.id);
        setCampaignDetails(campaignDetails);
    }, [userCampaignsList, params.id])

    const handleNavigateBack = () => {
        navigate('/pastjobrobo');
    }

    return (
        <Box component={"main"} boxSizing={'border-box'} sx={{ flexGrow: 1 }} padding={'2rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
            <Grid container alignItems={'center'} justifyContent={'flex-start'} gap={'12px'}>
                <IconButton onClick={handleNavigateBack}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography variant='h6' fontWeight={'500'}>
                    {campaignDetails?.campaign_keyword} JobRobo run
                </Typography>
            </Grid>
            <AppliedJobDetailsHeader campaignDetails={campaignDetails} />
            {
                campaignJobsList?.length > 0 &&
                <AppliedJobDetailsTable campaignJobsList={campaignJobsList} />
            }
        </Box>
    )
}

export default AppliedJobDetails;
