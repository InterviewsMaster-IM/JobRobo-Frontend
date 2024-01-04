import React, { useState } from 'react';
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

const ProfileDetailsSection = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [activeForm, setActiveForm] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleOpenForm = (form) => {
        setIsFormVisible(true);
        setActiveForm(form);
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
                        <VisaDetailsCard handleOpenForm={handleOpenForm} />
                        <FrequentJobQuestionsDisplayCard handleOpenForm={handleOpenForm} />
                        <EducationDetailsCard handleOpenForm={handleOpenForm} />
                        <WorkExperienceDetailsCard handleOpenForm={handleOpenForm} />
                    </Grid>
                    <Grid item flex={'2 0 auto'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                        <PersonalDetailsCard handleOpenForm={handleOpenForm} />
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
                {activeForm === 'skills' && <AddSkillsForm handleHideForm={handleHideForm} />}
                {activeForm === 'personalDetails' && <AddPersonalDetailsForm handleHideForm={handleHideForm} />}
                {activeForm === 'workExperience' && <AddWorkExperienceForm handleHideForm={handleHideForm} />}
                {activeForm === 'education' && <AddEducationDetailsForm handleHideForm={handleHideForm} />}
            </Drawer>
        </>
    )
}

export default ProfileDetailsSection;
