import { IChangePassFormValues, IProfileRes } from "@/Interface/Interfaces";
import { baseApi } from "./baseApi";
import { openSnackbar } from "@/redux/slices/snackbarSlice";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<IProfileRes, void>({
      query: () => ({
        url: "/profileinformation",
      }),
      onQueryStarted: (_, { queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            console.error("API request error:", error);
          });
      },
      providesTags: ["profile"],
    }),
    updatePassword: build.mutation<void, IChangePassFormValues>({
      query: (body) => ({
        url: "/updatepassword",
        method: "POST",
        body,
      }),
      onQueryStarted: (_, { queryFulfilled, dispatch }) => {
        queryFulfilled
          .then(() => {
            dispatch(openSnackbar({ color: "rgb(11, 150, 30)", message: "رمز با موفقیت تغییر کرد" }));
          })
          .catch((error) => {
            console.error("API request error for profile:", error);
          });
      },
    }),
  }),
  overrideExisting: false,
});
export const { useGetProfileQuery, useUpdatePasswordMutation } = profileApi;
export const { getProfile } = profileApi.endpoints;
