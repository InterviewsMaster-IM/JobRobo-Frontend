import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const onboardingApi = createApi({
    reducerPath: 'onboardingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getOnboardingDetails: builder.query({
            query: () => ({
                url: ApiUrls.ONBOARDING_DETAILS,
                method: 'GET',
            }),
        }),
        addOnboardingDetails: builder.mutation({
            query: (formData) => ({
                url: ApiUrls.ONBOARDING_DETAILS,
                method: 'POST',
                body: formData,
                formData: true,
            }),
        }),
    }),
});

export const {
    useGetOnboardingDetailsQuery,
    useAddOnboardingDetailsMutation,
} = onboardingApi;
