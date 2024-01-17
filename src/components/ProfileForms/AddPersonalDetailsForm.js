import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { useUpdatePersonalInfoMutation } from '../../api/personalInfoApi';
import { gender } from '../../utils/Constants';
import toast from "react-hot-toast";
import NotificationMessages from '../../utils/notificationConstants';
import CustomToast from '../common/CustomToast';

const AddPersonalDetailsForm = ({ handleHideForm, personalDetail }) => {
    const [formData, setFormData] = useState({});
    const [updatePersonalInfo, updatePersonalInfoResponse] = useUpdatePersonalInfoMutation();

    useEffect(() => {
        setFormData({
            firstName: personalDetail?.first_name || '',
            lastName: personalDetail?.last_name || '',
            email: personalDetail?.email || '',
            countryCode: personalDetail?.country_code || '',
            phoneNumber: personalDetail?.phone || '',
            dateOfBirth: personalDetail?.dob || '',
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
    }

    useEffect(() => {
        console.log('formData', formData);
    }, [formData]);

    const renderValue = (selected) => {
        if (!selected) {
            return <Typography color={'#7F8781'}>Select</Typography>
        }
        return selected;
    };

    const handleSubmit = async () => {
        try {
        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            country_code: formData.countryCode,
            phone: formData.phoneNumber,
            dob: formData.dateOfBirth,
            gender: formData.gender,
            location: formData.location,
            linkedin: formData.linkedinUrl,
            github: formData.githubUrl,
            portfolio_url: formData.portfolioUrl,
        }
            const response = await updatePersonalInfo(payload);
            toast.custom(<CustomToast type={"success"} message={NotificationMessages.RESUME_UPLOAD_SUCCESS} />);
        } catch (error) {
            toast.custom(<CustomToast type={"error"} message={error.message} />);
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
                <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'32px'}>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Phone number with country code for job applications
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
                    </Grid>
                    <Grid container item rowGap={'8px'} columnGap={'16px'}>
                        <Grid item xs={5.7}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                First name
                            </Typography>
                        </Grid>
                        <Grid item xs={5.7}>
                            <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                Last name
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
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='email'
                            value={formData.email}
                            onChange={handleFormInput}
                            placeholder='Enter your email ID'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
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
                            renderValue={renderValue}
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
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='linkedinUrl'
                            value={formData.linkedinUrl}
                            onChange={handleFormInput}
                            placeholder='Enter your LinkedIn URL'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
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
                    </Grid>
                </Grid>
                <Grid container item padding={'12px 24px'} marginTop={'auto'} borderTop={'1px solid #E5E5E5'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryWhiteButton sx={{ width: '50%', justifyContent: 'center' }} onClick={handleHideForm}>
                            Cancel
                        </PrimaryWhiteButton>
                        <PrimaryGreenButton sx={{ width: '50%' }} onClick={handleSubmit}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddPersonalDetailsForm;
