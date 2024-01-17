import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import VisaDetailsCard from './VisaDetailsCard';
import FrequentJobQuestionsDisplayCard from './FrequentJobQuestionsDisplayCard';
import PersonalDetailsCard from './PersonalDetailsCard';
import EducationDetailsCard from './EducationDetailsCard';
import SkillsDisplayCard from './SkillsDisplayCard';
import ResumesDisplayCard from './ResumesDisplayCard';
import WorkExperienceDetailsCard from './WorkExperienceDetailsCard';
import AddSkillsForm from '../ProfileForms/AddSkillsForm';
import AddPersonalDetailsForm from '../ProfileForms/AddPersonalDetailsForm';
import AddWorkExperienceForm from '../ProfileForms/AddWorkExperienceForm';
import AddEducationDetailsForm from '../ProfileForms/AddEducationDetailsForm';
import { ActionType, ProfileConstants } from '../../utils/Constants';
import { useGetPersonalInfoQuery } from '../../api/personalInfoApi';

const ProfileDetailsSection = () => {
    const { data: personalDetail } = useGetPersonalInfoQuery();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [activeForm, setActiveForm] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionType, setActionType] = useState(ActionType.ADD);
    const [educationId, setEducationId] = useState(null);

    const handleOpenForm = (form, actionType, id) => {
        setIsFormVisible(true);
        setActiveForm(form);

        setActionType(actionType);

        if (form === ProfileConstants.EDUCATION) {
            setEducationId(id);
        }
    }

    const handleHideForm = (reason) => {
        // if (reason && reason === "backdropClick") {
        //     setShowConfirmModal(true);
        // }
        // else {
        // }
        setIsFormVisible(false);
    }

    return (
        <>
            <Box width={'100%'} height={'auto'}>
                <Grid container display={'flex'} flexDirection={'row'} alignItems={'flex-start'} gap={'24px'}>
                    <Grid item width={'max-content'} flex={'3 0 auto'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                        {/* <VisaDetailsCard handleOpenForm={handleOpenForm} />
                        <FrequentJobQuestionsDisplayCard handleOpenForm={handleOpenForm} /> */}
                        <EducationDetailsCard handleOpenForm={handleOpenForm} />
                        <WorkExperienceDetailsCard handleOpenForm={handleOpenForm} />
                    </Grid>
                    <Grid item flex={'2 0 auto'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                        <PersonalDetailsCard handleOpenForm={handleOpenForm} personalDetail={personalDetail} />
                        <ResumesDisplayCard handleOpenForm={handleOpenForm} />
                        <SkillsDisplayCard handleOpenForm={handleOpenForm} />
                    </Grid>
                </Grid>
            </Box>
            <Drawer
                anchor='right'
                open={isFormVisible}
                onClose={(_, reason) => { handleHideForm(reason) }}
            >
                {activeForm === ProfileConstants.SKILLS && <AddSkillsForm handleHideForm={handleHideForm} />}
                {activeForm === ProfileConstants.PERSONAL_DETAILS && <AddPersonalDetailsForm handleHideForm={handleHideForm} personalDetail={personalDetail} />}
                {activeForm === ProfileConstants.WORK_EXPERIENCE && <AddWorkExperienceForm handleHideForm={handleHideForm} />}
                {activeForm === ProfileConstants.EDUCATION && <AddEducationDetailsForm actionType={actionType} handleHideForm={handleHideForm} id={educationId} />}
            </Drawer>
        </>
    )
}

export default ProfileDetailsSection;
