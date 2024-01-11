import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AskQuestion from './AskQuestion';
import RequestFeature from './RequestFeature';
import ReportBug from './ReportBug';

const TabButton = styled(Button)(({ theme, selected }) => ({
    flex: '1 1 auto',
    fontSize: '14px',
    textTransform: 'none',
    padding: '8px 12px',
    color: selected ? '#FFF' : '#001405',
    backgroundColor: selected ? '#55B982' : '#FFF',
    fontWeight: '500',

    "&:hover": {
        backgroundColor: selected ? '#55B982' : '#FFF',
    },
}));

const Support = ({ handleSupportModalClose }) => {
    const [activeTab, setActiveTab] = useState('AskQuestion');

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }

    return (
        <Box width={'28rem'} height={'100%'}>
            <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'}>
                <Grid item padding={'24px 24px 8px'}>
                    <Typography variant='h6' fontWeight={'600'}>
                        Contact the team
                    </Typography>
                </Grid>
                <Grid container item padding={'16px 24px'} display={'flex'} alignItems={'center'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} gap={0} border={'1px solid #E5E5E5'} borderRadius={'6px'}>
                        <TabButton onClick={() => handleActiveTab('AskQuestion')} selected={activeTab === 'AskQuestion'}>
                            Ask Question
                        </TabButton>
                        <TabButton onClick={() => handleActiveTab('RequestFeature')} selected={activeTab === 'RequestFeature'}>
                            Request Feature
                        </TabButton>
                        <TabButton onClick={() => handleActiveTab('ReportBug')} selected={activeTab === 'ReportBug'}>
                            Report Bug
                        </TabButton>
                    </Box>
                </Grid>
                <Grid item flexGrow={1}>
                    {
                        activeTab === 'AskQuestion' &&
                        <AskQuestion handleSupportModalClose={handleSupportModalClose} />
                    }
                    {
                        activeTab === 'RequestFeature' &&
                        <RequestFeature handleSupportModalClose={handleSupportModalClose} />
                    }
                    {
                        activeTab === 'ReportBug' &&
                        <ReportBug handleSupportModalClose={handleSupportModalClose} />
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Support;
