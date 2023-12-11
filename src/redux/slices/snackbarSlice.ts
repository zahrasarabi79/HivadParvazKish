import { ISnackbarState } from "@/Interface/Interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: ISnackbarState = {
  isOpen: false,
  message: "",
  color: "",
};

export const snackbarSlice = createSlice({
  name: "Snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, { payload }: PayloadAction<{ color: string; message: string }>) => {
      state.isOpen = true;
      state.color = payload.color;
      state.message = payload.message;
    },
    closeSnackbar: (state) => initialState,
  },
});
export const {closeSnackbar,openSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;
