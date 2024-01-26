// store.js
import { configureStore } from '@reduxjs/toolkit';
import { creditsApi } from '../api/creditsApi';
import { onboardingApi } from '../api/onboardingApi';
import { resumesApi } from '../api/resumesApi';
import { educationApi } from '../api/educationApi';
import { personalInfoApi } from '../api/personalInfoApi';
import { skillsApi } from '../api/skillsApi';
import { workExperienceApi } from '../api/workExperienceApi';
import { referralsApi } from '../api/referralsApi';
import { campaignsApi } from '../api/campaignsApi';

export const store = configureStore({
	reducer: {
		[creditsApi.reducerPath]: creditsApi.reducer,
		[onboardingApi.reducerPath]: onboardingApi.reducer,
		[resumesApi.reducerPath]: resumesApi.reducer,
		[educationApi.reducerPath]: educationApi.reducer,
		[personalInfoApi.reducerPath]: personalInfoApi.reducer,
		[skillsApi.reducerPath]: skillsApi.reducer,
		[workExperienceApi.reducerPath]: workExperienceApi.reducer,
		[referralsApi.reducerPath]: referralsApi.reducer,
		[campaignsApi.reducerPath]: campaignsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			creditsApi.middleware,
			onboardingApi.middleware,
			resumesApi.middleware,
			educationApi.middleware,
			personalInfoApi.middleware,
			skillsApi.middleware,
			workExperienceApi.middleware,
			referralsApi.middleware,
			campaignsApi.middleware,
		),
});

// Optionally export the hooks if needed
export const { dispatch, getState } = store;
export const useAppDispatch = () => dispatch;
export const useAppSelector = (state) => useAppDispatch()(state);
