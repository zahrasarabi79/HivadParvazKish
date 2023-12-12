import { INewUser, IUser, IUserApiResponse, IUserListApiRes } from "@/Interface/Interfaces";
import { baseApi } from "./baseApi";
import { openSnackbar } from "@/redux/slices/snackbarSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<IUserApiResponse, INewUser>({
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
    getListOfUsers: build.mutation<IUserListApiRes, Record<string, number>>({
      query: (body) => ({
        url: "/usersList",
        method: "POST",
        body,
      }),
    }),
    updateUser: build.mutation<void, IUserApiResponse>({
      query: (body) => ({ url: "/updateUser", method: "POST", body }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(openSnackbar({ color: "rgb(11, 150, 30)", message: "کاربر با موفقیت ویرایش شد." }));
          })
          .catch((error) => {
            console.log("error", error);
          });
      },
    }),
    getUserData: build.mutation<IUserApiResponse, { id: string | string[] }>({
      query: (body) => ({ url: "/showUser", method: "POST", body }),
    }),
  }),
});
export const { useCreateUserMutation, useGetListOfUsersMutation, useUpdateUserMutation, useGetUserDataMutation } =
  userApi;
