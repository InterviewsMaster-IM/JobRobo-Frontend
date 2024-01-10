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
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getUploadedFiles: builder.query({
            query: () => ({
                url: ApiUrls.RESUME_UPLOADED,
                method: 'GET',
            }),
        }),
        resumeCheckTask: builder.query({
            query: ({ taskId }) => ({
                url: `${ApiUrls.RESUME_CHECK_TASK}${taskId}/`,
                method: 'GET',
            }),
        }),
        uploadResume: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: ApiUrls.RESUME_UPLOAD,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
        }),
        resumeQA: builder.mutation({
            query: () => ({
                url: ApiUrls.RESUME_QA,
                method: 'POST',
            }),
        }),
        resumeStartTask: builder.mutation({
            query: () => ({
                url: ApiUrls.RESUME_START_TASK,
                method: 'POST',
            }),
        }),
        deleteResume: builder.mutation({
            query: (resumeId) => ({
                url: `${ApiUrls.RESUME_DELETE}${resumeId}`,
                method: 'DELETE',
            }),
        }),
        uploadCoverLetter: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: ApiUrls.COVER_LETTER_UPLOAD,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
        }),
        deleteCoverLetter: builder.mutation({
            query: (coverLetterId) => ({
                url: `${ApiUrls.COVER_LETTER_DELETE}${coverLetterId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetUploadedFilesQuery,
    useResumeCheckTaskQuery,
    useUploadResumeMutation,
    useResumeQAMutation,
    useResumeStartTaskMutation,
    useDeleteResumeMutation,
    useUploadCoverLetterMutation,
    useDeleteCoverLetterMutation,
} = resumesApi;
