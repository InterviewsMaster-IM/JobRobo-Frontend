import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = 'http://3.145.41.95:81/';

export const filtersApi = createApi({
    reducerPath: 'filtersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        // prepareHeaders: (headers) => {
        //     const accessToken = localStorage.getItem('access_token');
        //     headers.set('authorization', `Bearer ${accessToken}`);
        // },
        // credentials: "include",
    }),
    endpoints: (builder) => ({
        addJobSearchFilters: builder.mutation({
            query: (formData) => ({
                url: 'jobsearch',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: [{ type: 'Jobs' }],
        }),
        getJobSearchFilters: builder.query({
            query: (userId) => ({
                url: `filters/?userId=${userId}`,
                method: 'GET',
            })
        }),
    }),
});

export const {
    useAddJobSearchFiltersMutation,
    useGetJobSearchFiltersQuery
} = filtersApi;
