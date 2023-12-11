import { IProfileRes} from "@/Interface/Interfaces";
import { baseApi } from "./baseApi";


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
    }),
  }),
  overrideExisting: false,
});
export const { useGetProfileQuery } = profileApi;
export const { getProfile } = profileApi.endpoints;
