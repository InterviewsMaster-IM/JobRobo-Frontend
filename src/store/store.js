// store.js
import { configureStore } from '@reduxjs/toolkit';
import { creditsApi } from '../api/creditsApi';
import { onboardingApi } from '../api/onboardingApi';
import { referralsApi } from '../api/referralsApi';
import { resumesApi } from '../api/resumesApi';

export const store = configureStore({
	reducer: {
		[creditsApi.reducerPath]: creditsApi.reducer,
		[onboardingApi.reducerPath]: onboardingApi.reducer,
		[resumesApi.reducerPath]: resumesApi.reducer,
		[referralsApi.reducerPath]: referralsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			creditsApi.middleware,
			onboardingApi.middleware,
			resumesApi.middleware,
			referralsApi.middleware,
		),
});

// Optionally export the hooks if needed
export const { dispatch, getState } = store;
export const useAppDispatch = () => dispatch;
export const useAppSelector = (state) => useAppDispatch()(state);
