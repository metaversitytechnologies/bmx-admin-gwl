import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const loginReportApi = createApi({
  reducerPath: "loginReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    loginReport: build.query({
      keepUnusedDataFor: 0,
      query: (body) => ({
        url: "/ant-pro/ant-pro-login-report",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLazyLoginReportQuery } = loginReportApi;
