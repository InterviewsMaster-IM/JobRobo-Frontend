import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import RectangleMask from '../assets/images/Rectanglesmaskgroup.png';
import PricingCard from '../components/Pricing/PricingCard';
import { useGetCreditPlansQuery } from '../api/creditsApi';

const PricingPage = () => {
    const navigate = useNavigate();
    const { data: plans, isLoading } = useGetCreditPlansQuery();
    const [activePlan, setActivePlan] = useState("STANDARD");

    const handleActivePlan = (plan) => {
        setActivePlan(plan);
    }

    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <Box minHeight={'100vh'} paddingTop={'4rem'} display={'flex'}
            sx={{
                boxSizing: 'border-box',
                backgroundImage: `url(${RectangleMask})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
            }}>
            <Container>
                <Grid container display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'40px'}>
                    <Grid container item>
                        <Button sx={{ textTransform: 'none', gap: '8px' }} onClick={handleNavigateBack}>
                            <KeyboardBackspaceOutlinedIcon color='black' />
                            <Typography color={'#001405'} >
                                Back
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                        <Typography variant='h5' fontWeight={'500'}>
                            Choose the right plan for you
                        </Typography>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={'46px'}>
                            {
                                plans?.map((plan, index) => {
                                    return (
                                        <PricingCard
                                            key={index}
                                            name={plan.name}
                                            price={plan.price}
                                            benefits={plan.description.split('\n')}
                                            activePlan={activePlan}
                                            handleActivePlan={handleActivePlan}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default PricingPage;
