import { baseApi } from "./baseApi";
import Cookies from "js-cookie";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => {
        return { url: "/login", body, method: "POST" };
      },
      onQueryStarted: (_, { queryFulfilled }) => {
        queryFulfilled
          .then((response) => {
            const token = response.data.token;
            Cookies.set("token", token as string);
            Cookies.set("isLoggedIn", "true");
          })
          .catch(() => {});
      },
    }),
  }),
  overrideExisting: false,
});
export const { useLoginMutation } = authApi;
export const { login } = authApi.endpoints;
