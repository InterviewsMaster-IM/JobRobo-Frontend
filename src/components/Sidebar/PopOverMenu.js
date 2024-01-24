import React from 'react';
import { Link as LinkBase } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../utils/authContext';

const Link = styled(LinkBase)(({ theme }) => ({
    textDecoration: 'none',
    padding: '8px 16px 8px 12px',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '8px',
    borderRadius: '8px',
    background: 'rgba(85, 185, 130, 0.1)',
    color: '#001405',
    opacity: 0.7,
}));

const PopOverMenu = ({ handlePopoverClose }) => {
    const { logout } = useAuth();

    return (
        <Box width={'15rem'} padding={'8px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}
            sx={{
                boxSizing: 'border-box',
                borderRadius: '6px',
                border: '1px solid rgba(11, 19, 36, 0.07)',
                background: 'rgba(85, 185, 130, 0.1)',
                boxShadow: '0px 5px 12px 0px rgba(11, 19, 36, 0.2), 0px 1px 5px 0px rgba(11, 19, 36, 0.1)',
            }}
            onMouseLeave={handlePopoverClose}
        >
            <Link to="/settings" onClick={handlePopoverClose}>
                <SettingsIcon />
                <Typography variant='body2' color={'#001405'}>
                    Account settings
                </Typography>
            </Link>
            <Link to="/" onClick={logout}>
                <LogoutIcon />
                <Typography variant='body2' color={'#001405'}>
                    Sign out
                </Typography>
            </Link>
        </Box>
    )
}

export default PopOverMenu;
