import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { ProfileConstants } from '../../utils/Constants';
import { format, parseISO } from 'date-fns';

const PersonalDetailsCard = ({ handleOpenForm, personalDetail }) => {

    const formattedDate = (dob) => {
        if (dob) {
            const parsedDate = parseISO(dob);
            return format(parsedDate, "do MMM yyyy");
        } else {
            return '-';
        }
    };

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
                                Personal Info
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                {personalDetail?.first_name} {personalDetail?.last_name}
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                {personalDetail?.location}
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                {personalDetail?.email}
                            </Typography>
                            <Typography variant='body2' color={'#7F8781'}>
                                {personalDetail?.country_code} {personalDetail?.phone}
                            </Typography>
                            {(personalDetail?.dob) &&
                                <Typography variant='body2' color={'#7F8781'}>
                                    DOB: {formattedDate(personalDetail?.dob)}
                                </Typography>
                            }
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton onClick={() => handleOpenForm(ProfileConstants.PERSONAL_DETAILS)}>
                                {(personalDetail?.first_name) ?
                                    <ModeEditOutlineOutlinedIcon fontSize='small' />
                                    :
                                    <AddIcon fontSize='small' />
                                }
                                <Typography variant='body2' fontWeight={'500'}>
                                    {(personalDetail?.first_name) ? 'Edit' : 'Add'}
                                </Typography>
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    <Grid container item paddingTop={'1rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid #E5E5E5'}>
                        <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Link variant='body2' color={'#001405'} href={personalDetail?.linkedin} target="_blank" underline="always">
                                {personalDetail?.linkedin}
                            </Link>
                            <Link variant='body2' color={'#001405'} href={personalDetail?.github} target="_blank" underline="always">
                                {personalDetail?.github}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default PersonalDetailsCard;
