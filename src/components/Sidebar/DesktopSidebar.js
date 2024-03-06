import React, { useState } from 'react';
import { NavLink as NavLinkBase, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from "@mui/material/Popover";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import GreenLogo from '../../assets/images/GreenLogo.svg';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PopOverMenu from './PopOverMenu';
import { useGetPersonalInfoQuery } from '../../api/personalInfoApi';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
	padding-bottom: 0;
  }
`);

const NavLink = styled(NavLinkBase)(({ theme, open }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    gap: '8px',
    border: '1px solid transparent',
    textDecoration: 'none',
    color: '#001405',
    padding: open ? '8px 12px' : '8px 0px',
    transition: !open ? 'justify-content 1s linear, padding 1s linear' : 'none',

    'svg': {
        opacity: '0.6'
    },

    "&.active": {
        borderRadius: '6px',
        borderColor: '#55B982',
        background: 'linear-gradient(0deg, rgba(85, 185, 130, 0.10) 0%, rgba(85, 185, 130, 0.10) 100%), #FFF',
        color: '#55B982',

        'p': {
            fontWeight: '600',
        },

        'svg': {
            opacity: '1'
        },
    }
}));

const NavButton = styled(Button)(({ theme, open, selected }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    gap: '8px',
    border: '1px solid transparent',
    textTransform: 'none',
    color: '#001405',
    background: selected ? 'linear-gradient(0deg, rgba(85, 185, 130, 0.10) 0%, rgba(85, 185, 130, 0.10) 100%), #FFF' : '#FFF',
    padding: open ? '8px 12px' : '8px 0px',
    transition: !open ? 'justify-content 1s linear, padding 1s linear' : 'none',

    'svg': {
        color: selected ? '#55B982' : '#001405',
        opacity: selected ? '1' : '0.6'
    },

    "&:hover": {
        backgroundColor: '#FFF'
    },
}));

const openedMixin = (theme) => ({
    width: 280,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `6rem`,
});

const DrawerPermanent = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: 280,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DesktopSidebar = ({ handleSupportModalOpen }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const { data: personalDetail } = useGetPersonalInfoQuery();


    const handleOpenDrawer = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsSidebarOpen(false);
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <Box display={{ xs: 'none', sm: 'block' }}>
                <DrawerPermanent variant="permanent" open={isSidebarOpen}>
                    <Box padding={'1.5rem'} height={'100%'} marginTop={'1rem'}>
                        <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'} rowGap={'2rem'}>
                            <Grid item width={'100%'} display={'flex'} alignItems={'center'} justifyContent={isSidebarOpen ? 'space-between' : 'center'}>
                                <Card variant='none' sx={{ display: isSidebarOpen ? 'flex' : 'none', gap: '4px', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 36 }}
                                        image={GreenLogo}
                                        alt="JobRobo"
                                    >
                                    </CardMedia>
                                    <CardContentNoPadding>
                                        <Typography variant='h5' fontSize={'18px'} fontWeight={'600'} color={'#001405'}>
                                            JobRobo
                                        </Typography>
                                    </CardContentNoPadding>
                                </Card>
                                {
                                    isSidebarOpen
                                        ?
                                        <IconButton aria-label="toggleSideBar" onClick={handleCloseDrawer}>
                                            <KeyboardDoubleArrowLeftIcon fontSize='medium' />
                                        </IconButton>
                                        :
                                        <IconButton aria-label="toggleSideBar" onClick={handleOpenDrawer}>
                                            <KeyboardDoubleArrowRightIcon fontSize='medium' />
                                        </IconButton>
                                }
                            </Grid>
                            <Grid item width={'100%'}>
                                <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                                    <ListItem disablePadding >
                                        <NavLink to={'/home'} open={isSidebarOpen}>
                                            <HomeIcon />
                                            <Typography variant='body2' fontWeight={'500'} sx={{ display: isSidebarOpen ? 'block' : 'none' }} >
                                                Home
                                            </Typography>
                                        </NavLink>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <NavLink to={'/pastjobrobo'} open={isSidebarOpen}>
                                            <WorkIcon />
                                            <Typography variant='body2' fontWeight={'500'} sx={{ display: isSidebarOpen ? 'block' : 'none' }} >
                                                Past Job Robos
                                            </Typography>
                                        </NavLink>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <NavLink to={'/profile'} open={isSidebarOpen}>
                                            <DescriptionIcon />
                                            <Typography variant='body2' fontWeight={'500'} sx={{ display: isSidebarOpen ? 'block' : 'none', transition: 'display 2.5s ease-in-out' }} >
                                                Profile
                                            </Typography>
                                        </NavLink>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item width={'100%'} marginTop={'auto'}>
                                <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                                    <ListItem disablePadding >
                                        <NavButton open={isSidebarOpen} onClick={handleSupportModalOpen}>
                                            <HelpOutlineIcon />
                                            <Typography variant='body2' fontWeight={'500'} sx={{ display: isSidebarOpen ? 'block' : 'none' }} >
                                                Support
                                            </Typography>
                                        </NavButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <NavButton
                                            open={isSidebarOpen}
                                            aria-describedby={id}
                                            onMouseEnter={handlePopoverOpen}
                                            selected={location.pathname === '/settings'}
                                            sx={{
                                                height: 'auto',
                                                border: location.pathname === '/settings' ? '1px solid #55B982' : '1px solid #E5E5E5',
                                            }}>
                                            <AccountCircleIcon />
                                            <Typography variant='body2' textAlign={'left'} sx={{ display: isSidebarOpen ? 'block' : 'none', whiteSpace: 'wrap' }}>
                                                {personalDetail?.first_name ? `${personalDetail?.first_name} ${personalDetail?.last_name}` : 'NA'}
                                            </Typography>
                                            <IconButton sx={{ marginLeft: 'auto', display: isSidebarOpen ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                                                <KeyboardArrowRightIcon />
                                            </IconButton>
                                        </NavButton>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handlePopoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <PopOverMenu handlePopoverClose={handlePopoverClose} />
                                        </Popover>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </DrawerPermanent>
            </Box>
        </>
    )
}

export default DesktopSidebar;
