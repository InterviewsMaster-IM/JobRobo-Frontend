import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ProfileStrengthSection = ({ type = "high" }) => {
    return (
        <Box width={'100%'} boxSizing={'border-box'} padding={'1rem'} borderRadius={'16px'} border={'1px solid rgba(0, 20, 5, 0.10)'}>
            <Grid container display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'8px'}>
                <Grid item>
                </Grid>
                <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'4px'}>
                    <Typography >
                        Profile strength: {type}
                    </Typography>
                    <Typography>
                        Fill more sections of the profile to land a job faster!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileStrengthSection;
