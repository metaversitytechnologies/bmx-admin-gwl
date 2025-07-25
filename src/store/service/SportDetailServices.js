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
    getMatchAndSessionBet: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-match-session-bets`,
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
    getCompletedSport: build.query({
      query: (body) => {
        return {
          url: `/sports/get-completed-events`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionHavingBet: build.query({
      query: (body) => {
        return {
          url: `/report/session-having-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionBet: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-session-bets`,
          method: "POST",
          body,
        };
      },
    }),
    getFancyBook: build.mutation({
      query: (body) => {
        return {
          url: `/enduser/fancy-book`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletedFancy: build.mutation({
      query: (body) => {
        return {
          url: `/report/get-completed-session`,
          method: "POST",
          body,
        };
      },
    }),
    getCompletLedger: build.query({
      query: (body) => {
        return {
          url: `/report/get-complete-ledger-v2`,
          method: "POST",
          body,
        };
      },
    }),
    getSessionPlusMinus: build.query({
      query: (body) => {
        return {
          url: `/report/get-session-plus-minus`,
          method: "POST",
          body,
        };
      },
    }),
    getCompleteLedger: build.query({
      query: (body) => {
        return {
          url: `/report/get-complete-ledger`,
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
  useGetUserSeacrhMutation,
  useGetMatchAndSessionBetMutation,
  useGetCompletedSportQuery,
  useGetSessionHavingBetQuery,
  useGetSessionBetMutation,
  useGetFancyBookMutation,
  useGetCompletedFancyMutation,
  useGetCompletLedgerQuery,
  useGetSessionPlusMinusQuery,
  useGetCompleteLedgerQuery
} = sportDetailsApi;
