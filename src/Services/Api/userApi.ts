import { baseApi } from "./baseApi";
import { openSnackbar } from "@/redux/slices/snackbarSlice";
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({ body, method: "POST", url: "/AddUsers" }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(openSnackbar({ color: "rgb(11, 150, 30)", message: "کاربر با موفقیت ایجاد شد." }));
          })
          .catch((error) => {
            console.log("error", error);
          });
      },
    }),
    getListOfUsers: build.mutation({
      query: (body) => ({
        url: "/usersList",
        method: "POST",
        body,
      }),
    }),
    updateUser: build.mutation({ query: (body) => ({ url: "/updateUser", method: "POST", body }) }),
  }),
});
export const { useCreateUserMutation, useGetListOfUsersMutation } = userApi;
