import React, { useEffect, useState } from 'react';
import Jobs from '../components/Jobs';
import { useGetPersonalInfoQuery } from '../api/personalInfoApi';
import { useGetJobSearchFiltersQuery } from '../api/filtersApi';
import { generateUuidForUserEmail } from '../utils/Helpers';
import Box from '@mui/material/Box';
import Dots from 'react-activity/dist/Dots';
import Typography from '@mui/material/Typography';

const JobsPage = () => {
  const { data: personalDetail, isLoading: personalInfoLoading } = useGetPersonalInfoQuery();
  const [userId, setUserId] = useState(null);
  const [filtersData, setFiltersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateUserId = async () => {
      if (personalDetail?.email) {
        const uniqueUserId = await generateUuidForUserEmail(personalDetail.email);
        setUserId(uniqueUserId);
      }
    };
    generateUserId();
  }, [personalDetail]);

  const { data: filters, isLoading: filtersLoading } = useGetJobSearchFiltersQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (filters) {
      setFiltersData(filters);
      setLoading(false); // Set loading to false when filters are fetched
    }
  }, [filters]);

  if (personalInfoLoading || filtersLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
      }}>
        <Dots color='#55B982' size={'18'} />
        <Typography variant='body2' textAlign={'center'} fontSize={'24px'} fontWeight={'600'} color={'#55B982'} letterSpacing={'1.2px'}>
          Please Wait
        </Typography>
      </Box>
    );
  }

  return <Jobs jobTitle={filtersData?.jobTitle} numberOfJobs={filtersData?.numberOfJobs} countryLocation={filtersData?.countryLocation} datePosted={filtersData?.datePosted} />;
}

export default JobsPage;
