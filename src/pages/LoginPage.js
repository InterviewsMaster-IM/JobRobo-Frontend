import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import UsersThreeImage from '../assets/images/UsersThree.png';
import TimerImage from '../assets/images/Timer.png';
import FastForwardCircleImage from '../assets/images/FastForwardCircle.png';
import Button from '@mui/material/Button';
import RectangleMask from '../assets/images/Rectanglesmaskgroup.png';
import LogoImage from '../assets/images/FinnTheHuman.png';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

const LoginPage = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		// Redirect to Google on button click
		window.location.href = process.env.REACT_APP_LOGIN_URL;
		// after login
		// navigate('/dashboard');
	};

	return (
		<Box minHeight={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}
			sx={{
				backgroundImage: `url(${RectangleMask})`,
				backgroundRepeat: `no-repeat`,
				backgroundSize: `cover`,
				backgroundPosition: `center`,
			}}>
			<Container maxWidth={{ sm: '300px' }}>
				<Grid container marginTop={{ xs: '6rem', md: '0' }} marginBottom={{ xs: '2rem', md: '0' }} display={'flex'} rowGap={10} justifyContent={'center'} alignItems={'stretch'} columnGap={6}>
					<Grid container rowGap={5} item xs={11} sm={8} md={6} lg={5} xl={4} order={{ md: 0, xs: 1 }}>
						<Grid item xs={10} position={{ xs: 'absolute', md: 'relative' }} top={{ xs: '2rem', md: '0' }} left={{ xs: '2rem', md: '0' }}>
							<Card variant='none' sx={{ display: 'flex', gap: '16px', alignItems: 'center', backgroundColor: 'transparent' }}>
								<CardMedia
									component="img"
									sx={{ width: 48 }}
									image={LogoImage}
									alt="JobRobo"
								>
								</CardMedia>
								<CardContentNoPadding>
									<Typography variant='h5' fontWeight={'500'} letterSpacing={'0.24px'} color={'#001405'}>
										JobRobo
									</Typography>
								</CardContentNoPadding>
							</Card>
						</Grid>
						<Grid item>
							<Typography variant="h5" fontWeight={'600'} color={'#001405'}>
								Your next dream job is just a few clicks away.
							</Typography>
							<Typography variant="h5" fontWeight={'600'} color={'#001405'}>
								We are here to help.
							</Typography>
						</Grid>
						<Grid item marginBottom={'8px'}>
							<Card variant='none' sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
								<Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'rgba(85, 185, 130, 0.10)'} padding={'12px'} borderRadius={'16px'} >
									<CardMedia
										component="img"
										width={'36px'}
										image={FastForwardCircleImage}
										alt="Three Users"
									/>
								</Box>
								<Box padding={'0px'}>
									<CardContentNoPadding>
										<Typography component="div" fontSize={'18px'} fontWeight={'600'} color={'#001405'}>
											5x Faster job application filling
										</Typography>
										<Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
											100% automated job application filling on popular job boards
										</Typography>
									</CardContentNoPadding>
								</Box>
							</Card>
						</Grid>
						<Grid item marginBottom={'8px'}>
							<Card variant='none' sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
								<Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'rgba(85, 185, 130, 0.10)'} padding={'12px'} borderRadius={'16px'} boxShadow={'0px 1.782px 1.782px 0px rgba(255, 255, 255, 0.03)'}>
									<CardMedia
										component="img"
										width={'36px'}
										image={UsersThreeImage}
										alt="Three Users"
									/>
								</Box>
								<Box padding={'0px'}>
									<CardContentNoPadding>
										<Typography component="div" fontSize={'18px'} fontWeight={'600'} color={'#001405'}>
											Super fast Networking
										</Typography>
										<Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
											Send automated connection requests and follow ups on LinkedIn
										</Typography>
									</CardContentNoPadding>
								</Box>
							</Card>
						</Grid>
						<Grid item marginBottom={'8px'}>
							<Card variant='none' sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
								<Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'rgba(85, 185, 130, 0.10)'} padding={'12px'} borderRadius={'16px'} >
									<CardMedia
										component="img"
										width={'36px'}
										image={TimerImage}
										alt="Three Users"
									/>
								</Box>
								<Box padding={'0px'}>
									<CardContentNoPadding>
										<Typography component="div" fontSize={'18px'} fontWeight={'600'} color={'#001405'}>
											Get back control of your time
										</Typography>
										<Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
											Save time with automation to maximize your interview prep time
										</Typography>
									</CardContentNoPadding>
								</Box>
							</Card>
						</Grid>
					</Grid>
					<Grid item xs={11} sm={8} md={4} lg={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
						<Card
							sx={{
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								height: '15rem',
								border: `1px solid rgba(0, 20, 5, 0.10)`,
								borderRadius: '16px',
								boxShadow: `0px 1px 2px 0px rgba(42, 43, 46, 0.06), 0px 0px 38px 0px rgba(42, 43, 46, 0.03), 0px 3px 70px 0px rgba(42, 43, 46, 0.02)`,
							}}
						>
							<Button variant="outlined" sx={{
								width: '60%',
								borderRadius: '6px',
								border: '1px solid var(--Border-container-stroke, rgba(0, 20, 5, 0.10))',
								boxShadow: '0px 2px 1px 0px rgba(255, 255, 255, 0.10) inset, 0px 1px 3px 0px rgba(11, 19, 36, 0.10), 0px -1px 0px 0px rgba(0, 0, 0, 0.10) inset',
								padding: '8px 12px',
								gap: '10px'
							}} onClick={handleLogin}>
								<LinkedInIcon />
								<Typography variant='body2' color={'#001405'} fontWeight={'500'} textTransform={'none'}>
									Sign in with LinkedIn
								</Typography>
							</Button>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default LoginPage;
