import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = 'http://3.145.41.95:81/';

export const jobPostsApi = createApi({
    reducerPath: 'jobPostsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        // prepareHeaders: (headers) => {
        //     const accessToken = localStorage.getItem('access_token');
        //     headers.set('authorization', `Bearer ${accessToken}`);
        // },
        // credentials: "include",
    }),
    endpoints: (builder) => ({
        getJobPosts: builder.query({
            query: ({ job_titles, country, minimum_years_of_experience, date_posted, no_of_jobs }) => {
                const params = new URLSearchParams();
                if (job_titles) job_titles.forEach(title => params.append('jobTitles', title));
                if (date_posted) params.append('datePosted', date_posted);
                if (no_of_jobs) params.append('numberOfJobs', no_of_jobs);
                if (country) params.append('countryLocation', country);
                if (minimum_years_of_experience) params.append('experienceYears', minimum_years_of_experience);

                return {
                    url: `posts/?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),
        getJobs: builder.query({
            query: ({ job_titles, start_date, end_date, no_of_jobs, location }) => {
                const params = new URLSearchParams();
                if (job_titles) job_titles.forEach(title => params.append('job_titles', title));
                if (start_date) params.append('start_date', start_date);
                if (end_date) params.append('end_date', end_date);
                if (no_of_jobs) params.append('no_of_jobs', no_of_jobs);
                if (location) params.append('location', location);

                return {
                    url: `getJobs/?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useGetJobPostsQuery,
    useGetJobsQuery,
} = jobPostsApi;
