import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AppliedJobDetailsHeader from './AppliedJobDetailsHeader';
import AppliedJobDetailsTable from './AppliedJobDetailsTable';
import { useNavigate } from 'react-router-dom';

const AppliedJobDetails = () => {

    const navigate = useNavigate();

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
                    'Senior Staff Javascript Engineer' JobRobo run
                </Typography>
            </Grid>
            <AppliedJobDetailsHeader />
            <AppliedJobDetailsTable />
        </Box>
    )
}

export default AppliedJobDetails;
