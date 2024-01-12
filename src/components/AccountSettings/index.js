import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PrimaryGreenButton } from '../../styles/Buttons';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BillingHistory from './BillingHistory';
import CreditsHistory from './CreditsHistory';
import { useNavigate } from 'react-router-dom';
import { useGetCreditHistoryQuery, useGetUserCreditsQuery } from '../../api/creditsApi';

const AccountSettings = () => {
    const navigate = useNavigate();
    const { data: userCredits, refetch: fetchCredits } = useGetUserCreditsQuery();
    const { data: history, refetch: fetchCreditsHistory } = useGetCreditHistoryQuery();

    useEffect(() => {
        fetchCredits();
        fetchCreditsHistory();
    }, []);

    const handleUpgradePlanButton = () => {
        navigate('/pricing');
    }

    return (
        <Box component={"main"} sx={{ flexGrow: 1 }}>
            <Box
                paddingX={'4rem'}
                paddingY={'2rem'}
                display={'flex'}
                flexDirection={'column'}
                gap={3}
            >
                <Box>
                    <Typography variant='h6' fontWeight={'500'}>
                        Account Settings
                    </Typography>
                    <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                        Update your account settings and manage plans
                    </Typography>
                </Box>
                <Box display={'flex'} gap={4} width={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
                    {userCredits ? <Card variant='outlined' sx={{ width: '30rem', height: '14rem', borderRadius: '0.5rem', padding: '1.5rem' }}>
                        <CardContent sx={{ padding: '0 !important', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant='h6' fontSize={'18px'}>
                                    Pricing Plan
                                </Typography>
                                <PrimaryGreenButton sx={{ gap: '8px', paddingY: '4px', paddingX: '12px' }} onClick={handleUpgradePlanButton}>
                                    <RocketLaunchOutlinedIcon fontSize='small' />
                                    <Typography variant='body2' fontWeight={'500'} fontSize={'16px'}>
                                        Upgrade plan
                                    </Typography>
                                </PrimaryGreenButton>
                            </Box>
                            <Box border={'1px solid #55B982'} padding={'1.5rem'} borderRadius={'0.4rem'}>
                                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                                    <CircularProgress sx={{ color: '#001405' }} variant="determinate" value={75} size={'1.5rem'} />
                                    <Typography variant='body2' fontWeight={'600'}>
                                        {userCredits?.total_credits} credits left this month
                                    </Typography>
                                </Box>

                                {userCredits?.current_plan ?
                                    <>
                                        <Typography marginTop={'0.3rem'}>
                                            Currently on
                                            <Typography component={'span'} color={'#55B982'} fontWeight={'600'}> {userCredits?.current_plan.name} </Typography>
                                            plan
                                        </Typography>
                                        {userCredits?.current_plan?.description?.split('\n')?.map((item, index) => {
                                            return (
                                                <Box key={index} display={'flex'} alignItems={'center'} gap={'0.5rem'} marginTop={'1rem'}>
                                                    <CheckCircleIcon sx={{ color: '#55B982' }} />
                                                    <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                                                        {item}
                                                    </Typography>
                                                </Box>)
                                        })}
                                    </> : null}
                            </Box>
                        </CardContent>
                    </Card> : null}
                    <Card variant='outlined' sx={{ width: '20rem', height: '14rem', borderRadius: '0.5rem', padding: '1.5rem' }}>
                        <Box display={'flex'} flexDirection={'column'} gap={'1.5rem'}>
                            <Typography variant='h6' fontSize={'18px'}>Account Info</Typography>
                            <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
                                <Box>
                                    <Typography fontSize={'14px'} color={'#7F8781'}>Name:</Typography>
                                    <Typography fontSize={'14px'}>Xyz Abc</Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize={'14px'} color={'#7F8781'}>Email ID:</Typography>
                                    <Typography fontSize={'14px'}>xyz@gmail.com</Typography>
                                </Box>
                            </Box>
                            <Box color={'#7F8781'} display={'flex'} gap={'2px'}>
                                <InfoOutlinedIcon fontSize='16px'></InfoOutlinedIcon>
                                <Typography fontSize={'12px'}>This information is for account management purposes and do not affect your JobRobo profile</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box>
                <BillingHistory history={history} />
                <CreditsHistory history={history} />
            </Box>
        </Box>
    )
}

export default AccountSettings;
