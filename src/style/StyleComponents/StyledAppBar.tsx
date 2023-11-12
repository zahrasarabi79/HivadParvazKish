import { drawerWidth } from "@/app/(sidebar)/SideBar";
import { AppBar, styled } from "@mui/material";

type InputProps = {
    open: boolean;
    isDesktop: boolean;
  };
  export const StyledAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== "open" && prop !== "isDesktop" })<InputProps>(({ theme, open, isDesktop }) => ({
    position: "fixed",
    boxShadow: "none",
    ...(open && {
      marginLeft: drawerWidth.desktop,
      width: isDesktop ? `calc(100% - ${drawerWidth.desktop}px)` : "100%",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));