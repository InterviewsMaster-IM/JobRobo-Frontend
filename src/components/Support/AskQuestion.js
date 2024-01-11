import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import { image_validate } from '../../utils/Helpers';
import ImageIcon from '@mui/icons-material/Image';

const AskQuestion = ({ handleSupportModalClose }) => {

    const [question, setQuestion] = useState('');
    const [isBlocker, setIsBlocker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const handleImageUpload = (e) => {
        const images = Array.from(e.target.files);
        const allSelectedImages = [...selectedImages, ...images];

        const errorMessage = image_validate(images, allSelectedImages);
        setErrorMsg(errorMessage);

        if (errorMessage === '') {
            setSelectedImages([...selectedImages, ...images]);
        }
    }

    const handleChange = (e) => {
        setQuestion(e.target.value);
    }

    const handleRemoveImage = (indexToRemove) => {
        const updatedImageList = selectedImages.filter((image, index) => index !== indexToRemove);
        setSelectedImages(updatedImageList);
    }

    return (
        <Grid container height={'100%'} display={'flex'} justifyContent={'space-between'}>
            <Grid container item padding={'12px 24px'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Grid container item display={'flex'} flexDirection={'column'} gap={'8px'}>
                    <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                        What is your question?
                    </Typography>
                    <TextField
                        fullWidth
                        name='question'
                        value={question}
                        onChange={handleChange}
                        InputProps={{
                            sx: {
                                fontSize: '14px'
                            }
                        }}
                        placeholder="I am not sure how to...&#10;Do attach images below. It helps us answer your questions faster!"
                        multiline
                        required
                        rows={6}
                    />
                </Grid>
                <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                    <FormControlLabel sx={{ margin: '0px' }} control={<Checkbox value={isBlocker} sx={{ padding: '0', marginRight: '4px' }} color='customGreen' size='small' onClick={(e) => setIsBlocker(e.target.checked)} />} label={<Typography fontSize={'12px'} color={'#7F8781'}>
                        This is preventing me from using JobRobo
                    </Typography>} />
                </Grid>
                <Grid container item marginTop={'12px'} display={'flex'} flexDirection={'column'} gap={'8px'}>
                    <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                        Attach an image or screenshot
                    </Typography>
                    <PrimaryWhiteButton component="label">
                        <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                            Upload Image
                        </Typography>
                        <FileUploadOutlinedIcon fontSize='medium' />
                        <input
                            name='images'
                            multiple
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            accept="image/jpeg, image/png, image/jpg"
                            type="file"
                            onChange={handleImageUpload}
                        />
                    </PrimaryWhiteButton>
                    <Typography variant='body2' fontSize={'12px'} fontWeight={'500'} color={'#7F8781'}>
                        Max file size 2 MB. jpg, jpeg or png recommended
                    </Typography>
                    <Typography color={'#D04F4F'} fontSize={'14px'} fontWeight={'600'}>
                        {errorMsg}
                    </Typography>
                    <Grid container item paddingTop={'8px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        {
                            selectedImages.map((image, index) => {
                                return (
                                    <Grid item width={'100%'} >
                                        <Card variant='outlined' sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            gap: '4px',
                                            flexWrap: 'wrap',
                                            padding: '0px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid #E5E5E5',
                                            background: '#FFF',
                                            boxShadow: '0px 2px 1px 0px rgba(255, 255, 255, 0.10) inset, 0px -1px 0px 0px rgba(0, 20, 5, 0.10) inset, 0px 1px 3px 0px rgba(0, 20, 5, 0.10)',
                                        }}>
                                            <ImageIcon htmlColor='#55B982' />
                                            <Typography variant='body2' fontWeight={'500'} paddingTop={'8px'} paddingBottom={'8px'}>
                                                {image.name}
                                            </Typography>
                                            <IconButton sx={{ backgroundColor: '#FFF', borderRadius: '6px', padding: '0px', marginLeft: 'auto' }} onClick={() => handleRemoveImage(index)}>
                                                <DeleteOutlinedIcon fontSize='small' color='grey' />
                                            </IconButton>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item padding={'12px 24px'} marginTop={'auto'} borderTop={'1px solid #E5E5E5'}>
                <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                    <PrimaryWhiteButton sx={{ width: '50%', justifyContent: 'center' }} onClick={() => handleSupportModalClose()}>
                        Cancel
                    </PrimaryWhiteButton>
                    <PrimaryGreenButton sx={{ width: '50%' }}>
                        Save
                    </PrimaryGreenButton>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AskQuestion;
