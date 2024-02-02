import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ResumesDisplayCard from '../Profile/ResumesDisplayCard';
import { PrimaryGreenButton } from '../../styles/Buttons';

const JobSearchFilter = () => {
    const [formData, setFormData] = useState({
        noOfJobs: '',
        jobTitle: '',
        experienceInYears: '',
        location: '',
        companiesToInclude: '',
        companiesToExclude: '',
    });
    const [disableStatus, setDisableStatus] = useState(true);

    const getDisableStatus = () => {
        const ignoreKeys = ["companiesToInclude", "companiesToExclude"];
        const disableStatus = Object.entries(formData).some(([key, value]) => {
            return (!value && !ignoreKeys.includes(key));
        });
        setDisableStatus(disableStatus);
    }

    useEffect(() => {
        getDisableStatus();
    }, [formData]);

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleGetJobs = () => {
        console.log(formData);
        // Perform actions to collect/get jobs based on formData
        // You can add your logic here.
    };

    return (
        <Box width={'56rem'} height={'100%'}>
            <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'}>
                <Grid item padding={'16px 16px 8px'}>
                    <Typography variant='h6' fontWeight={'600'}>
                        Job Filters
                    </Typography>
                </Grid>
                <Grid container height={'100%'} display={'flex'} alignItems={'flex-start'} flexWrap={'nowrap'}>
                    <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'16px'}>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                No of jobs
                                <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='noOfJobs'
                                value={formData.noOfJobs}
                                onChange={handleFormInput}
                                placeholder='Enter number of jobs'
                                type='number'
                                inputProps={{ min: '1' }}
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Job Title
                                <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='jobTitle'
                                value={formData.jobTitle}
                                onChange={handleFormInput}
                                placeholder='Enter job title'
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Experience in years
                                <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='experienceInYears'
                                value={formData.experienceInYears}
                                onChange={handleFormInput}
                                placeholder='Enter experience level'
                                type='number'
                                inputProps={{ min: '0' }}
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Country/Location
                                <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='location'
                                value={formData.location}
                                onChange={handleFormInput}
                                placeholder='Enter location'
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Companies to Include (Separate by commas)
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='companiesToInclude'
                                value={formData.companiesToInclude}
                                onChange={handleFormInput}
                                placeholder='Enter companies to include seperated by commas'
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Companies to Exclude (Separate by commas)
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='companiesToExclude'
                                value={formData.companiesToExclude}
                                onChange={handleFormInput}
                                placeholder='Enter companies to exclude seperated by commas'
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'} marginTop={'2rem'}>
                        <ResumesDisplayCard />
                    </Grid>
                </Grid>
                <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'} width={'28rem'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryGreenButton sx={{ marginTop: '1rem', width: '20rem' }} disabled={disableStatus} onClick={() => (handleGetJobs())}>
                            Get Jobs
                        </PrimaryGreenButton>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default JobSearchFilter;
