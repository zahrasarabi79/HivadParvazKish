import React, { createContext, useContext, useReducer } from "react";
const initialValue = false;
interface IshowPasswordContextType {
  showState: boolean;
  showPassword: () => void;
  hidePassword: () => void;
}
type showPasswordAction = { type: "SHOW-PASSWORD" } | { type: "HIDE-PASSWORD" };

const showPasswordContext = createContext<IshowPasswordContextType | null>(null);
const showPasswordReducer = (state: boolean, action: showPasswordAction) => {
  switch (action.type) {
    case "SHOW-PASSWORD": {
      return true;
    }
    case "HIDE-PASSWORD": {
      return false;
    }
    default:
      return state;
  }
};
export const ShowPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const [showState, dispatch] = useReducer(showPasswordReducer, initialValue);
  const showPassword = () => {
    dispatch({ type: "SHOW-PASSWORD" });
  };
  const hidePassword = () => {
    dispatch({ type: "HIDE-PASSWORD" });
  };
  return <showPasswordContext.Provider value={{ showState, showPassword, hidePassword }}>{children}</showPasswordContext.Provider>;
};

export const useShowPassword = () => {
  const context = useContext(showPasswordContext);
  if (!context) {
    throw new Error("useShowPassword must be used within a SnackbarProvider");
  }
  return context;
};
