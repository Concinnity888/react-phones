import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phonesApi = createApi({
  reducerPath: 'phonesApi',
  tagTypes: ['Phones'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (build) => ({
    getPhones: build.query({
      query: () => 'phones',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Phones', id })),
              { type: 'Phones', id: 'LIST' },
            ]
          : [{ type: 'Phones', id: 'LIST' }],
    }),
    addPhone: build.mutation({
      query: (photo) => {
        return {
          url: 'phones',
          method: 'POST',
          body: photo,
        };
      },
      invalidatesTags: [{ type: 'Phones', id: 'LIST' }],
    }),
  }),
});

export const { useGetPhonesQuery, useAddPhoneMutation } = phonesApi;
