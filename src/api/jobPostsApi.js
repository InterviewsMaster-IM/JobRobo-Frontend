import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = 'http://jobrobo.ai:81/';

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
            query: () => ({
                url: 'posts?userId=user-123',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetJobPostsQuery
} = jobPostsApi;
