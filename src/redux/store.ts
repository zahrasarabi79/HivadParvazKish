import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import { baseApi } from "@/Services/Api/baseApi";
import { authApi } from "@/Services/Api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

// export const rootReducer = combineReducers({
//   authState: authReducer,
//   [baseApi.reducerPath]: baseApi.reducer,
//   [authApi.reducerPath]: authApi.reducer,
// });

export const store = configureStore({
  reducer: {
    authState: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseApi.middleware, authApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

// Setup listeners for the async APIs
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
