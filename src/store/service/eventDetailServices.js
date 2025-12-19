import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const eventDerailApi = createApi({
  reducerPath: "eventDerailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oddsapi.247idhub.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    eventDetail: build.query({
      query: (id) => ({
        url: `/betfair_api/fancy/${id}`,
        method: "GET",
      }),
    })
  }),
});

export const {useEventDetailQuery } = eventDerailApi;
