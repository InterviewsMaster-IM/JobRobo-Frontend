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
import { useDeleteCoverLetterMutation, useDeleteResumeMutation, useGetUploadedFilesQuery, useUploadCoverLetterMutation, useUploadResumeMutation } from '../../api/resumesApi';

//start parsing the resume after uploading
const startParseResumeTask = (resumeId) => {
    return apiService.post('resumes/start-task/', { resume_id: resumeId });
};

// Function to check the status of a resume parsing task
const checkParseResumeTaskStatus = (taskId) => {
    return apiService.get(`resumes/check-task/${taskId}/`);
};

const ResumeUpload = ({ handleNext }) => {

    const { data: uploadedFiles, isLoading: getFilesLoading, isSuccess: getFilesSuccess, isError: getFilesError } = useGetUploadedFilesQuery();
    const resume = uploadedFiles?.resume;
    const coverletter = uploadedFiles?.coverletter;

    const [uploadResume, uploadedResumeResponse] = useUploadResumeMutation();
    const [uploadCoverLetter, uploadedCoverLetterResponse] = useUploadCoverLetterMutation();
    const [deleteResume] = useDeleteResumeMutation();
    const [deleteCoverLetter] = useDeleteCoverLetterMutation();

    const { isLoading: isResumeLoading, isError: uploadResumeError, error: uploadResumeErrorMessage } = uploadedResumeResponse;
    const { isLoading: isCoverLetterLoading, isError: uploadCoverLetterError, error: uploadCoverLetterErrorMessage } = uploadedCoverLetterResponse;

    const [inputKeys, setInputKeys] = useState({ resume: 0, coverLetter: 0 });

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
    };

    const handleCoverLetterUpload = async (file) => {
        try {
            const response = await uploadCoverLetter(file);
            console.log('Conver letter uploaded successfully', response);
        } catch (error) {
            console.error('Error uploading Cover letter', error);
        }
    };

    const handleResumeDelete = async () => {
        handleFileRemove('resume');
        try {
            const response = await deleteResume(resume.id);
            console.log('Resume Deleted successfully', response);
        } catch (error) {
            console.error('Error Deleting Resume', error);
        }
    }

    const handleCoverLetterDelete = async () => {
        handleFileRemove('coverLetter');
        try {
            const response = await deleteCoverLetter(coverletter.id);
            console.log('Cover Letter Deleted successfully', response);
        } catch (error) {
            console.error('Error Deleting Cover letter ', error);
        }
    }

    const handleFileRemove = (inputKey) => {
        setInputKeys((prevKeys) => ({
            ...prevKeys,
            [inputKey]: prevKeys[inputKey] + 1,
        }));
    };

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
                                        <PrimaryWhiteButton component="label" disabled={isResumeLoading}>
                                            <FileUploadOutlinedIcon fontSize='medium' />
                                            <Typography variant='body2' fontWeight={'500'}>
                                                {!resume ? 'Upload' : 'Re Upload'}
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
                                {uploadResumeError
                                    &&
                                    <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                                        <CancelIcon fontSize='14px' htmlColor='#ff0000' />
                                        <Typography variant='body2' fontWeight={'500'} color={'#ff0000'} letterSpacing={'0.14px'}>
                                            {uploadResumeErrorMessage?.status}
                                        </Typography>
                                    </Grid>
                                }
                                {
                                    resume
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
                                                    {resume?.filename}
                                                </Typography>
                                                <IconButton aria-label="delete" onClick={handleResumeDelete}>
                                                    <DeleteOutlineOutlinedIcon htmlColor='#001405' />
                                                </IconButton>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                }
                                {
                                    isResumeLoading
                                    &&
                                    <Box textAlign={'center'}>
                                        <Dots color='#55B982' size={'18'} />
                                        <Typography variant='body2' textAlign={'center'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
                                            Uploading
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
                                        <PrimaryWhiteButton component="label" disabled={isCoverLetterLoading}>
                                            <FileUploadOutlinedIcon fontSize='medium' />
                                            <Typography variant='body2' fontWeight={'500'}>
                                                {!coverletter ? 'Upload' : 'Re Upload'}
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
                                {uploadCoverLetterError
                                    &&
                                    <Grid item display={'flex'} alignItems={'center'} gap={'4px'}>
                                        <CancelIcon fontSize='14px' htmlColor='#ff0000' />
                                        <Typography variant='body2' fontWeight={'500'} color={'#ff0000'} letterSpacing={'0.14px'}>
                                            {uploadCoverLetterErrorMessage?.status}
                                        </Typography>
                                    </Grid>
                                }
                                {
                                    coverletter
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
                                                    {coverletter?.filename}
                                                </Typography>
                                                <IconButton aria-label="delete" onClick={handleCoverLetterDelete}>
                                                    <DeleteOutlineOutlinedIcon htmlColor='#001405' />
                                                </IconButton>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                }
                                {
                                    isCoverLetterLoading
                                    &&
                                    <Box textAlign={'center'}>
                                        <Dots color='#55B982' size={'18'} />
                                        <Typography variant='body2' textAlign={'center'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
                                            Uploading
                                        </Typography>
                                    </Box>
                                }
                            </Grid>
                        </Card>
                    </Box>
                    <Box width={'100%'} marginTop={'1.5rem'}>
                        <PrimaryGreenButton sx={{ width: '100%' }} variant='container' disabled={!resume} onClick={handleNext}>
                            Continue
                        </PrimaryGreenButton>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default ResumeUpload;
