import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VisaDetailsCard from './VisaDetailsCard';
import FrequentJobQuestionsDisplayCard from './FrequentJobQuestionsDisplayCard';
import PersonalDetailsCard from './PersonalDetailsCard';
import EducationDetailsCard from './EducationDetailsCard';
import SkillsDisplayCard from './SkillsDisplayCard';

const ProfileDetailsSection = () => {
    return (
        <Box width={'100%'} height={'auto'}>
            <Grid container display={'flex'} flexDirection={'row'} alignItems={'flex-start'} gap={'24px'}>
                <Grid item width={'max-content'} flex={'3 0 auto'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                    <VisaDetailsCard />
                    <FrequentJobQuestionsDisplayCard />
                    <EducationDetailsCard />
                </Grid>
                <Grid item flex={'2 0 auto'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                    <PersonalDetailsCard />
                    <SkillsDisplayCard />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileDetailsSection;
