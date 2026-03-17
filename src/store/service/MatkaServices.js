import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const matkaApi = createApi({
  reducerPath: "matkaApi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    getMatkaPnl: build.mutation({
      query: (body) => ({
        url: "/matka/matka-pnl",
        method: "POST",
        body,
      }),
    }),
    getMatkaBetDetails: build.mutation({
      query: (body) => ({
        url: "/matka/get-mtk-bet-by-nameanddate",
        method: "POST",
        body,
      }),
    }),
    getMatkaList: build.query({
      query: (body) => ({
        url: "matka/list",
        method: "POST",
        body,
      }),
    }),
    getMatkaMarket: build.query({
      query: (body) => ({
        url: "matka/get-matka-market",
        method: "POST",
        body,
      }),
    }),
    getMatkaBets: build.query({
      query: (body) => ({
        url: "matka/get-matka-bets",
        method: "POST",
        body,
      }),
    }),
    getMatkaBetBySid: build.mutation({
      query: (body) => ({
        url: "matka/get-mtk-bet-by-sid",
        method: "POST",
        body,
      }),
    }),
    getMatkaLiability: build.query({
      query: (body) => ({
        url: "matka/get-matka-liability",
        method: "POST",
        body,
      }),
    }),
    setMatkaResult: build.mutation({
      query: (body) => ({
        url: "matka/set-matka-result",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetMatkaPnlMutation,
  useGetMatkaBetDetailsMutation,
  useGetMatkaListQuery,
  useGetMatkaMarketQuery,
  useGetMatkaBetsQuery,
  useGetMatkaBetBySidMutation,
  useGetMatkaLiabilityQuery,
  useSetMatkaResultMutation,
} = matkaApi;
