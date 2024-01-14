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
import { nonResumeQuestionsData } from '../../utils/Constants';
import { useAddNonResumeOnboardingDetailsMutation, useGetNonResumeOnboardingDetailsQuery } from '../../api/profileApi';
import toast from 'react-hot-toast';
import CustomToast from '../common/CustomToast';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240,
        },
    },
};

const generateInitialFormData = () => {
    return nonResumeQuestionsData.reduce((data, question) => {
        if (question.isMulti) {
            data[question.name] = [];
        } else {
            data[question.name] = '';
        }
        return data;
    }, {});
};

const NonResumeQuestions = ({ handleNext }) => {

    const { data: onboardingDetailsData, isFetching: onboardingDetailsDataFetching, isSuccess: onboardingDetailsDataSuccess, refetch: fetchNonResumeOnboardingDetails } = useGetNonResumeOnboardingDetailsQuery();
    const [addNonResumeOnboardingDetails] = useAddNonResumeOnboardingDetailsMutation();
    const [formData, setFormData] = useState(() => generateInitialFormData());
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [questionErrorStates, setQuestionErrorStates] = useState({});

    useEffect(() => {
        fetchNonResumeOnboardingDetails();
    }, [])

    useEffect(() => {
        if (onboardingDetailsDataSuccess) {
            const parsedData = {};
            for (const key in onboardingDetailsData) {
                try {
                    parsedData[key] = JSON.parse(onboardingDetailsData[key]);
                } catch (error) {
                    parsedData[key] = onboardingDetailsData[key];
                }
            }
            setFormData(parsedData);
        }
    }, [onboardingDetailsDataFetching])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nonResumeFormData = getFormData();
        const errorStatus = getErrorStatus();
        if (!errorStatus) {
            setShowErrorMsg(false);
            try {
                const response = await addNonResumeOnboardingDetails(nonResumeFormData);
                if (response?.data?.message === 'successful') {
                    handleNext();
                }
            } catch (error) {
                toast.custom(<CustomToast type={"error"} message={error.message} />);
            }
        }
        else {
            setShowErrorMsg(true);
        }
    };

    const getErrorStatus = () => {
        let errorStatus = false;
        let errorStates = {};
        nonResumeQuestionsData.forEach((question) => {
            const value = formData[question.name];
            if ((value === '' || value?.length === 0) && question.isRequired) {
                errorStatus = true;
                errorStates = { ...errorStates, [question.name]: true };
            }
        });
        setQuestionErrorStates(errorStates);
        return errorStatus;
    }

    const getFormData = () => {
        const nonResumeFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                nonResumeFormData.append(key, JSON.stringify(value));

            } else {
                nonResumeFormData.append(key, value);
            }
        });

        return nonResumeFormData;
    }

    const renderValue = (selected, options, placeholder) => {
        if (selected === '') {
            return <Typography color={'#7F8781'}>{placeholder}</Typography>
        }
        else {
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : '';
        }
    };

    const renderMultipleValues = (selected, options, placeholder) => {
        if (selected.length === 0) {
            return <Typography color={'#7F8781'}>{placeholder}</Typography>;
        }
        return selected?.map((value) => {
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
                        {
                            nonResumeQuestionsData.map((question, index) => {
                                switch (question.type) {
                                    case "INPUT":
                                        return (
                                            <Box key={index} width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                                                <Typography fontWeight={'600'}>
                                                    {question.questionLabel}
                                                    <Typography color="#ff0000" fontWeight={'600'} display={'inline'}>{question.isRequired && ' *'}</Typography>
                                                </Typography>
                                                <OutlinedInput
                                                    fullWidth
                                                    required={question.isRequired}
                                                    name={question.name}
                                                    value={formData[question.name]}
                                                    onChange={handleChange}
                                                    type='number'
                                                    placeholder={question.placeholder}
                                                    sx={{ height: '44px' }} />
                                                <Typography variant='body2' marginLeft={'4px'} fontSize={'14px'} color="#ff0000" >
                                                    {showErrorMsg && questionErrorStates[question.name] && question?.errorMessage}
                                                </Typography>
                                            </Box>
                                        )
                                    case "DROPDOWN":
                                        return (
                                            <Box key={index} width={'100%'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                                                <Typography fontWeight={'600'}>
                                                    {question.questionLabel}
                                                    <Typography color="#ff0000" fontWeight={'600'} display={'inline'}>{question.isRequired && ' *'}</Typography>
                                                </Typography>
                                                <Select
                                                    fullWidth
                                                    required={question.isRequired}
                                                    name={question.name}
                                                    multiple={question?.isMulti}
                                                    value={formData[question.name]}
                                                    onChange={handleChange}
                                                    displayEmpty
                                                    renderValue={(selected) => question?.isMulti ? renderMultipleValues(selected, question.options, question.placeholder) : renderValue(selected, question.options, question.placeholder)}
                                                    sx={{ height: '44px' }}
                                                    MenuProps={MenuProps}
                                                >
                                                    {question.options.map((option) => (
                                                        <MenuItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                <Typography variant='body2' marginLeft={'4px'} fontSize={'14px'} color="#ff0000" >
                                                    {showErrorMsg && questionErrorStates[question.name] && question?.errorMessage}
                                                </Typography>
                                            </Box>
                                        )
                                    default:
                                        return null;
                                }
                            })
                        }
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
