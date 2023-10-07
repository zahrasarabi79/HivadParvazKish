import { drawerWidth } from "@/app/(sidebar)/SideBar";
import { CSSObject } from "@emotion/react";
import { AppBarProps, TableCell, TableRow, Theme, styled, tableCellClasses } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

// desktop drawer
export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth.desktop,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerDesktop = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth.desktop,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root.MuiDrawer-paper": { border: "none" },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    borderLeft: "none",
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// table style
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#434255",
    color: theme.palette.common.white,
    padding: "6px 16px 6px 16px",
    // borderBottom: "1px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "13px 16px 13px 16px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#2e2c42",
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
}));
