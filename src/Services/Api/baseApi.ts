import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.20.159:3001/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authState.token;
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
