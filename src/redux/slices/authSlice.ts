import { IAuthState } from "@/Interface/Interfaces";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { login } from "../../Services/Api/authApi";

const initialState: IAuthState = {
  token: Cookies.get("token") || null,
  error: "" || undefined,
  isLoggedIn: Boolean(Cookies.get("isLoggedIn")) || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(login.matchPending, login.matchRejected), (state) => {
      state.isLoggedIn = false;
      state.token = null;
    });
    builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.token = payload.data?.token;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
