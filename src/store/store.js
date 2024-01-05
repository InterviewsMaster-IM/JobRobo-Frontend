// store.js
import { configureStore } from '@reduxjs/toolkit';
import { creditsApi } from '../api/creditsApi';

export const store = configureStore({
  reducer: {
    [creditsApi.reducerPath]: creditsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditsApi.middleware),
});

// Optionally export the hooks if needed
export const { dispatch, getState } = store;
export const useAppDispatch = () => dispatch;
export const useAppSelector = (state) => useAppDispatch()(state);
