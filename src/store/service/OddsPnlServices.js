import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const oddsPnlApi = createApi({
  reducerPath: "oddsPnlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    // oddsPnl: build.mutation({
    //   query: (body) => ({
    //     url: "/bets/odds-pnl",
    //     method: "POST",
    //     body
    //   }),
    // }),
    oddsQuPnl: build.query({
      query: (body) => ({
        url: "/report/odds-pnl-full",
        method: "POST",
        body
      }),
    }),
    fancyPnl: build.query({
      query: (body) => ({
        url: "/bets/fancy-pnl",
        method: "POST",
        body
      }),
    }),
    WinnerPnl: build.mutation({
      query: (body) => ({
        url: `/bets/winner-pnl`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const {useLazyOddsQuPnlQuery, useFancyPnlQuery, useWinnerPnlMutation} = oddsPnlApi;
