import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { toast } from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';

const CustomToast = ({ type, message }) => {

    const handleToastClose = () => {
        toast.remove();
    };

    return (
        <Box
            sx={{
                width: 'fit-content',
                minWidth: '24rem',
                padding: '12px 16px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                border: `1px solid rgba(0, 20, 5, 0.10)`,
                backgroundColor: '#FFF',
                borderRadius: '8px',
                zIndex: '1000',
                boxShadow: `0px 1px 2px 0px rgba(42, 43, 46, 0.06), 0px 0px 38px 0px rgba(42, 43, 46, 0.03), 0px 3px 70px 0px rgba(42, 43, 46, 0.02)`,
            }}>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={'8px'}>
                <Grid item>
                    <Box
                        width={'2.3rem'}
                        height={'2.3rem'}
                        bgcolor={'transparent'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        boxShadow={'0px 1.143px 0.571px 0px rgba(255, 255, 255, 0.10) inset, 0px -0.571px 0px 0px rgba(0, 0, 0, 0.10) inset'}
                        border={'0.5px solid #E5E5E5'}
                        borderRadius={'50%'}>
                        <Box
                            width={'2rem'}
                            height={'2rem'}
                            bgcolor={type === 'success' ? 'rgba(85, 185, 130, 0.10)' : 'rgba(208, 79, 79, 0.10)'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            boxShadow={'0px -1.143px 2.286px 0px rgba(26, 185, 0, 0.08) inset'}
                            border={'0.5px solid #E5E5E5'}
                            borderRadius={'50%'}
                        >
                            {
                                type === 'success'
                                    ?
                                    <DoneOutlineTwoToneIcon fontSize='small' htmlColor='#55B982' />
                                    :
                                    <ReportProblemTwoToneIcon fontSize='small' htmlColor='#D04F4F' />
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography>
                        {message}
                    </Typography>
                </Grid>
            </Grid>
            <IconButton onClick={() => handleToastClose()}>
                <CloseIcon />
            </IconButton>
        </Box >
    );
}

export default CustomToast;
