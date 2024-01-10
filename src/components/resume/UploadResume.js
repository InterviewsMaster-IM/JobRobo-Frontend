import React, { useEffect, useState } from 'react';
import apiService from "../../services/apiService";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { useNavigate } from 'react-router-dom';
import { useGetUploadedFilesQuery, useUploadCoverLetterMutation, useUploadResumeMutation } from '../../api/resumesApi';

// Function to upload a file
const uploadResume = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiService.post('resumes/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


// Function to upload a file
const uploadCoverLetter = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiService.post('resumes/coverletter/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


//start parsing the resume after uploading
const startParseResumeTask = (resumeId) => {
    return apiService.post('resumes/start-task/', { resume_id: resumeId });
};

// Function to check the status of a resume parsing task
const checkParseResumeTaskStatus = (taskId) => {
    return apiService.get(`resumes/check-task/${taskId}/`);
};

const ResumeUpload = ({ handleNext }) => {
    const navigate = useNavigate();
    const {data: uploadedFiles} = useGetUploadedFilesQuery();
    const [ uploadResume, uploadResumeResponse ] = useUploadResumeMutation();
    const { isLoading: uploadResumeLoading } = uploadResumeResponse;

    const [ uploadConverLetter, uploadConverLetterResponse ] = useUploadCoverLetterMutation();
    const { isLoading: uploadConverLetterLoading } = uploadResumeResponse;

    const [resumeObject, setResumeObject] = useState(null);
    const [status, setStatus] = useState(null);

    const [coverLetterObject, setCoverLetterObject] = useState(null);

    const [inputKeys, setInputKeys] = useState({ resume: 0, coverLetter: 0 });
    const [errorMsg, setErrorMsg] = useState(null);
    const [errorMsg2, setErrorMsg2] = useState(null);
    const [status2, setStatus2] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            if (event.target.name === 'resume') {
                handleResumeUpload(event.target.files[0]);
            }
            else {
                handleCoverLetterUpload(event.target.files[0]);
            }
        }
    };

    const handleResumeUpload = async (file) => {
        try {
            const response = await uploadResume(file);
            console.log('Resume uploaded successfully', response);
        } catch (error) {
            console.error('Error uploading Resume', error);
        }
        // try {
        //     setStatus("Uploading");
        //     const uploadResponse = await uploadResume(file);
        //     console.log(uploadResponse);
        //     setStatus(null);
        //     setResumeObject(uploadResponse.data);
        //     setErrorMsg(null);

        // } catch (error) {
        //     if (error.response && error.response.status === 400) {
        //         setErrorMsg(error.response.data.error);
        //         setStatus(null);

        //     } else {
        //         setErrorMsg(error.response.data.error);
        //         setStatus(null);

        //     }
        // }
    };


    const handleCoverLetterUpload = async (file) => {
        try {
            const response = await uploadConverLetter(file);
            console.log('Conver letter uploaded successfully', response);
        } catch (error) {
            console.error('Error uploading Cover letter', error);
        }
        // try {
        //     setStatus2("Uploading");
        //     const uploadResponse = await uploadCoverLetter(file);
        //     console.log(uploadResponse);
        //     setStatus2(null);
        //     setCoverLetterObject(uploadResponse.data);
        //     setErrorMsg2(null);

        // } catch (error) {
        //     if (error.response && error.response.status === 400) {
        //         setErrorMsg2(error.response.data.error);
        //         setStatus2(null);

        //     } else {
        //         setErrorMsg2(error.response.data.error);
        //         setStatus2(null);

        //     }
        // }
    };



    const handleResumeDelete = async () => {
        try {
            handleFileRemove('resume');
            const response = await apiService.delete(`resumes/delete/${resumeObject.id}/`);
            console.log(response);
            setResumeObject(null);
        }
        catch (error) {
            console.log(error);
        }
        // setResume(null);
    }

    const handleCoverLetterDelete = async () => {
        handleFileRemove('coverLetter');
        try {
            handleFileRemove('coverLetter');
            const response = await apiService.delete(`resumes/coverletter/delete/${coverLetterObject.id}/`);
            console.log(response);
            setCoverLetterObject(null);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleFileRemove = (inputKey) => {
        setInputKeys((prevKeys) => ({
            ...prevKeys,
            [inputKey]: prevKeys[inputKey] + 1,
        }));
    };

    const handleNextPage = () => {
        navigate('/extension');
    }

    const get_uploads = async () => {
        try {
            const response = await apiService.get('resumes/uploads/');
            console.log(response);
            if (response.data.resume) {
                setResumeObject(response.data.resume);
            }
            if (response.data.coverletter) {
                setCoverLetterObject(response.data.coverletter);
            }
        } catch (error) {
            console.error('Failed to fetch uploads:', error);
        }
    }

    useEffect(() => {
        get_uploads();
    }, [])

    return (
        <Container>
            <Box display={'flex'} justifyContent={'center'}>
                <Card
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '62%', lg: '60%' },
                        padding: { xs: '1rem 1rem', sm: '2rem 3rem' },
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
                    <CardMedia>
                        <DescriptionTwoToneIcon htmlColor='#55B982' sx={{ width: '56px', height: '56px' }} />
                    </CardMedia>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'8px'}>
                        <Typography variant='h5' fontWeight={'600'} textAlign={'center'}>
                            Let's fill your most important details first
                        </Typography>
                        <Typography variant='body2' fontWeight={'500'} color={'#7F8781'} textAlign={'center'}>
                            With JobRobo, you will never have to fill out these details ever again.
                        </Typography>
                    </Box>
                    <Box marginTop={'1.5rem'} width={'100%'}>
                        <Card variant='outlined' sx={{
                            width: '100%',
                            boxSizing: 'border-box',
                            Border: '1px',
                            padding: '1.25rem 1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #55B982',
                            background: 'rgba(234, 247, 239, 0.30)',
                        }}>
                            <Grid container display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
                                <Grid container item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} columnGap={'1rem'} rowGap={'1rem'}>
                                    <Grid item >
                                        <Box display={'flex'} flexDirection={'row'} gap={'4px'}>
                                            <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                                                Resume
                                            </Typography>
                                            <Typography color={'#ff0000'} fontWeight={'600'}>
                                                *
                                            </Typography>
                                        </Box>
                                        <Typography variant='body2' fontWeight={'400'} color={'#7F8781'}>
                                            Max file size 5MB in .pdf, .docx or .txt
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <PrimaryWhiteButton component="label" disabled={(status !== null)}>
                                            <FileUploadOutlinedIcon fontSize='medium' />
                                            <Typography variant='body2' fontWeight={'500'}>
                                                {!resumeObject ? 'Upload' : 'Re Upload'}
                                            </Typography>
                                            <input
                                                name='resume'
                                                key={inputKeys.resume}
                                                style={{ display: 'none' }}
                                                id="contained-button-file"
                                                accept=".docx, .doc, application/pdf, application/msword, text/plain"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        </PrimaryWhiteButton>
                                    </Grid>
                                </Grid>
                                {errorMsg
                                    &&
                                    <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                                        <CancelIcon fontSize='14px' htmlColor='#ff0000' />
                                        <Typography variant='body2' fontWeight={'500'} color={'#ff0000'} letterSpacing={'0.14px'}>
                                            {errorMsg}
                                        </Typography>
                                    </Grid>
                                }

                                {
                                    resumeObject
                                    &&
                                    <Grid container item paddingTop={'0.5rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid rgba(85, 185, 130, 0.30)'}>
                                        <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                                            <CheckCircleIcon fontSize='14px' htmlColor='#55B982' />
                                            <Typography variant='body2' fontWeight={'500'} color={'#55B982'} letterSpacing={'0.14px'}>
                                                resume uploaded
                                            </Typography>
                                        </Grid>
                                        <Grid item width={'100%'} >
                                            <Card variant='outlined' sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                padding: '0px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(85, 185, 130, 0.30)',
                                                background: '#FFF',
                                            }}>
                                                <Typography variant='body2' fontWeight={'500'} paddingTop={'8px'} paddingBottom={'8px'}>
                                                    {resumeObject?.filename}
                                                </Typography>
                                                <IconButton aria-label="delete" onClick={handleResumeDelete}>
                                                    <DeleteOutlineOutlinedIcon htmlColor='#001405' />
                                                </IconButton>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                }
                                {
                                    status === 'Uploading'
                                    &&
                                    <Box textAlign={'center'}>
                                        <Dots color='#55B982' size={'18'} />
                                        <Typography variant='body2' textAlign={'center'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
                                            {status}
                                        </Typography>
                                    </Box>
                                }
                            </Grid>
                        </Card>
                    </Box>
                    <Box marginTop={'1.5rem'} width={'100%'}>
                        <Card variant='outlined' sx={{
                            width: '100%',
                            boxSizing: 'border-box',
                            Border: '1px',
                            padding: '1.25rem 1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #55B982',
                            background: 'rgba(234, 247, 239, 0.30)',
                        }}>
                            <Grid container display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
                                <Grid container item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} columnGap={'1rem'} rowGap={'1rem'}>
                                    <Grid item>
                                        <Box display={'flex'} flexDirection={'row'} gap={'4px'} alignItems={'center'}>
                                            <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                                                Cover Letter
                                            </Typography>
                                            <Typography variant='body2' color={'#7F8781'} fontWeight={'400'}>
                                                (optional)
                                            </Typography>
                                        </Box>
                                        <Typography variant='body2' fontWeight={'400'} color={'#7F8781'}>
                                            Max file size 5MB in .pdf, .docx or .txt
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <PrimaryWhiteButton component="label" disabled={(status !== null)}>
                                            <FileUploadOutlinedIcon fontSize='medium' />
                                            <Typography variant='body2' fontWeight={'500'}>
                                                {!coverLetterObject ? 'Upload' : 'Re Upload'}
                                            </Typography>
                                            <input
                                                name='coverLetter'
                                                key={inputKeys.coverLetter}
                                                style={{ display: 'none' }}
                                                id="contained-button-file"
                                                accept=".docx, .doc, application/pdf, application/msword, text/plain"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        </PrimaryWhiteButton>
                                    </Grid>
                                </Grid>
                                {errorMsg2
                                    &&
                                    <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                                        <CancelIcon fontSize='14px' htmlColor='#ff0000' />
                                        <Typography variant='body2' fontWeight={'500'} color={'#ff0000'} letterSpacing={'0.14px'}>
                                            {errorMsg2}
                                        </Typography>
                                    </Grid>
                                }
                                {
                                    coverLetterObject
                                    &&
                                    <Grid container item paddingTop={'0.5rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid rgba(85, 185, 130, 0.30)'}>
                                        <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                                            <CheckCircleIcon fontSize='14px' htmlColor='#55B982' />
                                            <Typography variant='body2' fontWeight={'500'} color={'#55B982'} letterSpacing={'0.14px'}>
                                                Cover letter uploaded
                                            </Typography>
                                        </Grid>
                                        <Grid item width={'100%'} >
                                            <Card variant='outlined' sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                padding: '0px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(85, 185, 130, 0.30)',
                                                background: '#FFF',
                                            }}>
                                                <Typography variant='body2' fontWeight={'500'} paddingTop={'8px'} paddingBottom={'8px'}>
                                                    {coverLetterObject?.filename}
                                                </Typography>
                                                <IconButton aria-label="delete" onClick={handleCoverLetterDelete}>
                                                    <DeleteOutlineOutlinedIcon htmlColor='#001405' />
                                                </IconButton>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                }
                                {
                                    status2 === 'Uploading'
                                    &&
                                    <Box textAlign={'center'}>
                                        <Dots color='#55B982' size={'18'} />
                                        <Typography variant='body2' textAlign={'center'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
                                            {status2}
                                        </Typography>
                                    </Box>
                                }
                            </Grid>
                        </Card>
                    </Box>
                    <Box width={'100%'} marginTop={'1.5rem'}>
                        <PrimaryGreenButton sx={{ width: '100%' }} variant='container' disabled={!resumeObject} onClick={handleNext}>
                            Continue
                        </PrimaryGreenButton>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default ResumeUpload;
