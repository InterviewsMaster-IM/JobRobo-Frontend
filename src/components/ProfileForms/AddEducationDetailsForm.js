import React, { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { getYears, months } from '../../utils/Constants';

const initialData = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    gpa: ''
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const AddEducationDetailsForm = ({ handleHideForm }) => {

    const [formData, setFormData] = useState(initialData);

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
    }

    const renderValue = ({ selected, placeholder }) => {
        console.log(selected);
        if (selected === '') {
            return <Typography variant='body2' color={'#7F8781'}>{placeholder}</Typography>
        }
        return selected.label;
    }

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
                            School
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='school'
                            value={formData.school}
                            onChange={handleFormInput}
                            placeholder='eg., Michigan State University'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Degree
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='degree'
                            value={formData.degree}
                            onChange={handleFormInput}
                            placeholder="eg., Bachelor's"
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Major/Field of study
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='fieldOfStudy'
                            value={formData.fieldOfStudy}
                            onChange={handleFormInput}
                            placeholder='eg., Mechanical Engineering'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Start
                        </Typography>
                        <Grid container item gap={'16px'}>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='startMonth'
                                    value={formData.startMonth}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, placeholder: 'Month' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        months.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option}
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
                                    value={formData.startYear}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, placeholder: 'Year' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        getYears().map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option}
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
                            End
                        </Typography>
                        <Grid container item gap={'16px'}>
                            <Grid item xs={5.7}>
                                <Select
                                    fullWidth
                                    name='endMonth'
                                    value={formData.endMonth}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, placeholder: 'Month' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        months.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option}
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
                                    value={formData.endYear}
                                    onChange={handleFormInput}
                                    displayEmpty
                                    renderValue={(selected) => renderValue({ selected, placeholder: 'Year' })}
                                    sx={{ height: '40px' }}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        getYears().map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option}
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
                        <OutlinedInput
                            fullWidth
                            name='gpa'
                            value={formData.gpa}
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
                        <PrimaryGreenButton sx={{ width: '50%' }}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddEducationDetailsForm;
