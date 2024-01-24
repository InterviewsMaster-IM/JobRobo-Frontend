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
            providesTags: ['educationDetails']
        }),
        addEducationDetails: builder.mutation({
            query: (payload) => ({
                url: ApiUrls.EDUCATION_DETAILS,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['educationDetails']
        }),
        getEducationDetailById: builder.query({
            query: (id) => ({
                url: `${ApiUrls.EDUCATION_DETAILS}${id}/`,
                method: 'GET',
            }),
        }),
        updateEducationDetails: builder.mutation({
            query: ({ id, payload }) => ({
                url: `${ApiUrls.EDUCATION_DETAILS}${id}/`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['educationDetails']
        }),
        deleteEducationDetailById: builder.mutation({
            query: (id) => ({
                url: `${ApiUrls.EDUCATION_DETAILS}${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['educationDetails']
        }),
    }),
});

export const {
    useGetEducationDetailsQuery,
    useAddEducationDetailsMutation,
    useGetEducationDetailByIdQuery,
    useUpdateEducationDetailsMutation,
    useDeleteEducationDetailByIdMutation,
} = educationApi;
