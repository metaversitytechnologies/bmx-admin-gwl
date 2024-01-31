import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const LiveCasinoServices = createApi({
  reducerPath: "CasinoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://43.205.157.72:3434/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    LastValue: build.query({
      query: (args) => {
        const {value} = args
        return {
          url: "/casino/meta-" + value,
          method: "GET",
        };
      },
    }),
    
  }),
});

export const {
  useLastValueQuery,
  
} = LiveCasinoServices;
