import React, { useEffect, useState } from 'react'
import JobPosts from '../components/JobPosts';
import { useGetPersonalInfoQuery } from '../api/personalInfoApi';
import { useGetJobSearchFiltersQuery } from '../api/filtersApi';
import { generateUuidForUserEmail } from '../utils/Helpers';
const JobPostsPage = () => {
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
  return (
    <JobPosts jobTitles={filtersData?.jobTitle}
      countryLocation={filtersData?.countryLocation}
      experienceYears={filtersData?.experienceYears}
      datePosted={filtersData?.datePosted}
      numberOfJobs={filtersData?.numberOfJobs} />
  )
}

export default JobPostsPage;
