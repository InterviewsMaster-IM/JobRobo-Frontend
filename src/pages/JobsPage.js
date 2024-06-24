import React, { useEffect, useState } from 'react';
import Jobs from '../components/Jobs';
import { useGetPersonalInfoQuery } from '../api/personalInfoApi';
import { useGetJobSearchFiltersQuery } from '../api/filtersApi';
import { generateUuidForUserEmail } from '../utils/Helpers';

const JobsPage = () => {
  const { data: personalDetail } = useGetPersonalInfoQuery();
  const [userId, setUserId] = useState(null);
  const [filtersData, setFiltersData] = useState(null);

  useEffect(() => {
    const generateUserId = async () => {
      if (personalDetail?.email) {
        const uniqueUserId = await generateUuidForUserEmail(personalDetail.email);
        setUserId(uniqueUserId);
      }
    };
    generateUserId();
  }, [personalDetail]);

  const { data: filters } = useGetJobSearchFiltersQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (filters) {
      setFiltersData(filters);
    }
  }, [filters]);

  return <Jobs jobTitle={filtersData?.jobTitle} numberOfJobs={filtersData?.numberOfJobs} />;
}

export default JobsPage;
