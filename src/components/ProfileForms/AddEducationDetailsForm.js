import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { ActionType, getYears, months } from '../../utils/Constants';
import { useAddEducationDetailsMutation, useGetEducationDetailByIdQuery, useUpdateEducationDetailsMutation } from '../../api/educationApi';
import NotificationMessages from '../../utils/notificationConstants';
import CustomToast from '../common/CustomToast';
import toast from "react-hot-toast";

const initialData = {
    school: '',
    degree: '',
    major_field_of_study: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    description: ''
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const AddEducationDetailsForm = ({ actionType, handleHideForm, id }) => {

    const [formData, setFormData] = useState(initialData);
    const [addEducationDetails] = useAddEducationDetailsMutation();
    const [updateEducationDetails] = useUpdateEducationDetailsMutation();
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [questionErrorStates, setQuestionErrorStates] = useState({});

    const { data: educationDetails, isFetching: educationDetailsFetching, refetch: fetchEducationDetailById } = useGetEducationDetailByIdQuery(id, { skip: !id });
    const years = getYears();

    useEffect(() => {
        if (id) {
            fetchEducationDetailById();
        }
    }, [id]);

    useEffect(() => {
        setFormData({
            school: educationDetails?.school || '',
            degree: educationDetails?.degree || '',
            major_field_of_study: educationDetails?.major_field_of_study || '',
            startMonth: educationDetails?.start_month_year?.split('-')[1] || '',
            startYear: parseInt(educationDetails?.start_month_year?.split('-')[0]) || '',
            endMonth: educationDetails?.end_month_year?.split('-')[1] || '',
            endYear: parseInt(educationDetails?.end_month_year?.split('-')[0]) || '',
            description: educationDetails?.description || ''
        })
    }, [educationDetailsFetching])


    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
    }

    const handleFormSubmit = async () => {
        const formattedData = {
            school: formData.school,
            degree: formData.degree,
            major_field_of_study: formData.major_field_of_study,
            start_month_year: `${formData.startYear}-${formData.startMonth}-01`,
            end_month_year: `${formData.endYear}-${formData.endMonth}-01`,
            description: formData.description,
        }
        const errorStatus = getErrorStatus();

        if (errorStatus) {
            setShowErrorMsg(true);
        }
        else {
            setShowErrorMsg(false);

            if (actionType === ActionType.ADD) {
                try {
                    const response = await addEducationDetails(formattedData);
                    if (response.data) {
                        handleHideForm();
                        toast.custom(<CustomToast type={"success"} message={NotificationMessages.EDUCATION_DETAILS_ADDED_SUCCESS} />);
                    }
                } catch (error) {
                    toast.custom(<CustomToast type={"error"} message={error.message} />);
                }
            } else {
                try {
                    const response = await updateEducationDetails({ id, payload: formattedData });
                    if (response.data) {
                        handleHideForm();
                        toast.custom(<CustomToast type={"success"} message={NotificationMessages.EDUCATION_DETAILS_UPDATED_SUCCESS} />);
                    }
                } catch (error) {
                    toast.custom(<CustomToast type={"error"} message={error.message} />);
                }
            }
        }
    };

    const getErrorStatus = () => {
        let errorStatus = false;
        let errorStates = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (value === '' && key !== 'description') {
                errorStatus = true;
                errorStates = { ...errorStates, [key]: true };
            }
        });
        setQuestionErrorStates(errorStates);
        return errorStatus;
    }

    const renderValue = ({ selected, options, placeholder }) => {
        if (selected === '') {
            return <Typography color={'#7F8781'}>{placeholder}</Typography>
        }
        else {
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : '';
        }
    };

    return (
        <Box width={'26rem'} height={'100%'}>
            <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'}>
                <Grid item padding={'24px 24px 8px'}>
                    <Typography variant='h6' fontWeight={'600'}>
                        Add education
                    </Typography>
                </Grid>
                <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'32px'}>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            School/College
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='school'
                            value={formData.school}
                            onChange={handleFormInput}
                            placeholder='eg., Michigan State University'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                            {showErrorMsg && questionErrorStates?.school && 'School cannot be empty.'}
                        </Typography>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Degree
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='degree'
                            value={formData.degree}
                            onChange={handleFormInput}
                            placeholder="eg., Bachelor's"
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                            {showErrorMsg && questionErrorStates?.degree && 'Degree cannot be empty.'}
                        </Typography>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Major/Field of study
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='major_field_of_study'
                            value={formData.major_field_of_study}
                            onChange={handleFormInput}
                            placeholder='eg., Mechanical Engineering'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                        <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                            {showErrorMsg && questionErrorStates?.major_field_of_study && 'Field of study cannot be empty.'}
                        </Typography>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Start Date
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <Grid container item gap={'16px'}>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='startMonth'
                                    value={formData.startMonth}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, options: months, placeholder: 'Month' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        months.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                                    {showErrorMsg && questionErrorStates?.startMonth && 'Select one'}
                                </Typography>
                            </Grid>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='startYear'
                                    value={formData.startYear}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, options: years, placeholder: 'Year' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        years?.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                                    {showErrorMsg && questionErrorStates?.startYear && 'Select one'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            End Date
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <Grid container item gap={'16px'}>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='endMonth'
                                    value={formData.endMonth}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, options: months, placeholder: 'Month' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        months.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                                    {showErrorMsg && questionErrorStates?.endMonth && 'Select one.'}
                                </Typography>
                            </Grid>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='endYear'
                                    value={formData.endYear}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, options: years, placeholder: 'Year' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        getYears(formData.startYear)?.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Typography variant='body2' marginLeft={'4px'} fontSize={'12px'} color="#ff0000" >
                                    {showErrorMsg && questionErrorStates?.endYear && 'Select one.'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            GPA
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='description'
                            value={formData.description}
                            onChange={handleFormInput}
                            placeholder='eg., 6.8'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                </Grid>
                <Grid container item padding={'12px 24px'} marginTop={'auto'} borderTop={'1px solid #E5E5E5'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryWhiteButton sx={{ width: '50%', justifyContent: 'center' }} onClick={() => handleHideForm()}>
                            Cancel
                        </PrimaryWhiteButton>
                        <PrimaryGreenButton sx={{ width: '50%' }} onClick={() => handleFormSubmit()}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddEducationDetailsForm;
