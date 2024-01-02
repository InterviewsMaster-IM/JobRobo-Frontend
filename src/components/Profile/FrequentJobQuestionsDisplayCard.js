import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PrimaryWhiteButton } from '../../styles/Buttons';

const FrequentJobQuestionsDisplayCard = () => {
    return (
        <Box width={'100%'} minWidth={'max-content'}>
            <Card variant='outlined' sx={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 20, 5, 0.10)',
            }}>
                <Grid container display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
                    <Grid container item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} columnGap={'1rem'} rowGap={'1rem'}>
                        <Grid item >
                            <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                                Frequent job questions
                            </Typography>
                            <Typography variant='body2' fontWeight={'400'} color={'#7F8781'}>
                                Curated questions that are frequently asked in applications
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton>
                                <ModeEditOutlineOutlinedIcon fontSize='small' />
                                <Typography variant='body2' fontWeight={'500'}>
                                    Edit
                                </Typography>
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    <Grid container item paddingTop={'1rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid #E5E5E5'}>
                        <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                            <CheckCircleIcon fontSize='14px' htmlColor='#55B982' />
                            <Typography variant='body2' fontWeight={'500'} color={'#55B982'} letterSpacing={'0.14px'}>
                                7 out of 20 questions answered
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default FrequentJobQuestionsDisplayCard;
