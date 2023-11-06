"use client";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeOptions } from "@mui/material";
import { createTheme, ThemeProvider, experimental_sx as sx } from "@mui/material";
import { ReactNode, FC } from "react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { palette } from "./palette";
import components from "./compOverrides";
import typography from "./typography";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const theme: ThemeOptions = createTheme({
    direction: "rtl",
    palette,
    typography,
    components,
    shape: {
      borderRadius: 12,
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Theme;
