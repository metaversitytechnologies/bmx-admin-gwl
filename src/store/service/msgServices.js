import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const msgServices = createApi({
  reducerPath: "msgServices",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://helperapi.kohinoorpro.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessage: build.query({
      query: () => ({
        url: `/message/get/other`,
        method: "GET",
      }),
    })
  }),
});

export const {useGetMessageQuery } = msgServices;
