import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const PrimaryGreenButton = styled(Button)({
    textTransform: 'none',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    padding: '8px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    borderRadius: '6px',
    border: '1px solid rgba(0, 20, 5, 0.10)',
    background: '#55B982',
    boxShadow: '0px 2px 1px 0px rgba(255, 255, 255, 0.10) inset, 0px -1px 0px 0px rgba(0, 20, 5, 0.10) inset, 0px 1px 3px 0px rgba(0, 20, 5, 0.10)',

    '&:hover': {
        background: '#55B982',
    },
    '&.Mui-disabled': {
        color: '#fff',
        opacity: 0.5
    }
});

export const PrimaryWhiteButton = styled(Button)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    color: '#001405',
    textTransform: 'none',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    border: '1px solid rgba(0, 20, 5, 0.10)',
    background: '#FFF',
    boxShadow: '0px 2px 1px 0px rgba(255, 255, 255, 0.10) inset, 0px -1px 0px 0px rgba(0, 20, 5, 0.10) inset, 0px 1px 3px 0px rgba(0, 20, 5, 0.10)',

    '&:hover': {
        background: '#FFF',
        border: '1px solid rgba(0, 20, 5, 0.10)'
    }
})
