import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query"

export const dynamicBaseQuery = async (args, WebApi, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const result = await rawBaseQuery(args, WebApi, {})
    if (result?.error) {
      const status  = result?.error?.status
        if (status === 401) {
          localStorage.clear()
          window.location.replace("/")
        }
    }
    return result
  }