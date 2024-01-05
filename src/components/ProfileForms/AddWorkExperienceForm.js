import React, { useState } from 'react';
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
import { employmentTypeOptions, getYears, months } from '../../utils/Constants';

const initialData = {
    positionTitle: '',
    companyName: '',
    employmentType: '',
    currentRole: false,
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

const AddWorkExperienceForm = ({ handleHideForm }) => {

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
                        Add work experience
                    </Typography>
                </Grid>
                <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'32px'}>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Position title
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='positionTitle'
                            value={formData.positionTitle}
                            onChange={handleFormInput}
                            placeholder='eg., Sales associate'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Company name
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='companyName'
                            value={formData.companyName}
                            onChange={handleFormInput}
                            placeholder='eg., Google'
                            sx={{ height: '40px', fontSize: '14px', fontWeight: '500' }} />
                    </Grid>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                            Employment type
                        </Typography>
                        <Select
                            fullWidth
                            name='employmentType'
                            value={formData.employmentType}
                            onChange={handleFormInput}
                            displayEmpty
                            renderValue={(selected) => renderValue({ selected, placeholder: 'Choose an employment type' })}
                            sx={{ height: '40px' }}
                            MenuProps={MenuProps}
                        >
                            {
                                employmentTypeOptions.map((option) => (
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
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <FormControlLabel control={<Checkbox color='customGreen' size='small' />} label={<Typography fontSize={'14px'}>This is my current role</Typography>} />
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
                        <PrimaryGreenButton sx={{ width: '50%' }}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddWorkExperienceForm;
