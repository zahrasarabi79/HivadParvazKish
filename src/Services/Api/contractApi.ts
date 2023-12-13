import { IContractListApiRes, IProfileRes, IUserListApiRes } from "@/Interface/Interfaces";
import { baseApi } from "./baseApi";
import { openSnackbar } from "@/redux/slices/snackbarSlice";

export const contractApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContract: build.mutation({
      query: (body) => ({
        url: "/AddReports",
        method: "POST",
        body,
      }),
      onQueryStarted: (_, { queryFulfilled, dispatch }) => {
        queryFulfilled
          .then(() => {
            dispatch(openSnackbar({ color: "rgb(11, 150, 30)", message: "قرارداد با موفقیت ایجاد شد." }));
          })
          .catch((error) => {
            console.error("API request error:", error);
          });
      },
    }),
    updateContract: build.mutation({
      query: (body) => ({
        url: "/updateReports",
        method: "POST",
        body,
      }),
      onQueryStarted: (_, { queryFulfilled, dispatch }) => {
        queryFulfilled
          .then(() => {
            dispatch(openSnackbar({ color: "rgb(11, 150, 30)", message: "قرارداد با موفقیت ویرایش شد." }));
          })
          .catch((error) => {
            console.error("API request error:", error);
          });
      },
    }),
    listOfContract: build.mutation<IContractListApiRes, Record<string, number>>({
      query: (body) => ({
        url: "/listOfReports",
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
    getContract: build.mutation<IContractListApiRes, { id: string | string[] }>({
      query: (body) => ({
        url: "/showReports",
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
export const {
  useListOfContractMutation,
  useCreateContractMutation,
  useUpdateContractMutation,
  useGetContractMutation,
} = contractApi;
