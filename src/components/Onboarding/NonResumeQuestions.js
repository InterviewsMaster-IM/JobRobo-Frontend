import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { useNavigate } from 'react-router-dom';
import { booleanValues, disabilityStatusOptions, raceOptionsList, veteranStatusOptions, workPreferenceOptions } from '../../utils/Constants';

const initialFormData = {
    race: '',
    noticePeriod: '',
    veteranStatus: '',
    disabilityStatus: '',
    desiredSalary: '',
    desiredSalaryCurrency: '',
    workAuthorizationStatus: '',
    visaSponsorshipStatus: '',
    workPreference: []
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const NonResumeQuestions = ({ handleNext }) => {

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process or submit the form data as needed
        console.log(formData);
    };

    const renderValue = (selected) => {
        console.log(selected);
        if (selected === '') {
            return <Typography color={'#7F8781'}>Select an option</Typography>
        }
        return selected.label;
    };

    const renderMultipleValues = (selected) => {
        console.log(selected);
        if (selected.length === 0) {
            return <Typography color={'#7F8781'}>Select</Typography>;
        }
        return selected.map((obj) => obj.label).join(', ');
    }

    return (
        <Container>
            <Box display={'flex'} justifyContent={'center'}>
                <Card
                    sx={{
                        width: { xs: '100%', sm: '80%' },
                        padding: { xs: '1rem 1rem', sm: '4rem 3rem' },
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#FFF',
                        boxShadow: `0px 1px 2px 0px rgba(85, 185, 130, 0.06), 0px 0px 38px 0px rgba(85, 185, 130, 0.03), 0px 3px 70px 0px rgba(85, 185, 130, 0.02)`,
                        border: `1px solid rgba(0, 20, 5, 0.10)`,
                        borderRadius: '16px',
                    }}>
                    <Grid container width={'70%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} rowGap={'3rem'}>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Race
                            </Typography>
                            <Select
                                fullWidth
                                prop
                                name='race'
                                value={formData.race}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderValue}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {raceOptionsList.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Notice period in days ?
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='noticePeriod'
                                value={formData.noticePeriod}
                                onChange={handleChange}
                                placeholder='Days'
                                sx={{ height: '44px' }}
                            />
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Veteran Status
                            </Typography>
                            <Select
                                fullWidth
                                name='veteranStatus'
                                value={formData.veteranStatus}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderValue}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {veteranStatusOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Disability Status
                            </Typography>
                            <Select
                                fullWidth
                                name='disabilityStatus'
                                value={formData.disabilityStatus}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderValue}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {disabilityStatusOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Desired salary Currency
                            </Typography>
                            <Select
                                fullWidth
                                name='desiredSalaryCurrency'
                                value={formData.desiredSalaryCurrency}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderValue}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value="option 1">option 1</MenuItem>
                                <MenuItem value="option 2">option 2</MenuItem>
                                <MenuItem value="option 3">option 3</MenuItem>
                            </Select>
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Desired salary
                            </Typography>
                            <OutlinedInput
                                fullWidth
                                name='desiredSalary'
                                value={formData.desiredSalary}
                                onChange={handleChange}
                                type='number'
                                placeholder='Number'
                                sx={{ height: '44px' }} />
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)?
                            </Typography>
                            <Select
                                fullWidth
                                name='visaSponsorshipStatus'
                                value={formData.visaSponsorshipStatus}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderValue}
                                sx={{ height: '44px' }}
                            >
                                {booleanValues.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                Are you legally authorized to work in the United States?
                            </Typography>
                            <Select
                                fullWidth
                                name='workAuthorizationStatus'
                                value={formData.workAuthorizationStatus}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderValue}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {booleanValues.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                            <Typography fontWeight={'600'}>
                                What work settings are you comfortable with?
                            </Typography>
                            <Select
                                fullWidth
                                name='workPreference'
                                multiple={true}
                                value={formData.workPreference}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={renderMultipleValues}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {workPreferenceOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Grid>
                    <Box width={'100%'} marginTop={'2rem'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <PrimaryGreenButton sx={{ width: '70%' }} onClick={handleNext}>
                            Continue
                        </PrimaryGreenButton>
                    </Box>
                </Card>
            </Box>
        </Container>
    )
}

export default NonResumeQuestions;
