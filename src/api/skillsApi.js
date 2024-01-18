import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const skillsApi = createApi({
    reducerPath: 'skillsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => ({
                url: ApiUrls.SKILLS,
                method: 'GET',
            }),
            providesTags: ['skills']
        }),
        addSkills: builder.mutation({
            query: (payload) => ({
                url: ApiUrls.SKILLS,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['skills']
        }),
        updateSkills: builder.mutation({
            query: ({ id, payload }) => ({
                url: `${ApiUrls.SKILLS}${id}/`,
                method: 'PUT',
                body: payload,
            }),
        }),
        deleteSkills: builder.mutation({
            query: (id) => ({
                url: `${ApiUrls.SKILLS}${id}/`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetSkillsQuery,
    useAddSkillsMutation,
    useUpdateSkillsMutation,
    useDeleteSkillsMutation,
} = skillsApi;
