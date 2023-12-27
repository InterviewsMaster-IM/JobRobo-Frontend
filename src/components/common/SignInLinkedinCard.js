import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SignInLinkedinCard = ({ handleLogin }) => {
    return (
        <Box width={'100%'}>
            <Card
                sx={{
                    width: '100%',
                    padding: '3rem 1.5rem',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    border: `1px solid rgba(0, 20, 5, 0.10)`,
                    borderRadius: '16px',
                    boxShadow: `0px 1px 2px 0px rgba(42, 43, 46, 0.06), 0px 0px 38px 0px rgba(42, 43, 46, 0.03), 0px 3px 70px 0px rgba(42, 43, 46, 0.02)`,
                }}
            >
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'8px'}>
                    <Typography variant='h5' color={'#001405'} fontWeight={'600'} textAlign={'center'}>
                        Sign in to get started
                    </Typography>
                    <Typography variant='body2' color={'#7F8781'} textAlign={'center'}>
                        JobRobo will help you get your next job at warp speed!
                    </Typography>
                </Box>
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
        </Box>
    )
}

export default SignInLinkedinCard;
