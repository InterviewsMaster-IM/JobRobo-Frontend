import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const referralsApi = createApi({
    reducerPath: 'referralsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createReferrals: builder.mutation({
            query: () => ({
                url: ApiUrls.CREATE_REFERRAL,
                method: 'POST',
            }),
        }),
        validateReferrals: builder.mutation({
            query: ({ code }) => ({
                url: `${ApiUrls.VALIDATE_REFERRAL}${code}/`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useCreateReferralsMutation,
    useValidateReferralsMutation
} = referralsApi;
