import { configureStore } from '@reduxjs/toolkit';
import { phonesApi } from './phonesApi';

export const store = configureStore({
  reducer: {
    [phonesApi.reducerPath]: phonesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(phonesApi.middleware),
});
