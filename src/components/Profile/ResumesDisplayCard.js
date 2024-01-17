import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { IconButton } from '@mui/material';
import { useGetUploadedFilesQuery, useUploadResumeMutation } from '../../api/resumesApi';
import toast from "react-hot-toast";
import CustomToast from '../common/CustomToast';
import NotificationMessages from '../../utils/notificationConstants';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Dots from "react-activity/dist/Dots";

const ResumesDisplayCard = () => {

    const { data: uploadedFiles } = useGetUploadedFilesQuery();
    const resume = uploadedFiles?.resume;
    const [uploadResume, uploadedResumeResponse] = useUploadResumeMutation();
    const { isLoading: isResumeLoading } = uploadedResumeResponse;

    const handleResumeUpload = async (file) => {
        try {
            const response = await uploadResume(file);
            toast.custom(<CustomToast type={"success"} message={NotificationMessages.RESUME_UPLOAD_SUCCESS} />);
        } catch (error) {
            toast.custom(<CustomToast type={"error"} message={error.message} />);
        }
    };

    const handleUploadResume = (event) => {
        if (event.target.files[0]) {
            handleResumeUpload(event.target.files[0]);
        }
    }

    const handleResumeDownload = async () => {
        window.open(resume?.file, '_blank');
        // try {
        //     const response = await fetch(resume?.file);
        //     const blob = await response.blob();

        //     const downloadLink = document.createElement('a');
        //     downloadLink.href = window.URL.createObjectURL(blob);
        //     downloadLink.download = resume?.filename;
        //     document.body.appendChild(downloadLink);
        //     downloadLink.click();
        //     document.body.removeChild(downloadLink);
        // } catch (error) {
        //     toast.custom(<CustomToast type={"error"} message={error.message} />);
        // }
    }

    return (
        <Box width={'100%'} minWidth={'max-content'}>
            <Card variant='outlined' sx={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 20, 5, 0.10)',
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
                            <PrimaryWhiteButton component="label" >
                                <FileUploadOutlinedIcon fontSize='medium' />
                                <Typography variant='body2' fontWeight={'500'}>
                                    {!resume ? 'Upload' : 'Re Upload'}
                                </Typography>
                                <input
                                    name='resume'
                                    style={{ display: 'none' }}
                                    id="resume-display-card"
                                    accept=".docx, .doc, application/pdf, application/msword, text/plain"
                                    type="file"
                                    onChange={handleUploadResume}
                                />
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    {resume ? (
                        <Grid container item paddingTop={'1rem'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'12px'} borderTop={'1px solid #E5E5E5'}>
                            <Grid item width={'100%'} >
                                <Card variant='outlined' sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    padding: '0px 12px',
                                    borderRadius: '6px',
                                    border: true ? '1px solid #55B982' : '1px solid #E5E5E5', //condition: default resume => true, else => false
                                    background: true ? 'rgba(234, 247, 239, 0.30)' : '#FFF', //condition: default resume => true, else => false
                                }}>
                                    <Typography variant='body2' fontWeight={'500'} paddingTop={'8px'} paddingBottom={'8px'}>
                                        {resume?.filename}
                                    </Typography>
                                    <IconButton
                                        sx={{ backgroundColor: '#FFF', borderRadius: '6px', padding: '0px' }}
                                        onClick={handleResumeDownload}>
                                        <FileDownloadOutlinedIcon htmlColor='#001405' />
                                    </IconButton>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : null}
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
    )
}

export default ResumesDisplayCard;
