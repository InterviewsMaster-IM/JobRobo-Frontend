import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getProfileOtherDetails: builder.query({
            query: () => ({
                url: ApiUrls.PROFILE_OTHER_DETAILS,
                method: 'GET',
            }),
        }),
        addProfileOtherDetails: builder.mutation({
            query: () => ({
                url: `${ApiUrls.PROFILE_OTHER_DETAILS}add/`,
                method: 'POST',
            }),
        }),
        addNonResumeOnboardingDetails: builder.mutation({
            query: (formData) => ({
                url: ApiUrls.NON_RESUME_ONBOARDING_DETAILS,
                method: 'POST',
                body: formData,
                formData: true,
            }),
        })
    }),
});

export const {
    useGetProfileOtherDetailsQuery,
    useAddProfileOtherDetailsMutation,
    useAddNonResumeOnboardingDetailsMutation,
} = profileApi;
