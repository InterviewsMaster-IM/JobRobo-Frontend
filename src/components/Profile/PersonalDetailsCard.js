import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { PrimaryWhiteButton } from '../../styles/Buttons';

const PersonalDetailsCard = () => {
    return (
        <Box width={'100%'} minWidth={'max-content'}>
            <Card variant='outlined' sx={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 20, 5, 0.10)',
            }}>
                <Grid container display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
                    <Grid container item display={'flex'} flexDirection={'row'} alignItems={'flex-start'} justifyContent={'space-between'} columnGap={'0.5rem'} rowGap={'1rem'}>
                        <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'} >
                            <Typography variant='body2' fontSize={'18px'} fontWeight={'600'}>
                                Rishikesh Sharma
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                San Diego, California
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                rishisharma102@gmail.com
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                +1 (295)-143-5920
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                DOB: 12 Mar 1992
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton>
                                <ModeEditOutlineOutlinedIcon fontSize='small' />
                                <Typography variant='body2' fontWeight={'500'}>
                                    Edit
                                </Typography>
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    <Grid container item paddingTop={'1rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid #E5E5E5'}>
                        <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Link variant='body2' color={'#001405'} href="#" underline="always">
                                linkedin.com/rishikeshsharma92845
                            </Link>
                            <Link variant='body2' color={'#001405'} href="#" underline="always">
                                github.com/rishi19298
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default PersonalDetailsCard;
