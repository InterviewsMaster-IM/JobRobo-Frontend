import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const personalInfoApi = createApi({
    reducerPath: 'personalInfoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getPersonalInfo: builder.query({
            query: () => ({
                url: ApiUrls.PERSONAL_INFO,
                method: 'GET',
            }),
        }),
        updatePersonalInfo: builder.mutation({
            query: (payload) => ({
                url: ApiUrls.PERSONAL_INFO,
                method: 'PUT',
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetPersonalInfoQuery,
    useUpdatePersonalInfoMutation
} = personalInfoApi;
