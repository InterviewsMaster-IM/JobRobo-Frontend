import React from 'react';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LogoImage from '../../assets/images/FinnTheHuman.svg';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { useAuth } from '../../utils/authContext';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
	padding-bottom: 0;
  }
`);

const Header = () => {
    const { logout } = useAuth();

    return (
        <AppBar sx={{ backgroundColor: '#FFF', boxShadow: 'none', borderBottom: '1px solid #E5E5E5' }}>
            <Grid container padding={'16px 56px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                    <Card variant='none' sx={{ display: 'flex', gap: '16px', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 36 }}
                            image={LogoImage}
                            alt="JobRobo"
                        >
                        </CardMedia>
                        <CardContentNoPadding>
                            <Typography variant='h6' fontWeight={'600'} letterSpacing={'0.24px'} color={'#001405'}>
                                JobRobo
                            </Typography>
                        </CardContentNoPadding>
                    </Card>
                </Grid>
                <Grid item>
                    <Button variant='text' sx={{
                        padding: '8px 14px',
                        color: '#001405',
                        textTransform: 'none',
                        fontWeight: '500',
                        border: '1px solid transparent',
                        '&:hover': {
                            borderColor: 'rgba(0, 20, 5)',
                            backgroundColor: '#FFF',
                        }
                    }} onClick={logout}>
                        <Typography>
                            Sign out
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header;
