import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import ApiUrls from './ApiUrls';

const baseApiUrl = config.REACT_APP_ROOT_URL;

export const campaignsApi = createApi({
    reducerPath: 'campaignsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('access_token');
            headers.set('authorization', `Bearer ${accessToken}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getUserCampaignsList: builder.query({
            query: () => ({
                url: ApiUrls.USER_CAMPAIGNS,
                method: 'GET',
            }),
        }),
        getCampaignJobs: builder.query({
            query: (id) => ({
                url: `${ApiUrls.CAMPAIGNS_JOBS}${id}/`,
                method: 'GET',
            }),
        }),
        addCampaign: builder.mutation({
            query: () => ({
                url: ApiUrls.CAMPAIGN_CREATE,
                method: 'POST',
            }),
        }),
        updateCampaign: builder.mutation({
            query: () => ({
                url: ApiUrls.CAMPAIGN_UPDATE,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useGetUserCampaignsListQuery,
    useGetCampaignJobsQuery,
    useAddCampaignMutation,
    useUpdateCampaignMutation,
} = campaignsApi;
