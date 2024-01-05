import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const creditsApi = createApi({
    reducerPath: 'creditsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('Content-Type', 'application/json');
            headers.set('authorization', accessToken);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getUserCredits: builder.query({
            query: () => ({
                url: ApiUrls.USER_CREDITS,
                method: 'GET',
            }),
        }),
        getCreditPlans: builder.query({
            query: () => ApiUrls.CREDIT_PLANS,
            method: 'GET',
        }),
    }),
});

// Export the generated hooks for the API
export const {
    useGetUserCreditsQuery,
    useGetCreditPlansQuery
} = creditsApi;
