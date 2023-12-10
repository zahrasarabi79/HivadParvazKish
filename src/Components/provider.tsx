"use client";

import { SnackbarProvider } from "@/context/SnackbarContext";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "@/app/registry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <Provider store={ store}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </Provider>
    </StyledComponentsRegistry>
  );
};
export default Providers;
