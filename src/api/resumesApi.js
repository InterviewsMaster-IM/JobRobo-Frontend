import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const resumesApi = createApi({
    reducerPath: 'resumesApi',
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
        getResumeCheckTask: builder.query({
            query: ({ taskId }) => ({
                url: `${ApiUrls.RESUME_CHECK_TASK}${taskId}/`,
                method: 'GET',
            }),
        }),
        addResumeUpload: builder.mutation({
            query: () => ({
                url: ApiUrls.RESUME_UPLOAD,
                method: 'POST',
            }),
        }),
        addResumeQA: builder.mutation({
            query: () => ({
                url: ApiUrls.RESUME_QA,
                method: 'POST',
            }),
        }),
        addResumeStartTask: builder.mutation({
            query: () => ({
                url: ApiUrls.RESUME_START_TASK,
                method: 'POST',
            }),
        }),

    }),
});

export const {
    getResumeCheckTask,
    addResumeUpload,
    addResumeQA,
    addResumeStartTask
} = resumesApi;
