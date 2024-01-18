import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const workExperienceApi = createApi({
    reducerPath: 'workExperienceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getWorkExperiences: builder.query({
            query: () => ({
                url: ApiUrls.WORK_EXPERIENCE,
                method: 'GET',
            }),
            providesTags: ['workExperience']
        }),
        addWorkExperience: builder.mutation({
            query: (payload) => ({
                url: ApiUrls.WORK_EXPERIENCE,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['workExperience']
        }),
        getWorkExperienceById: builder.query({
            query: (id) => ({
                url: `${ApiUrls.WORK_EXPERIENCE}${id}/`,
                method: 'GET',
            }),
        }),
        updateWorkExperience: builder.mutation({
            query: ({ id, payload }) => ({
                url: `${ApiUrls.WORK_EXPERIENCE}${id}/`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['workExperience']
        }),
        deleteWorkExperience: builder.mutation({
            query: (id) => ({
                url: `${ApiUrls.WORK_EXPERIENCE}${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['workExperience']
        }),
    }),
});

export const {
    useGetWorkExperiencesQuery,
    useAddWorkExperienceMutation,
    useGetWorkExperienceByIdQuery,
    useUpdateWorkExperienceMutation,
    useDeleteWorkExperienceMutation,
} = workExperienceApi;
