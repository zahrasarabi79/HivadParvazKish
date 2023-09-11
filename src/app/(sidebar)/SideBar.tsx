"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./Navbar";
import { useState } from "react";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { DrawerDesktop } from "@/Utils/style/stylecomponent";
import { IDrawerWidth } from "@/Interface/Interfaces";

export const drawerWidth: IDrawerWidth = { desktop: 240, mobile: 60 };

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCloseDrawer = () => {
    setOpen(!open);
  };
  const drawer = (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 25 }}>
        <Image src="/image/pouyagaranLogo.svg" width={40} height={40} alt="pouyagaranLogo" onClick={handleCloseDrawer} />

        <Typography
          my={2}
          variant="body1"
          sx={{
            display: smDown ? (open ? "block" : "none") : "block",
          }}
        >
          مدیریت ارتباط با مشتریان
        </Typography>
      </div>
      <div>
        <List sx={{ gap: 2,}}
        >
          <SidebarItem open={open} />
        </List>
      </div>
    </>
  );

  return (
    <Box dir="rtl" sx={{ display: "flex" }}>
      <Box
        dir="ltr"
        component="nav"
        sx={{
          flexShrink: { sm: 1 },
        }}
      >
        <Navbar isDesktopSidebarOpen={open} onDrawerOpen={handleDrawerOpen} />
        {/* mobile drawe */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth.desktop },
          }}
        >
          {drawer}
        </Drawer>
        <DrawerDesktop
          variant="permanent"
          onClose={() => !open}
          open={open}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          {drawer}
        </DrawerDesktop>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: open ? `calc(100% - ${drawerWidth.desktop}px)` : `calc(100% - ${drawerWidth.mobile}px)` }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
