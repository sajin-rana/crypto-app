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
    getCoinList: builder.query({
      query: (currency) =>
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&${apiKey}`,
    }),
    getChartCoinData: builder.query({
      query: (query) => `coins/${query}&${apiKey}`,
    }),
    getTableCoinList: builder.query({
      query: ({ currency, order, page }) =>
        `coins/markets?vs_currency=${currency}&order=${order}_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMarketDataQuery,
  useGetSearchQueryDataQuery,
  useGetCoinListQuery,
  useGetChartCoinDataQuery,
  useGetTableCoinListQuery,
} = cryptoApi;
