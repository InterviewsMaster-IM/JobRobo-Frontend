import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { useUpdatePersonalInfoMutation } from '../../api/personalInfoApi';
import { gender, months } from '../../utils/Constants';
import { getDays, getYears, isValidMobileNumber, isValidEmail, isValidDate, isValidLinkedInUrl, isValidGitHubUrl, isValidUrl } from '../../utils/Helpers';
import toast from "react-hot-toast";
import NotificationMessages from '../../utils/notificationConstants';
import CustomToast from '../common/CustomToast';

const daysOptions = getDays();
const yearOptions = getYears();
const monthOptions = months;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const AddPersonalDetailsForm = ({ handleHideForm, personalDetail }) => {
    const [formData, setFormData] = useState({});
    const [updatePersonalInfo, updatePersonalInfoResponse] = useUpdatePersonalInfoMutation();
    const [disableStatus, setDisableStatus] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const [yearPart, monthPart, dayPart] = (personalDetail?.dob || '').split('-');

        setFormData({
            firstName: personalDetail?.first_name || '',
            lastName: personalDetail?.last_name || '',
            email: personalDetail?.email || '',
            countryCode: personalDetail?.country_code || '',
            phoneNumber: personalDetail?.phone || '',
            dateOfBirth: personalDetail?.dob || '',
            day: parseInt(dayPart) || '',
            month: monthPart || '',
            year: parseInt(yearPart) || '',
            gender: personalDetail?.gender || '',
            location: personalDetail?.location || '',
            linkedinUrl: personalDetail?.linkedin || '',
            githubUrl: personalDetail?.github || '',
            portfolioUrl: personalDetail?.portfolio_url || '',
        });
    }, [personalDetail]);

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
        setErrors((errors) => ({
            ...errors,
            [name]: ''
        }));
    }

    const renderValue = (selected, options, placeholder) => {
        if (!selected) {
            return <Typography color={'#7F8781'}>{placeholder}</Typography>
        }
        else {
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : '';
        }
    };

    const renderValueObject = (selected) => {
        if (!selected) {
            return <Typography color={'#7F8781'}>Select</Typography>
        }
        return selected;
    };

    const getDisableStatus = () => {
        const ignoreKeys = ["gender", "githubUrl", "portfolioUrl", "dateOfBirth"];
        const disableStatus = Object.entries(formData).some(([key, value]) => {
            return (!value && !ignoreKeys.includes(key));
        });
        setDisableStatus(disableStatus);
    }

    useEffect(() => {
        getDisableStatus();
    }, [formData]);

    const handleSubmit = async () => {

        const validationErrors = {};

        if (!isValidMobileNumber(formData.phoneNumber)) {
            validationErrors.phoneNumber = 'Mobile number must be 10 digits';
        }

        if (!isValidEmail(formData.email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        const { day, month, year } = formData;
        if (!isValidDate(day, month, year)) {
            validationErrors.dateOfBirth = 'Please select valid date of birth';
        }

        if (!isValidLinkedInUrl(formData.linkedinUrl)) {
            validationErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
        }

        if (formData.githubUrl && (!isValidGitHubUrl(formData.githubUrl))) {
            validationErrors.githubUrl = 'Please enter a valid GitHub URL';
        }

        if (formData.portfolioUrl && (!isValidUrl(formData.portfolioUrl))) {
            validationErrors.portfolioUrl = 'Please enter a valid URL format';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const formattedDay = day < 10 ? `0${day}` : `${day}`;
            const dateOfBirth = `${year}-${month}-${formattedDay}`;

            const payload = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                country_code: formData.countryCode,
                phone: formData.phoneNumber,
                dob: dateOfBirth,
                gender: formData.gender,
                location: formData.location,
                linkedin: formData.linkedinUrl,
                github: formData.githubUrl,
                portfolio_url: formData.portfolioUrl,
            }
            try {
                const response = await updatePersonalInfo(payload).unwrap();
                handleHideForm();
                toast.custom(<CustomToast type={"success"} message={NotificationMessages.PERSONAL_DETAILS_ADDED_SUCCESS} />);
            } catch (error) {
                if (error?.data?.error) {
                    toast.custom(<CustomToast type={"error"} message={error?.data?.error} />);
                } else {
                    // const errorMsg = Object.entries(error.data || {}).map(([key, value]) => value[0]).join(" ");
                    const errorMsg = Object.values(error?.data || {})[0][0];
                    toast.custom(<CustomToast type={"error"} message={errorMsg} />);
                }
            }
        } catch (error) {
            toast.custom(<CustomToast type={"error"} message={error} />);
        }
    }

    return (
        <Box width={'26rem'} height={'100%'}>
            <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'}>
                <Grid item padding={'24px 24px 8px'}>
                    <Typography variant='h6' fontWeight={'600'}>
                        Personal Information
                    </Typography>
                </Grid>
                <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'16px'}>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Phone number with country code for job applications
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <Grid container item columnGap={'16px'}>
                            <Grid item xs={3}>
                                <OutlinedInput
                                    fullWidth
                                    name='countryCode'
                                    value={formData.countryCode}
                                    onChange={handleFormInput}
                                    placeholder='+1'
                                    sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                            </Grid>
                            <Grid item xs={8.4}>
                                <OutlinedInput
                                    fullWidth
                                    name='phoneNumber'
                                    value={formData.phoneNumber}
                                    onChange={handleFormInput}
                                    placeholder='Enter your phone number'
                                    sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                            </Grid>
                        </Grid>
                        {errors.phoneNumber && (
                            <Typography variant="caption" color="#ff0000">
                                {errors.phoneNumber}
                            </Typography>
                        )}
                    </Grid>
                    <Grid container item rowGap={'8px'} columnGap={'16px'}>
                        <Grid item xs={5.7}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                First name
                                <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={5.7}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Last name
                                <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={5.7}>
                            <OutlinedInput
                                fullWidth
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleFormInput}
                                placeholder='Enter your first name'
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        </Grid>
                        <Grid item xs={5.7}>
                            <OutlinedInput
                                fullWidth
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleFormInput}
                                placeholder='Enter your last name'
                                sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        </Grid>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Email ID for job applications
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='email'
                            value={formData.email}
                            onChange={handleFormInput}
                            placeholder='Enter your email ID'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        {errors.email && (
                            <Typography variant="caption" color="#ff0000">
                                {errors.email}
                            </Typography>
                        )}
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Date of birth
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <Grid container item gap={'16px'}>
                            <Grid item xs={3.6}>
                                <Select
                                    fullWidth
                                    name='day'
                                    value={formData?.day || ''}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue(selected, daysOptions, 'Day')}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        daysOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={3.7}>
                                <Select
                                    fullWidth
                                    name="month"
                                    value={formData?.month || ''}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue(selected, monthOptions, 'Month')}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        monthOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Select
                                    fullWidth
                                    name="year"
                                    value={formData?.year || ''}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue(selected, yearOptions, 'Year')}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        yearOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        {errors.dateOfBirth && (
                            <Typography variant="caption" color="#ff0000">
                                {errors.dateOfBirth}
                            </Typography>
                        )}
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Gender
                        </Typography>
                        <Select
                            fullWidth
                            name='gender'
                            value={formData?.gender || ''}
                            onChange={handleFormInput}
                            displayEmpty
                            renderValue={renderValueObject}
                            sx={{ height: '40px' }}
                        >
                            {Object.keys(gender).map((key) => (
                                <MenuItem
                                    key={key}
                                    value={gender[key]}
                                >
                                    {gender[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Location
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='location'
                            value={formData.location}
                            onChange={handleFormInput}
                            placeholder='Enter location'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            LinkedIn URL
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='linkedinUrl'
                            value={formData.linkedinUrl}
                            onChange={handleFormInput}
                            placeholder='Enter your LinkedIn URL'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        {errors.linkedinUrl && (
                            <Typography variant="caption" color="#ff0000">
                                {errors.linkedinUrl}
                            </Typography>
                        )}
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            GitHub URL
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='githubUrl'
                            value={formData.githubUrl}
                            onChange={handleFormInput}
                            placeholder='Enter your GitHub URL'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        {errors.githubUrl && (
                            <Typography variant="caption" color="#ff0000">
                                {errors.githubUrl}
                            </Typography>
                        )}
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Portfolio/Other URL
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='portfolioUrl'
                            value={formData.portfolioUrl}
                            onChange={handleFormInput}
                            placeholder='Enter your Portfolio/Other URL'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        {errors.portfolioUrl && (
                            <Typography variant="caption" color="#ff0000">
                                {errors.portfolioUrl}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Grid container item padding={'12px 24px'} marginTop={'auto'} borderTop={'1px solid #E5E5E5'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryWhiteButton sx={{ width: '50%', justifyContent: 'center' }} onClick={handleHideForm}>
                            Cancel
                        </PrimaryWhiteButton>
                        <PrimaryGreenButton sx={{ width: '50%' }} disabled={disableStatus} onClick={handleSubmit}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddPersonalDetailsForm;
