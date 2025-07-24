import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userlistApi = createApi({
  reducerPath: "userlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["dashboard"],
  endpoints: (build) => ({
    userList: build.mutation({
      query: (body) => ({
        url: "/user/child-list-active-user",
        method: "POST",
        body,
      }),
    }),
    odsPnl: build.query({
      query: (body) => ({
        url: "/bets/odds-pnl",
        method: "POST",
        body,
      }),
    }),
    deposit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/deposit-chips-pnl-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),

    withdraw: build.mutation({
      query: (body) => ({
        url: "/bmx/user/withdraw-chips-pnl-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),

    depositAndWithdraw: build.query({
      query: (body) => ({
        url: "/bmx/user/depositwithdrawdata-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    addLimit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/dcr-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    minusLimit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/wcr-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    partnership: build.mutation({
      query: (body) => ({
        url: "/user/user-parent-share",
        method: "POST",
        body,
      }),
    }),
    createUserData: build.query({
      query: (body) => ({
        url: "/bmx/user/get-user-data-for-create-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: "/bmx/user/create/v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: "/bmx/user/update-v2",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    getUser: build.query({
      query: (body) => ({
        url: "/bmx/user/get-user-for-update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dashboard"],
    }),
    accountOpration: build.query({
      query: (body) => ({
        url: "/ant-pro/get-accstt-chpdtl",
        method: "POST",
        body,
      }),
    }),
    isUserId: build.query({
      query: (body) => ({
        url: "/user/is-userid-available",
        method: "POST",
        body,
      }),
    }),
    upDateLimites: build.query({
      query: (body) => ({
        url: "/bmx/user/creditdata-v2",
        method: "POST",
        body,
      }),
    }),
    dashboard: build.query({
      query: () => ({
        url: "/user/ant-dashboard",
        method: "POST",
      }),
      providesTags: ["dashboard"],
    }),
    getUserId: build.mutation({
      query: (body) => ({
        url: "/bmx/user/get-ordered-user-id",
        method: "POST",
        body,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  // useUserListQuery,
  useOdsPnlQuery,
  useDepositMutation,
  useWithdrawMutation,
  useDepositAndWithdrawQuery,
  useAddLimitMutation,
  useMinusLimitMutation,
  usePartnershipMutation,
  useLazyCreateUserDataQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLazyGetUserQuery,
  useAccountOprationQuery,
  useDashboardQuery,
  useLazyIsUserIdQuery,
  useLazyUpDateLimitesQuery,
  useGetUserIdMutation,
} = userlistApi;
