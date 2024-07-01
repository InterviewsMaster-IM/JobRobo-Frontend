import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import ResumesDisplayCard from '../Profile/ResumesDisplayCard';
import { PrimaryGreenButton } from '../../styles/Buttons';
import { useAddJobSearchFiltersMutation } from '../../api/filtersApi';
import { generateUuidForUserEmail, postExtensionCommunication } from '../../utils/Helpers';
import { datePostedOptions, employmentTypeOptions, sortByOptions, workPreferenceOptions } from '../../utils/Constants';
import { useGetPersonalInfoQuery } from '../../api/personalInfoApi';
import { Link } from 'react-router-dom';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const JobSearchFilter = () => {
    const [addJobSearchFilters, { isSuccess }] = useAddJobSearchFiltersMutation();
    const [formData, setFormData] = useState({
        noOfJobs: '',
        jobTitle: '',
        jobType: [],
        workType: [],
        datePosted: '',
        sortBy: '',
        experienceInYears: '',
        location: '',
    });
    const [disableStatus, setDisableStatus] = useState(true);
    const { data: personalDetail } = useGetPersonalInfoQuery();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

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

    // Effect to handle showing success message and resetting form on success
    useEffect(() => {
        if (isSuccess) {
            setShowSuccessMessage(true);
            // Optionally reset form or do other actions
            setFormData({
                noOfJobs: '',
                jobTitle: '',
                jobType: [],
                workType: [],
                datePosted: '',
                sortBy: '',
                experienceInYears: '',
                location: '',
            });
        }
    }, [isSuccess]);

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleGetJobs = async () => {
        // Assuming generateUuidForUserEmail and postExtensionCommunication functions are defined
        const uniqueUserId = await generateUuidForUserEmail(personalDetail?.email);

        // Mapping the formData to match the JobSearch class structure
        const finalData = {
            userId: uniqueUserId,
            numberOfJobs: formData.noOfJobs ? parseInt(formData.noOfJobs, 10) : null,
            jobTitle: formData.jobTitle || 'Software Engineer',
            experienceYears: formData.experienceInYears ? parseInt(formData.experienceInYears, 10) : null,
            jobType: formData.jobType || null,
            workType: formData.workType || null,
            sortBy: formData.sortBy || null,
            datePosted: formData.datePosted || null,
            countryLocation: formData.location || null,
        };
        try {
            await addJobSearchFilters(finalData);
        } catch (error) {
            console.log(error);
            // Handle error, e.g., display an error message
        }
    };

    const handleExtensionButton = (userId) => {
        const extensionInstalled = document.getElementById("post-scrapper-container");
        console.log(extensionInstalled);
        if (extensionInstalled) {
            postExtensionCommunication("OPEN_POST_SCRAPER", userId);
        } else {
            window.open(process.env.REACT_APP_EXTENSION_PLAYSTORE_URL);
        }
    }

    const renderValue = (selected, options, placeholder) => {
        if (!selected) {
            return <Typography color={'#9fa7a1'} fontSize={'14px'}>{placeholder}</Typography>
        }
        else {
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : '';
        }
    };

    const renderMultipleValues = (selected, options, placeholder) => {
        if (!selected.length) {
            return <Typography color={'#9fa7a1'} fontSize={'14px'}>{placeholder}</Typography>;
        }
        return selected?.map((value) => {
            const selectedOption = options.find((option) => option.value === value);
            return selectedOption ? selectedOption.label : '';
        }).join(', ');
    }

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
                                // inputProps={{ min: '1' }}
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }}
                            />
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Job Type
                            </Typography>
                            <Select
                                fullWidth
                                name='jobType'
                                multiple={true}
                                displayEmpty
                                value={formData.jobType}
                                onChange={handleFormInput}
                                input={<OutlinedInput />}
                                renderValue={(selected) => renderMultipleValues(selected, employmentTypeOptions, 'Select')}
                                MenuProps={MenuProps}
                                sx={{ height: '40px' }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {employmentTypeOptions.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        <Checkbox checked={formData.jobType?.some(
                                            (item) => item === type.value
                                        )} />
                                        <ListItemText primary={type.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Work Type
                            </Typography>
                            <Select
                                fullWidth
                                name='workType'
                                multiple={true}
                                displayEmpty
                                value={formData.workType}
                                onChange={handleFormInput}
                                input={<OutlinedInput />}
                                renderValue={(selected) => renderMultipleValues(selected, workPreferenceOptions, 'Select')}
                                MenuProps={MenuProps}
                                sx={{ height: '40px' }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {workPreferenceOptions.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        <Checkbox checked={formData.workType?.some(
                                            (item) => item === type.value
                                        )} />
                                        <ListItemText primary={type.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Sort By
                            </Typography>
                            <Select
                                fullWidth
                                name='sortBy'
                                displayEmpty
                                value={formData.sortBy}
                                onChange={handleFormInput}
                                input={<OutlinedInput />}
                                renderValue={(selected) => renderValue(selected, sortByOptions, 'Select')}
                                MenuProps={MenuProps}
                                sx={{ height: '40px' }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {sortByOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Date Posted
                            </Typography>
                            <Select
                                fullWidth
                                name='datePosted'
                                displayEmpty
                                value={formData.datePosted}
                                onChange={handleFormInput}
                                input={<OutlinedInput />}
                                renderValue={(selected) => renderValue(selected, datePostedOptions, 'Select')}
                                MenuProps={MenuProps}
                                sx={{ height: '40px' }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {datePostedOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
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
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'} marginTop={'2rem'}>
                        <ResumesDisplayCard />
                    </Grid>
                </Grid>
                <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'} width={'28rem'}>
                    {showSuccessMessage && (
                        <Typography variant="body1" color="primary">
                            Job search filters added successfully!{' '}
                            <Link to="/jobs" style={{ textDecoration: 'underline', color: '#55B982' }}>
                                Go to Jobs Page
                            </Link>
                        </Typography>
                    )}
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryGreenButton sx={{ marginTop: '1rem', width: '20rem' }} onClick={handleGetJobs} disabled={disableStatus} >
                            Get Jobs
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JobSearchFilter;
