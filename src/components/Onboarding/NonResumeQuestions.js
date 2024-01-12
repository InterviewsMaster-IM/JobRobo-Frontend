import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import { PrimaryGreenButton } from '../../styles/Buttons';
import { booleanValues, disabilityStatusOptions, raceOptionsList, salaryCurrencyOptions, veteranStatusOptions, workPreferenceOptions } from '../../utils/Constants';
import { useAddNonResumeOnboardingDetailsMutation } from '../../api/profileApi';
import toast from 'react-hot-toast';
import CustomToast from '../common/CustomToast';

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
    const [addNonResumeOnboardingDetails] = useAddNonResumeOnboardingDetailsMutation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nonResumeFormData = getFormData();
        try {
            const response = await addNonResumeOnboardingDetails(nonResumeFormData);
            if (response?.data?.message === 'successful') {
                handleNext();
            }
        } catch (error) {
            toast.custom(<CustomToast type={"error"} message={error.message} />);
        }
    };

    const getFormData = () => {
        const nonResumeFormData = new FormData();

        Object.entries(formData).map(([key, value]) => {
            nonResumeFormData.append(key, value);
            return null;
        });

        return nonResumeFormData;
    }

    const renderValue = (selected, options) => {
        if (selected === '') {
            return <Typography color={'#7F8781'}>Select an option</Typography>
        }
        else {
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : '';
        }
    };

    const renderMultipleValues = (selected, options) => {
        if (selected.length === 0) {
            return <Typography color={'#7F8781'}>Select</Typography>;
        }
        return selected.map((value) => {
            const selectedOption = options.find((option) => option.value === value);
            return selectedOption ? selectedOption.label : '';
        }).join(', ');
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
                                renderValue={(selected) => renderValue(selected, raceOptionsList)}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {raceOptionsList.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
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
                                renderValue={(selected) => renderValue(selected, veteranStatusOptions)}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {veteranStatusOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
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
                                renderValue={(selected) => renderValue(selected, disabilityStatusOptions)}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {disabilityStatusOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
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
                                renderValue={(selected) => renderValue(selected, salaryCurrencyOptions)}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {salaryCurrencyOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
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
                                renderValue={(selected) => renderValue(selected, booleanValues)}
                                sx={{ height: '44px' }}
                            >
                                {booleanValues.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
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
                                renderValue={(selected) => renderValue(selected, booleanValues)}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {booleanValues.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
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
                                renderValue={(selected) => renderMultipleValues(selected, workPreferenceOptions)}
                                sx={{ height: '44px' }}
                                MenuProps={MenuProps}
                            >
                                {workPreferenceOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Grid>
                    <Box width={'100%'} marginTop={'2rem'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <PrimaryGreenButton sx={{ width: '70%' }} onClick={handleSubmit}>
                            Continue
                        </PrimaryGreenButton>
                    </Box>
                </Card>
            </Box>
        </Container>
    )
}

export default NonResumeQuestions;
