import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseApiUrl = 'http://jobrobo.ai:81/';
const baseApiUrl = 'http://127.0.0.1:81/';

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
            query: ({ job_title, company_name, country, location, minimum_years_of_experience, required_skills, ...otherParams }) => {
                const queryString = [
                    job_title ? `job_title=${encodeURIComponent(job_title)}` : '',
                    company_name ? `company_name=${encodeURIComponent(company_name)}` : '',
                    country ? `country=${encodeURIComponent(country)}` : '',
                    location ? `location=${encodeURIComponent(location)}` : '',
                    minimum_years_of_experience ? `minimum_years_of_experience=${encodeURIComponent(minimum_years_of_experience)}` : '',
                    required_skills ? `required_skills=${encodeURIComponent(JSON.stringify(required_skills))}` : '',
                ].filter(Boolean).join('&');

                const dynamicUrl = `query-job-posts/?${queryString}`;

                return {
                    url: dynamicUrl,
                    method: 'GET',
                    ...otherParams,
                };
            },
        }),
        getJobs: builder.query({
            query: ({ job_titles, start_date, end_date, job_type, no_of_jobs, country_location, ...otherParams }) => {
                const params = new URLSearchParams();
                if (job_titles && job_titles.length > 0) {
                    job_titles.forEach(title => params.append('job_titles', title));
                }
                if (start_date) params.append('start_date', start_date);
                if (end_date) params.append('end_date', end_date);
                if (no_of_jobs) params.append('no_of_jobs', no_of_jobs);
                // if (job_type && job_type.length > 0) {
                //     job_type.forEach(type => params.append('job_type', type));
                // }
                // if (country_location) params.append('country_location', country_location);

                const dynamicUrl = `jobs/?${params.toString()}`;

                return {
                    url: dynamicUrl,
                    method: 'GET',
                    ...otherParams,
                };
            },
        }),
    }),
});

export const {
    useGetJobPostsQuery,
    useGetJobsQuery,
} = jobPostsApi;
