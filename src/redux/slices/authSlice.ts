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
    setCredentials: (state, action) => {
      const { token, isLoggedIn } = action.payload;
      state.token = token;
      state.isLoggedIn = isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(login.matchPending, login.matchRejected), (state) => {
      state.isLoggedIn = false;
      state.token = null;
    });
    builder.addMatcher(login.matchFulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload?.token;
    });
  },
});
export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
