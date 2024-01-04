import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PrimaryGreenButton, PrimaryWhiteButton } from '../../styles/Buttons';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AddSkillsForm = ({ handleHideForm }) => {

    const [totalExperience, setTotalExperience] = useState();
    const [skillsList, setSkillsList] = useState([]);

    const handleAddSkill = () => {
        setSkillsList((skillsList) => [...skillsList, { skillTag: '', yearOfExp: totalExperience }]);
    }

    const handleUpdateSkill = (e, indexToUpdate) => {
        const { name, value } = e.target;
        const updatedSkillsList = skillsList.map((skill, index) => {
            if (index === indexToUpdate) {
                return { ...skill, [name]: value };
            }
            return skill;
        });
        setSkillsList(updatedSkillsList);
    }

    const handleRemoveSkill = (indexToRemove) => {
        const updatedSkillsList = skillsList.filter((skill, index) => index !== indexToRemove);
        setSkillsList(updatedSkillsList);
    }

    return (
        <Box width={'26rem'} height={'100%'}>
            <Grid container height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} flexWrap={'nowrap'}>
                <Grid item padding={'24px 24px 8px'}>
                    <Typography variant='h6' fontWeight={'600'}>
                        Add skills
                    </Typography>
                </Grid>
                <Grid container item padding={'16px 24px'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'24px'}>
                    <Grid container item display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'8px'}>
                        <Typography variant='body2' fontWeight={'600'}>
                            Total years of experience
                        </Typography>
                        <OutlinedInput
                            fullWidth
                            name='total_experience'
                            value={totalExperience}
                            onChange={(e) => { setTotalExperience(e.target.value) }}
                            placeholder='Input this to auto-fill years below'
                            sx={{ height: '44px' }} />
                    </Grid>
                    <Divider sx={{ width: '100%' }} />
                    <Grid container item gap={'16px'}>
                        {
                            skillsList.length > 0
                            &&
                            <>
                                <Grid container item gap={'16px'}>
                                    <Grid item xs={4.5}>
                                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                            Skill Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4.5}>
                                        <Typography variant='body2' fontSize={'12px'} fontWeight={'600'}>
                                            Years of experience
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                    </Grid>
                                </Grid>
                                {
                                    skillsList?.map((skill, index) => {
                                        return (
                                            <Grid container item key={index} gap={'16px'}>
                                                <Grid item xs={4.5}>
                                                    <OutlinedInput
                                                        fullWidth
                                                        name='skillTag'
                                                        value={skill.skillTag}
                                                        onChange={(e) => { handleUpdateSkill(e, index) }}
                                                        placeholder='Skill'
                                                        sx={{ height: '36px' }} />
                                                </Grid>
                                                <Grid item xs={4.5}>
                                                    <OutlinedInput
                                                        fullWidth
                                                        name='yearOfExp'
                                                        value={skill.yearOfExp}
                                                        onChange={(e) => { handleUpdateSkill(e, index) }}
                                                        placeholder='Years'
                                                        sx={{ height: '36px' }} />
                                                </Grid>
                                                <Grid item xs={1.5} textAlign={'center'}>
                                                    <IconButton
                                                        sx={{ border: '1px solid rgba(0, 20, 5, 0.30)', borderRadius: '6px', padding: '6px' }}
                                                        onClick={() => { handleRemoveSkill(index) }}
                                                    >
                                                        <DeleteIcon color='grey' fontSize='small' />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                            </>
                        }
                        <Grid item xs={12}>
                            <PrimaryWhiteButton sx={{ width: '100%' }} onClick={() => { handleAddSkill() }}>
                                <Typography>
                                    Add skill
                                </Typography>
                                <AddIcon />
                            </PrimaryWhiteButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item padding={'12px 24px'} marginTop={'auto'} borderTop={'1px solid #E5E5E5'}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'16px'}>
                        <PrimaryWhiteButton sx={{ width: '50%', justifyContent: 'center' }} onClick={() => handleHideForm()}>
                            Cancel
                        </PrimaryWhiteButton>
                        <PrimaryGreenButton sx={{ width: '50%' }}>
                            Save
                        </PrimaryGreenButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddSkillsForm;
