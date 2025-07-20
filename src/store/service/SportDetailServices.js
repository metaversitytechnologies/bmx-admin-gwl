import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sportDetailsApi = createApi({
  reducerPath: "sportDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    sportDetail: build.query({
      query: (body) => ({
        url: "/bmx/report/sport-details",
        method: "POST",
        body,
      }),
    }),
    rejectedBetDetail: build.query({
      query: (body) => ({
        url: "/bmx/rejected-and-cancle-bets",
        method: "POST",
        body,
      }),
    }),
    sessionFancyBetDetail: build.query({
      query: (body) => ({
        url: "/bmx/fancy-fetch-by-match-id",
        method: "POST",
        body,
      }),
    }),
    sportPlusMinus: build.query({
      query: (body) => ({
        url: "/bmx/report/match-and-fancy-plus-minus",
        method: "POST",
        body,
      }),
    }),
    searchUserDownline: build.query({
      query: (args) => {
        const { term } = args;
        return {
          url: `/user/search-user-downline?term=${term}&_type=${term}&q=${term}`,
          method: "POST",
        };
      },
    }),
    getMatchBets: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-match-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getUserSeacrh: build.mutation({
      query: (body) => {
        return {
          url: `/user/user-search`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useSportDetailQuery,
  useRejectedBetDetailQuery,
  useLazySessionFancyBetDetailQuery,
  useSportPlusMinusQuery,
  useLazySearchUserDownlineQuery,
  useGetMatchBetsMutation,
  useGetUserSeacrhMutation
} = sportDetailsApi;
