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
            headers.set('Content-Type', 'application/json');
            headers.set('authorization', accessToken);
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
    }),
});

export const {
    useGetProfileOtherDetailsQuery,
    useAddProfileOtherDetailsMutation
} = profileApi;
