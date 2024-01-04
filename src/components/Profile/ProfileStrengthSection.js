import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import RectangleMask from '../../assets/images/Rectanglesmaskgroup.png';

const ProfileStrengthSection = ({ type = "High" }) => {
    return (
        <Box width={'100%'} boxSizing={'border-box'} padding={'1rem'} borderRadius={'16px'} border={type === 'High' ? '1px solid #55B982' : '1px solid #D04F4F'} sx={{
            backgroundImage: `url(${RectangleMask})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            backgroundColor: type === 'High' ? 'rgba(85, 185, 130, 0.10)' : 'rgba(208, 79, 79, 0.05)',
        }}>
            <Grid container display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'12px'}>
                <Grid item>
                    <Box
                        width={'2.6rem'}
                        height={'2.6rem'}
                        bgcolor={type === 'High' ? '#55B982' : '#D04F4F'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'50%'}
                    >
                        {
                            type === 'High'
                                ?
                                <DoneOutlineTwoToneIcon htmlColor='#FFF' />
                                :
                                <ReportProblemTwoToneIcon htmlColor='#FFF' />
                        }
                    </Box>
                </Grid>
                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'4px'}>
                    <Typography variant='body1' fontWeight={'600'} color={type === 'High' ? '#55B982' : '#D04F4F'}>
                        Profile strength:  {type}
                    </Typography>
                    <Typography variant='body2' fontWeight={'500'} color='#001405' >
                        Fill more sections of the profile to land a job faster!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileStrengthSection;
