import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const transectionApi = createApi({
  reducerPath: "transectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes:["deleteByUser"],
  endpoints: (build) => ({
    filterbyClient: build.query({
      query: (body) => ({
        url: `/bmx/filter-by-client-cash-transection`,
        method: "POST",
        body
      }),
      providesTags:["deleteByUser"]

    }),
    createTransaction: build.mutation({
      query: (body) => ({
        url: `/bmx/create-cash-transection`,
        method: "POST",
        body
      }),
    }),
    userList: build.query({
      query: (body) => ({
        url: `/bmx/bmx-user-details`,
        method: "POST",
        body
      }),
    }),
    DeleteByUserID: build.mutation({
      query: (body) => ({
        url: `/bmx/delete-cash-transection`,
        method: "POST",
        body
      }),
      invalidatesTags:["deleteByUser"]
    }),
    fetchDeleteTransection: build.query({
      query: (body) => ({
        url: `/bmx/fetch-deleted-transection`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const {useLazyFilterbyClientQuery,useCreateTransactionMutation, useLazyUserListQuery,useDeleteByUserIDMutation, useFetchDeleteTransectionQuery} = transectionApi;