import React, { useState } from 'react';
import { NavLink as NavLinkBase } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoImage from '../../assets/images/FinnTheHuman.svg';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
	padding-bottom: 0;
  }
`);


const NavLink = styled(NavLinkBase)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    border: '1px solid transparent',
    textDecoration: 'none',
    padding: '8px 12px',
    color: '#FFF',
    
    'svg': {
        opacity: '0.8'
    },

    "&.active": {
        borderRadius: '6px',
        background: 'linear-gradient(0deg, rgba(85, 185, 130, 0.10) 0%, rgba(85, 185, 130, 0.10) 100%), #FFF',
        color: '#55B982',

        'p': {
            fontWeight: '600',
        },
    }
}));


const MobileSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = (value) => {
        setIsSidebarOpen(value);
    }

    return (
        <Box display={{ sm: 'none', xs: 'block' }} position={'relative'}>
            <IconButton onClick={() => toggleSidebar(true)} sx={{ position: 'fixed', top: '10px', left: '10px', zIndex: '10', borderRadius: '6px', border: '1px solid #E5E5E5', padding: '0px 8px' }}>
                <MenuOutlinedIcon fontSize='large'/>
            </IconButton>
            <Drawer
                anchor='left'
                open={isSidebarOpen}
                onClose={() => toggleSidebar(false)}
                sx={{ display: { sm: 'none' }}}
            >
                <Box padding={'1.5rem'} paddingTop={'2.5rem'} height={'100%'} sx={{ backgroundColor: '#55B982' }}>
                    <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'} rowGap={'2rem'}>
                        <Grid item width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Card variant='none' sx={{ display: 'flex', gap: '4px', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 36, filter: 'brightness(0) invert(1)' }}
                                    image={LogoImage}
                                    alt="JobRobo"
                                >
                                </CardMedia>
                                <CardContentNoPadding>
                                    <Typography variant='h5' fontSize={'18px'} fontWeight={'600'} color={'#FFF'}>
                                        JobRobo
                                    </Typography>
                                </CardContentNoPadding>
                            </Card>
                        </Grid>
                        <Grid item width={'100%'}>
                            <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                                <ListItem disablePadding >
                                    <NavLink to={'/home'} >
                                        <HomeIcon />
                                        <Typography variant='body2' fontWeight={'500'}>
                                            Home
                                        </Typography>
                                    </NavLink>
                                </ListItem>
                                <ListItem disablePadding>
                                    <NavLink to={'/pastjobrobo'}>
                                        <WorkIcon />
                                        <Typography variant='body2' fontWeight={'500'}>
                                            Past Job Robos
                                        </Typography>
                                    </NavLink>
                                </ListItem>
                                <ListItem disablePadding>
                                    <NavLink to={'/profile'}>
                                        <DescriptionIcon />
                                        <Typography variant='body2' fontWeight={'500'} >
                                            JobRobo Profile
                                        </Typography>
                                    </NavLink>
                                </ListItem>
                                <ListItem disablePadding >
                                    <NavLink to={'/home'}>
                                        <HelpOutlineIcon />
                                        <Typography variant='body2' fontWeight={'500'}>
                                            Support
                                        </Typography>
                                    </NavLink>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Button sx={{
                                        width: '100%',
                                        minWidth: '100%',
                                        height: 'auto',
                                        padding: '8px 12px',
                                        border: '1px solid #FFF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: '8px',
                                        textTransform: 'none',
                                        marginTop: '10px'
                                    }}>
                                        <Typography variant='body2' textAlign={'left'} color={'#FFF'} sx={{ whiteSpace: 'wrap' }}>
                                            Priyanshi Maheshwari
                                        </Typography>
                                        <IconButton sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                                            <KeyboardArrowRightIcon htmlColor='#FFF'/>
                                        </IconButton>
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </Box>
    )
}

export default MobileSidebar;
