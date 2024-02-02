import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IllustrationImage from '../../assets/images/IllustrationSection.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PrimaryGreenButton } from '../../styles/Buttons';
import { useNavigate } from 'react-router-dom';

const JobSearchCard = () => {
    const navigate = useNavigate();

    const redirectToJobSearchPage = () => {
        navigate('/jobsearch');
    }

    return (
        <Card variant='outlined' sx={{ width: '368px', borderRadius: '16px' }}>
            <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'contain' }}
                image={IllustrationImage}
                alt="JobRobo"
            >
            </CardMedia>
            <CardContent>
                <Typography variant='h6' fontSize={'18px'} fontWeight={'600'}>
                    Job Search
                </Typography>
                <Typography variant='body2' fontWeight={'500'} color={'#7F8781'}>
                    Get 100s of relevant jobs within minutes using Job Search
                </Typography>
                <PrimaryGreenButton sx={{ justifyContent: 'space-between', width: '100%', marginTop: '2rem' }}
                    onClick={() => redirectToJobSearchPage()}>
                    <Typography variant='h6' fontSize={'18px'} fontWeight={'500'}>
                        Start Job Search
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
                </PrimaryGreenButton>
            </CardContent>
        </Card>
    )
}

export default JobSearchCard;
