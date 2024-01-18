import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { useDeleteEducationDetailByIdMutation, useGetEducationDetailsQuery } from '../../api/educationApi';
import { ActionType, ProfileConstants } from '../../utils/Constants';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NotificationMessages from '../../utils/notificationConstants';
import toast from "react-hot-toast";
import CustomToast from '../common/CustomToast';
import { formatShortMonthYear } from '../../utils/Helpers';

const EducationDetailsCard = ({ handleOpenForm }) => {

    const { data: educationDetailsList } = useGetEducationDetailsQuery();
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [deleteEducationDetailById] = useDeleteEducationDetailByIdMutation();

    const handleDelete = async (id) => {
        try {
            const response = await deleteEducationDetailById(id).unwrap();
            toast.custom(<CustomToast type={"success"} message={NotificationMessages.EDUCATION_DETAIL_DELETED_SUCCESS} />);
        } catch (error) {
            if (error?.data?.error) {
                toast.custom(<CustomToast type={"error"} message={error?.data?.error} />);
            } else {
                const errorMsg = Object.values(error?.data || {})[0][0];
                toast.custom(<CustomToast type={"error"} message={errorMsg} />);
            }
        }
    }

    const handleEdit = async (id) => {
        handleOpenForm(ProfileConstants.EDUCATION, ActionType.EDIT, id);
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
                        <Grid item>
                            <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                                Education
                            </Typography>
                            <Typography variant='body2' fontWeight={'400'} color={'#7F8781'}>
                                Add your education details
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton onClick={() => handleOpenForm(ProfileConstants.EDUCATION, ActionType.ADD)}>
                                <AddIcon fontSize='small' />
                                <Typography variant='body2' fontWeight={'500'} marginRight={'4px'}>
                                    Add
                                </Typography>
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    {
                        educationDetailsList?.length > 0
                        &&
                        <Grid container display={'flex'} flexDirection={'column'} gap={'12px'} paddingTop={'12px'} borderTop={'1px solid #E5E5E5'}>
                            {
                                educationDetailsList?.map((detailsObj, index) => {
                                    const { id, school, degree, major_field_of_study, start_month_year, end_month_year, description } = detailsObj;
                                    return (
                                        <Box key={id} onMouseEnter={() => setHoveredItemId(id)} onMouseLeave={() => setHoveredItemId(null)}>
                                            <Grid container item paddingY={'12px'} paddingX={'8px'} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={'12px'}
                                                borderRadius={'6px'}
                                                sx={{
                                                    backgroundColor: hoveredItemId === id ? 'rgba(229, 229, 229, 0.35)' : '#FFF',
                                                    cursor: hoveredItemId === id ? 'pointer' : 'default'
                                                }}
                                            >
                                                <Grid item>
                                                    <Box
                                                        width={'2rem'}
                                                        height={'2rem'}
                                                        bgcolor={'#E5E5E5'}
                                                        display={'flex'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                        borderRadius={'50%'}
                                                    >
                                                        <SchoolTwoToneIcon fontSize='small' htmlColor='#7F8781' />
                                                    </Box>
                                                </Grid>
                                                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                                                    <Typography variant='body2' fontWeight={'500'} color={'#1A1A1A'}>
                                                        {degree}, {major_field_of_study}
                                                    </Typography>
                                                    <Typography variant='body2' fontWeight={'500'} color={'#808080'}>
                                                        {school}
                                                    </Typography>
                                                    {description &&
                                                        <Typography variant='body2' fontWeight={'400'} color={'#808080'}>
                                                            GPA: {description}
                                                        </Typography>
                                                    }
                                                </Grid>
                                                <Box marginLeft={'auto'} width={'14rem'}>
                                                    {
                                                        hoveredItemId === id
                                                            ?
                                                            <Grid item display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={'16px'}>
                                                                <PrimaryWhiteButton onClick={() => handleEdit(id)}>
                                                                    <EditOutlinedIcon htmlColor='#656565' fontSize='small' />
                                                                    <Typography variant='body2' fontWeight={'500'}>
                                                                        Edit
                                                                    </Typography>
                                                                </PrimaryWhiteButton>
                                                                <PrimaryWhiteButton onClick={() => handleDelete(id)}>
                                                                    <DeleteOutlinedIcon htmlColor='#656565' fontSize='small' />
                                                                    <Typography variant='body2' fontWeight={'500'}>
                                                                        Delete
                                                                    </Typography>
                                                                </PrimaryWhiteButton>
                                                            </Grid>
                                                            :
                                                            <Grid item textAlign={'end'}>
                                                                <Typography variant='body2' fontWeight={'400'} color={'#808080'}>
                                                                    {formatShortMonthYear(start_month_year)} - {formatShortMonthYear(end_month_year)}
                                                                </Typography>
                                                            </Grid>
                                                    }
                                                </Box>
                                            </Grid>
                                            {
                                                index !== educationDetailsList.length - 1
                                                &&
                                                <Divider sx={{ marginTop: '12px' }} />
                                            }
                                        </Box>
                                    )
                                })
                            }
                        </Grid>
                    }
                </Grid>
            </Card>
        </Box>
    )
}

export default EducationDetailsCard;
