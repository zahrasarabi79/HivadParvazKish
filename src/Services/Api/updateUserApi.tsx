import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const updateUserApi = createApi({
  reducerPath: "updateUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: " http://192.168.20.159:3001/" }),
  endpoints: (builder) => ({}),
});
