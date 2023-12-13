import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";
export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const isLoggedIn = (getState() as RootState).authState.isLoggedIn;
      const token = (getState() as RootState).authState?.token;
      if (isLoggedIn) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
