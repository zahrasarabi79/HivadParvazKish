import { IProfilInitialState } from "@/Interface/Interfaces";
import { getProfile } from "@/Services/Api/profileApi";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
const initialState: IProfilInitialState = {
  name: "کاربر ناشناس",
  role: "کارمند",
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getProfile.matchPending, getProfile.matchRejected), (state) => initialState);
    builder.addMatcher(getProfile.matchFulfilled, (state, { payload }) => {
      state.name = payload.name;
      state.role = payload.role;
    });
  },
});
export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer; // just for exporting the slice
