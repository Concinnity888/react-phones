import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

let socket;
function getSocket() {
  if (!socket) {
    socket = io('http://localhost:8080/');
  }
  return socket;
}

export const phonesApi = createApi({
  reducerPath: 'phonesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/phones',
  }),
  endpoints: (builder) => ({
    getPhones: builder.query({
      query: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on('connect', () => {});

          socket.on('send_phone', (phone) => {
            updateCachedData((draft) => {
              draft.push(phone);
            });
          });

          await cacheEntryRemoved;

          socket.off('connect');
          socket.off('send_phone');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addPhone: builder.mutation({
      query: (phone) => {
        return {
          method: 'POST',
          body: phone,
        };
      },
    }),
  }),
});

export const { useGetPhonesQuery, useAddPhoneMutation } = phonesApi;
