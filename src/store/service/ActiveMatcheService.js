import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const activeMatchesApi = createApi({
  reducerPath: "activeMatchesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oddsapi.247idhub.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    activeMatch: build.query({
      query: (args) => {
        return {
          url: `/betfair_api/active_match/${args}`,
          method: "GET",
        }
      },
    }),
    getMyIp: build.query({
      query: (args) => {
        return {
          url: `/betfair_api/my-ip`,
          method: "GET",
        }
      },
    })
  }),
});

export const {useActiveMatchQuery, useGetMyIpQuery} = activeMatchesApi;
