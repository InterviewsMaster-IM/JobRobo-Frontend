import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './reducers/yourReducer';

const store = configureStore({
    reducer: {
        yourReducer, // Add your reducers here
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
