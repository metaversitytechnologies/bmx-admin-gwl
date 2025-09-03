import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, baseUrlkho, isAntPro } from "../constant";

export const dynamicBaseQuery = async (args, WebApi, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: isAntPro ? baseUrl : baseUrlkho,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await rawBaseQuery(args, WebApi, {});


  if (result?.error) {
    const status = result?.error?.status;
    if (status === 401) {
      localStorage.clear();
      window.location.replace("/");
    }
  }
  return result;
};
