// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.COIN_API;

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getMarketData: builder.query({
      query: () => "global",
    }),
    getSearchQueryData: builder.query({
      query: (searchQuery) => `search?query=${searchQuery}&${apiKey}`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetMarketDataQuery, useGetSearchQueryDataQuery } = cryptoApi;
