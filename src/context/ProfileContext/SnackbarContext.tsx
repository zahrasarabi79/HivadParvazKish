import { SnackbarAction, SnackbarContextType, SnackbarState } from "@/Interface/Interfaces";
import React, { createContext, useContext, useReducer } from "react";


const SnackbarContext = createContext<SnackbarContextType | null>(null);

const initialState = {
  isOpen: false,
  message: "",
  color: "",
};

const snackbarReducer = (state: SnackbarState, action: SnackbarAction) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return {
        isOpen: true,
        message: action.message,
        color: action.color,
      };
    case "CLOSE_SNACKBAR":
      return initialState;
    default:
      return state;
  }
};

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const openSnackbar = (message: string, color: string) => {
    dispatch({ type: "OPEN_SNACKBAR", message, color });
  };

  const closeSnackbar = () => {
    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  return <SnackbarContext.Provider value={{ state, openSnackbar, closeSnackbar }}>{children}</SnackbarContext.Provider>;
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
