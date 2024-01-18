import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { ActionType, employmentTypeOptions, months } from '../../utils/Constants';
import { useAddWorkExperienceMutation, useGetWorkExperienceByIdQuery, useUpdateWorkExperienceMutation } from '../../api/workExperienceApi';
import NotificationMessages from '../../utils/notificationConstants';
import CustomToast from '../common/CustomToast';
import toast from "react-hot-toast";
import { getYears } from '../../utils/Helpers';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const AddWorkExperienceForm = ({ actionType, handleHideForm, id }) => {

    const [formData, setFormData] = useState({});
    const [addWorkExperience] = useAddWorkExperienceMutation();
    const [updateWorkExperience] = useUpdateWorkExperienceMutation();
    const [disableStatus, setDisableStatus] = useState(true);

    const { data: workExperienceDetail, isFetching: workExperienceDetailFetching, refetch: fetchWorkExperienceById } = useGetWorkExperienceByIdQuery(id, { skip: !id });

    const years = getYears();

    useEffect(() => {
        if (id) {
            fetchWorkExperienceById();
        }
    }, [id]);

    useEffect(() => {
        setFormData({
            position_title: workExperienceDetail?.position_title || '',
            company_name: workExperienceDetail?.company_name || '',
            employment_type: workExperienceDetail?.employment_type || '',
            current_role: workExperienceDetail?.current_role || false,
            startMonth: workExperienceDetail?.start_month_year?.split('-')[1] || '',
            startYear: parseInt(workExperienceDetail?.start_month_year?.split('-')[0]) || '',
            endMonth: workExperienceDetail?.end_month_year?.split('-')[1] || '',
            endYear: parseInt(workExperienceDetail?.end_month_year?.split('-')[0]) || '',
            description: workExperienceDetail?.description || ''
        })
    }, [workExperienceDetailFetching])

    const handleFormInput = (e) => {
        const { name } = e.target;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
    }

    const handleFormSubmit = async () => {
        const formattedData = {
            position_title: formData.position_title,
            company_name: formData.company_name,
            employment_type: formData.employment_type,
            current_role: formData.current_role,
            start_month_year: `${formData.startYear}-${formData.startMonth}-01`,
            ...(formData.current_role ? {} : { end_month_year: `${formData.endYear}-${formData.endMonth}-01` }),
            description: formData.description,
        }

        if (actionType === ActionType.ADD) {
            try {
                const response = await addWorkExperience(formattedData).unwrap();
                handleHideForm();
                toast.custom(<CustomToast type={"success"} message={NotificationMessages.WORK_EXPERIENCE_ADDED_SUCCESS} />);
            } catch (error) {
                if (error?.data?.error) {
                    toast.custom(<CustomToast type={"error"} message={error?.data?.error} />);
                } else {
                    const errorMsg = Object.values(error?.data || {})[0][0];
                    toast.custom(<CustomToast type={"error"} message={errorMsg} />);
                }
            }
        } else {
            try {
                const response = await updateWorkExperience({ id, payload: formattedData }).unwrap();
                handleHideForm();
                toast.custom(<CustomToast type={"success"} message={NotificationMessages.WORK_EXPERIENCE_UPDATED_SUCCESS} />);
            } catch (error) {
                if (error?.data?.error) {
                    toast.custom(<CustomToast type={"error"} message={error?.data?.error} />);
                } else {
                    const errorMsg = Object.values(error?.data || {})[0][0];
                    toast.custom(<CustomToast type={"error"} message={errorMsg} />);
                }
            }
        }
    };

    const getDisableStatus = () => {
        const ignoreKeys = ["description", "current_role"];
        if (formData.current_role) {
            ignoreKeys.push('endMonth', 'endYear');
        }
        const disableStatus = Object.entries(formData).some(([key, value]) => {
            return !value && !ignoreKeys.includes(key);
        });
        setDisableStatus(disableStatus);
    }

    useEffect(() => {
        getDisableStatus();
    }, [formData]);

    const renderValue = ({ selected, options, placeholder }) => {
        if (!selected) {
            return <Typography fontSize={'14px'} color={'rgba(0, 0, 0, 0.4)'}>{placeholder}</Typography>
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
                        Add work experience
                    </Typography>
                </Grid>
                <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'32px'}>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Position title
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='position_title'
                            value={formData.position_title}
                            onChange={handleFormInput}
                            placeholder='eg., Sales associate'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Company name
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='company_name'
                            value={formData.company_name}
                            onChange={handleFormInput}
                            placeholder='eg., Google'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Employment type
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <Select
                            fullWidth
                            name='employment_type'
                            value={formData?.employment_type || ''}
                            onChange={handleFormInput}
                            displayEmpty
                            renderValue={(selected) => renderValue({ selected, options: employmentTypeOptions, placeholder: 'Choose an employment type' })}
                            sx={{ height: '40px' }}
                            MenuProps={MenuProps}
                        >
                            {
                                employmentTypeOptions.map((option) => (
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
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <FormControlLabel sx={{ margin: '0px' }} control={<Checkbox name='current_role' checked={!!formData?.current_role} sx={{ padding: '0', marginRight: '4px' }} color='customGreen' size='small' onClick={handleFormInput} />} label={<Typography fontSize={'12px'}>
                            This is my current role
                        </Typography>} />
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
                                    value={formData?.startMonth || ''}
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
                            </Grid>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='startYear'
                                    value={formData?.startYear || ''}
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
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}
                        sx={{
                            opacity: formData.current_role ? 0.4 : 1,
                            pointerEvents: formData.current_role ? 'none' : 'auto'
                        }}
                    >
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            End Date
                            <Typography color="#ff0000" fontWeight={'600'} display={'inline'}> *</Typography>
                        </Typography>
                        <Grid container item gap={'16px'}>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='endMonth'
                                    value={formData?.endMonth || ''}
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
                            </Grid>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='endYear'
                                    value={formData?.endYear || ''}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, options: years, placeholder: 'Year' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        getYears(formData?.startYear)?.map((option) => (
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
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Description
                        </Typography>
                        <TextField
                            fullWidth
                            name='description'
                            value={formData.description}
                            onChange={handleFormInput}
                            InputProps={{
                                sx: {
                                    fontSize: '14px'
                                }
                            }}
                            placeholder="Share your work experience details here"
                            multiline
                            rows={5}
                        />
                    </Grid>
                </Grid>
                <Grid container item padding={'12px 24px'} marginTop={'auto'} borderTop={'1px solid #E5E5E5'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryWhiteButton sx={{ width: '50%', justifyContent: 'center' }} onClick={() => handleHideForm()}>
                            Cancel
                        </PrimaryWhiteButton>
                        <PrimaryGreenButton sx={{ width: '50%' }} disabled={disableStatus} onClick={() => handleFormSubmit()}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddWorkExperienceForm;
