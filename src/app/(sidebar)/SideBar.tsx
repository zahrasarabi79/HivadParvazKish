"use client";
import { Box, Drawer, List, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import SidebarItem, { HivadSidebarItems } from "./SidebarItem";
import { IDrawerWidth, ISelectListItem } from "@/Interface/Interfaces";
import { DrawerDesktop } from "@/Utils/style/stylecomponent";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import DrawerItem from "../Components/DrawerItem";

export const drawerWidth: IDrawerWidth = { desktop: 240, mobile: 60 };
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const currentPath = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectListItem, setSelectListItem] = useState<ISelectListItem[]>(HivadSidebarItems.map(() => ({ focusindex: false, openChildrenItem: false })));

  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCloseDrawer = () => {
    setOpen(!open);
    setSelectListItem((prevItems: ISelectListItem[]) =>
      prevItems.map((item) => ({
        ...item,
        openChildrenItem: false,
      }))
    );
  };
  const handleSelectedListItem = (index: number, itemRoute: string = "") => {
    if (open) {
      setSelectListItem((prevItems: ISelectListItem[]) => {
        const updatedItems = prevItems.map((item, i) => ({
          ...item,
          openChildrenItem: i === index ? !item.openChildrenItem : false,
          focusindex: i === index ? !item.focusindex : false,
        }));
        return updatedItems;
      });
    } else {
      setOpen(!open);
    }
    itemRoute ? router.push(itemRoute) : "";
  };

  return (
    <Box dir="rtl" sx={{ display: "flex" }}>
      <Box dir="ltr" component="nav" sx={{ flexShrink: { sm: 1 } }}>
        <Navbar isDesktopSidebarOpen={open} onDrawerOpen={handleDrawerOpen} />
        {/* mobile drawe */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth.desktop },
            direction: "initial",
          }}
        >
          <DrawerItem
            open={open}
            selectListItem={selectListItem}
            handleSelectedListItem={handleSelectedListItem}
            handleCloseDrawer={handleDrawerToggle}
            setSelectListItem={setSelectListItem}
          />
        </Drawer>
        <DrawerDesktop
          variant="permanent"
          onClose={() => !open}
          open={open}
          sx={{
            display: { xs: "none", sm: "block" },
            position: "relative",
          }}
        >
          <DrawerItem
            open={open}
            selectListItem={selectListItem}
            handleSelectedListItem={handleSelectedListItem}
            handleCloseDrawer={handleCloseDrawer}
            setSelectListItem={setSelectListItem}
          />
        </DrawerDesktop>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: open ? `calc(100% - ${drawerWidth.desktop}px)` : `calc(100% - ${drawerWidth.mobile}px)` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
