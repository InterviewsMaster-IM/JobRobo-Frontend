import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { PrimaryGreenButton } from '../../styles/Buttons';

const AppliedJobDetailsHeader = () => {
    return (
        <Box width={'100%'} boxSizing={'border-box'} padding={'16px'} borderRadius={'6px'} border={'1px solid #E5E5E5'} >
            <Box width={'auto'} display={'flex'} justifyContent={'space-between'} columnGap={'2rem'} flexWrap={'wrap'} rowGap={'2rem'}>
                <Grid container width={{ lg: '70%' }} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'nowrap'} columnGap={'3rem'} rowGap={'2rem'} >
                    <Grid item>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            ZipRecruiter
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Job Board
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            32
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Jobs Applied
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            Canada
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Location
                        </Typography>
                    </Grid>
                    <Grid item width={'max-content'}>
                        <Typography variant='body1' fontWeight={'600'} width={'max-content'}>
                            3 Hours
                        </Typography>
                        <Typography variant='body2' color={'#7F8781'} width={'max-content'}>
                            Time saved
                        </Typography>
                    </Grid>
                </Grid>
                <Grid textAlign={'right'}>
                    <PrimaryGreenButton sx={{ width: '12rem' }}>
                        Run this Job robo
                    </PrimaryGreenButton>
                </Grid>
            </Box>
        </Box>
    )
}

export default AppliedJobDetailsHeader;
