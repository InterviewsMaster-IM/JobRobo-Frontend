import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { ActionType, ProfileConstants, employmentTypeOptions } from '../../utils/Constants';
import { useDeleteWorkExperienceMutation, useGetWorkExperiencesQuery } from '../../api/workExperienceApi';
import NotificationMessages from '../../utils/notificationConstants';
import toast from "react-hot-toast";
import CustomToast from '../common/CustomToast';
import { formatShortMonthYear } from '../../utils/Helpers';

const WorkExperienceDetailsCard = ({ handleOpenForm }) => {

    const { data: workExperiencesList } = useGetWorkExperiencesQuery();
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [deleteWorkExperience] = useDeleteWorkExperienceMutation();

    const handleDelete = async (id) => {
        try {
            const response = await deleteWorkExperience(id).unwrap();
            toast.custom(<CustomToast type={"success"} message={NotificationMessages.WORK_EXPERIENCE_DELETED_SUCCESS} />);
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
        handleOpenForm(ProfileConstants.WORK_EXPERIENCE, ActionType.EDIT, id);
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
                                Work experience
                            </Typography>
                            <Typography variant='body2' fontWeight={'400'} color={'#7F8781'}>
                                Add your relevant work experience
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PrimaryWhiteButton onClick={() => handleOpenForm(ProfileConstants.WORK_EXPERIENCE, ActionType.ADD)}>
                                <AddIcon fontSize='small' />
                                <Typography variant='body2' fontWeight={'500'} marginRight={'4px'}>
                                    Add
                                </Typography>
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                    {
                        workExperiencesList?.length > 0
                        &&
                        <Grid container display={'flex'} flexDirection={'column'} gap={'12px'} paddingTop={'12px'} borderTop={'1px solid #E5E5E5'}>
                            {
                                workExperiencesList?.map((workExp, index) => {
                                    const { id, position_title, company_name, employment_type, current_role, start_month_year, end_month_year, description } = workExp;
                                    const employmentType = employmentTypeOptions.find((type) => type.value === employment_type)?.label;
                                    return (
                                        <Box key={id} onMouseEnter={() => setHoveredItemId(id)} onMouseLeave={() => setHoveredItemId(null)}>
                                            <Grid container item paddingY={'12px'} paddingX={'8px'} display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={'12px'}
                                                borderRadius={'6px'}
                                                sx={{
                                                    backgroundColor: hoveredItemId === id ? 'rgba(229, 229, 229, 0.35)' : '#FFF',
                                                    cursor: hoveredItemId === id ? 'pointer' : 'default'
                                                }}>
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
                                                        <BusinessTwoToneIcon fontSize='small' htmlColor='#7F8781' />
                                                    </Box>
                                                </Grid>
                                                <Grid item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                                                    <Typography variant='body2' fontWeight={'500'} color={'#1A1A1A'} textTransform={'capitalize'}>
                                                        {position_title}
                                                    </Typography>
                                                    <Typography variant='body2' fontWeight={'500'} color={'#808080'} textTransform={'capitalize'}>
                                                        {company_name} | {employmentType}
                                                    </Typography>
                                                    <Typography variant='body2' width={'10rem'} whiteSpace={'nowrap'} fontWeight={'400'} color={'#808080'}>
                                                        {description?.length > 40 ? `${description?.substring(0, 40)}...` : description}
                                                    </Typography>
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
                                                                    {formatShortMonthYear(start_month_year)} - {current_role ? 'Present' : formatShortMonthYear(end_month_year)}
                                                                </Typography>
                                                            </Grid>
                                                    }
                                                </Box>
                                            </Grid>
                                            {
                                                index !== workExperiencesList.length - 1
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

export default WorkExperienceDetailsCard;
