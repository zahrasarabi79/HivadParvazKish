import { ApiSystemLogResponse } from "@/Interface/Interfaces";
import { baseApi } from "./baseApi";

export const logSystemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListOflogSystem: build.mutation<ApiSystemLogResponse, Record<string, number>>({
      query: (body) => ({
        url: "/listOfSystemHistory",
        method: "POST",
        body,
      }),
      onQueryStarted: (_, { queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            console.error("API request error:", error);
          });
      },
    }),
  }),
  overrideExisting: false,
});
export const { useGetListOflogSystemMutation } = logSystemApi;
