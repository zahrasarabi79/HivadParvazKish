import snackbarReducer from "../redux/slices/snackbarSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import { baseApi } from "@/Services/Api/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import profileSlice from "./slices/profileSlice";


export const store = configureStore({
  reducer: {
    authState: authReducer,
    snackbarState: snackbarReducer,
    profileState: profileSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

// Setup listeners for the async APIs
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
