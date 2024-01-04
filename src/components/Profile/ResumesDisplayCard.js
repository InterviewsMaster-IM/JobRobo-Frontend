import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { IconButton } from '@mui/material';

const ResumesDisplayCard = () => {

    const [resumesList, setResumesList] = useState([]);

    const handleUploadResume = (event) => {
        if (event.target.files[0]) {
            setResumesList((resumesList) => [...resumesList, event.target.files[0]]);
        }
    }

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
                        <Grid item display={'flex'} flexDirection={'row'} gap={'4px'}>
                            <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                                Resume
                            </Typography>
                            <Typography color={'#ff0000'} fontWeight={'600'}>
                                *
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton component="label" >
                                <FileUploadOutlinedIcon fontSize='medium' />
                                <Typography variant='body2' fontWeight={'500'}>
                                    Upload
                                </Typography>
                                <input
                                    name='resume'
                                    style={{ display: 'none' }}
                                    id="resume-display-card"
                                    accept=".docx, .doc, application/pdf, application/msword, text/plain"
                                    type="file"
                                    onChange={handleUploadResume}
                                />
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    {
                        resumesList.length > 0
                        &&
                        <Grid container item paddingTop={'1rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid #E5E5E5'}>
                            {
                                resumesList.map((resume) => {
                                    return (
                                        <Grid item width={'100%'} >
                                            <Card variant='outlined' sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                padding: '0px 12px',
                                                borderRadius: '6px',
                                                border: true ? '1px solid #55B982' : '1px solid #E5E5E5', //condition: default resume => true, else => false
                                                background: true ? 'rgba(234, 247, 239, 0.30)' : '#FFF',//condition: default resume => true, else => false
                                            }}>
                                                <Typography variant='body2' fontWeight={'500'} paddingTop={'8px'} paddingBottom={'8px'}>
                                                    {resume.name}
                                                </Typography>
                                                <IconButton sx={{ backgroundColor: '#FFF', borderRadius: '6px', padding: '0px' }}>
                                                    <MoreHorizIcon htmlColor='#001405' />
                                                </IconButton>
                                            </Card>
                                        </Grid>
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

export default ResumesDisplayCard;
