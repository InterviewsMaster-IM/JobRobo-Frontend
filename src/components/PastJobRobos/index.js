import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PastJobrobosTable from './PastJobrobosTable';
import EmptyTableView from './EmptyTableView';
import { PrimaryGreenButton } from '../../styles/Buttons';
import { extensionCommunication } from '../../utils/Helpers';

const PastJobRobos = () => {
    const showTable = true;
    const extensionInstalled = document.getElementsByTagName("jobrobo-container");

    const handleExtensionButton = () => {
        if (extensionInstalled.length) {
            extensionCommunication("OPEN_JOB_BOARD");
        } else {
            window.open(process.env.REACT_APP_EXTENSION_PLAYSTORE_URL);
        }
    }

    return (
        <Box boxSizing={'border-box'} component={"main"} sx={{ flexGrow: 1 }} padding={'2rem'}>
            <Grid container alignItems={'center'} justifyContent={'space-between'} gap={'1rem'}>
                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'4px'}>
                    <Typography variant='h6' fontWeight={'500'}>
                        Past Job Robos
                    </Typography>
                    <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                        Review your past Job Robos and re-run any of them
                    </Typography>
                </Grid>
                {
                    showTable
                    &&
                    <Grid item>
                        <PrimaryGreenButton sx={{ width: '12rem' }} onClick={() => handleExtensionButton()}>
                            New Job Robo
                        </PrimaryGreenButton>
                    </Grid>
                }
            </Grid>
            <Box marginTop={'1.5rem'}>
                {
                    showTable
                        ?
                        <PastJobrobosTable />
                        :
                        <EmptyTableView handleExtensionButton={handleExtensionButton}/>
                }
            </Box>
        </Box>
    )
}

export default PastJobRobos;
