import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = 'http://jobrobo.ai:81/';

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
            })
        }),
    }),
});

export const {
    useAddJobSearchFiltersMutation
} = filtersApi;
