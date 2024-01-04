import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import { PrimaryWhiteButton } from '../../styles/Buttons';

const EducationDetailsCard = ({ handleOpenForm }) => {

    const [educationDetailsList, setEducationDetailsList] = useState([{}]);

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
                    <Grid container item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} columnGap={'1rem'} rowGap={'1rem'}>
                        <Grid item>
                            <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                                Education
                            </Typography>
                            <Typography variant='body2' fontWeight={'400'} color={'#7F8781'}>
                                Add your education details
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton onClick={() => handleOpenForm('education')}>
                                <AddIcon fontSize='small' />
                                <Typography variant='body2' fontWeight={'500'} marginRight={'4px'}>
                                    Add
                                </Typography>
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    {
                        educationDetailsList.length > 0
                        &&
                        <Grid container display={'flex'} flexDirection={'column'} gap={'12px'} paddingTop={'8px'} borderTop={'1px solid #E5E5E5'}>
                            {
                                educationDetailsList.map((detailsObj, index) => {
                                    return (
                                        <>
                                            <Grid container item paddingY={'12px'} paddingX={'8px'} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={'12px'}>
                                                <Grid item>
                                                    <Box
                                                        width={'2rem'}
                                                        height={'2rem'}
                                                        bgcolor={'#E5E5E5'}
                                                        display={'flex'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                        borderRadius={'50%'}
                                                    >
                                                        <SchoolTwoToneIcon fontSize='small' htmlColor='#7F8781' />
                                                    </Box>
                                                </Grid>
                                                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                                                    <Typography variant='body2' fontWeight={'500'} color={'#1A1A1A'}>
                                                        Master's, Computer Science Engineering
                                                    </Typography>
                                                    <Typography variant='body2' fontWeight={'500'} color={'#808080'}>
                                                        University of California Berkeley
                                                    </Typography>
                                                    <Typography variant='body2' fontWeight={'400'} color={'#808080'}>
                                                        GPA: 3.78
                                                    </Typography>
                                                </Grid>
                                                <Grid item marginLeft={'auto'}>
                                                    <Typography variant='body2' fontWeight={'400'} color={'#808080'}>
                                                        Jan 2016 - Dec 2018
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            {
                                                index !== educationDetailsList.length - 1
                                                &&
                                                <Divider />
                                            }
                                        </>
                                    )
                                })
                            }
                        </Grid>
                    }
                </Grid>
            </Card>
        </Box>
    )
}

export default EducationDetailsCard;
