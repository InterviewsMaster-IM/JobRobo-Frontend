import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const educationApi = createApi({
    reducerPath: 'educationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getEducationDetails: builder.query({
            query: () => ({
                url: ApiUrls.EDUCATION_DETAILS,
                method: 'GET',
            }),
        }),
        addEducationDetails: builder.mutation({
            query: (payload) => ({
                url: ApiUrls.EDUCATION_DETAILS,
                method: 'POST',
                body: payload,
            }),
        }),
        updateEducationDetails: builder.mutation({
            query: ({ id, payload }) => ({
                url: `${ApiUrls.EDUCATION_DETAILS}/${id}`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteEducationDetails: builder.mutation({
            query: (id) => ({
                url: `${ApiUrls.EDUCATION_DETAILS}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetEducationDetailsQuery,
    useAddEducationDetailsMutation,
    useUpdateEducationDetailsMutation,
    useDeleteEducationDetailsMutation,
} = educationApi;
