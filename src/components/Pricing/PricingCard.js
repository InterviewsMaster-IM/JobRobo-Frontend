import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import ActiveRectangleMask from '../../assets/images/RectanglesEffect.svg';

const PricingCard = (props) => {
    const { name, price, benefits, activePlan, handleActivePlan } = props;

    return (
        <Paper elevation={3}
            sx={{
                width: '19rem',
                height: '23rem',
                padding: '24px',
                border: activePlan === name ? '4px solid #55B982' : '1px solid rgba(0, 20, 5, 0.10)',
                borderRadius: '16px',
                boxSizing: 'border-box',
                backgroundImage: activePlan === name && `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${ActiveRectangleMask})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
            }}
            onMouseEnter={() => handleActivePlan(name)}
        >
            <Box width={'100%'} height={'100%'} position={'relative'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'space-between'}>
                {
                    name === 'STANDARD'
                    &&
                    <Box position={'absolute'} top={'0'} right={'0'} padding={'4px 12px'} border={'1px solid #55B982'} borderRadius={'24px'} >
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'} letterSpacing={'0.72px'} color={'#55B982'}>
                            Most Popular
                        </Typography>
                    </Box>
                }
                <Grid container display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                    <Grid item>
                        <Typography variant='body1' fontWeight={'600'} color={'#7F8781'} letterSpacing={'0.96px'} textTransform={'uppercase'}>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h4' fontWeight={'600'}>
                            {price}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' fontWeight={'500'} color={'#7F8781'}>
                            per month
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                    {
                        benefits.map((item, index) => {
                            return (
                                <Grid key={index} item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={'8px'}>
                                    <CheckCircleOutlineOutlinedIcon fontSize='small' />
                                    <Typography variant='body2' fontWeight={'500'}>
                                        {item}
                                    </Typography>
                                </Grid>
                            )
                        })
                    }
                    <Grid item width={'100%'} marginTop={'8px'}>
                        {
                            activePlan === name
                                ?
                                <PrimaryGreenButton sx={{ width: '100%', justifyContent: 'center' }}>
                                    Upgrade
                                </PrimaryGreenButton>
                                :
                                <PrimaryWhiteButton sx={{ width: '100%', justifyContent: 'center' }}>
                                    Upgrade
                                </PrimaryWhiteButton>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

export default PricingCard;
