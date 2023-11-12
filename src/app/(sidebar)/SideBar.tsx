"use client";
import { Box, Drawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { HivadSidebarItems } from "./SidebarItem";
import { IDrawerWidth, ISelectListItem } from "@/Interface/Interfaces";
import { DrawerDesktop } from "@/style/StyleComponents/DrawerDesktopStyle";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "./Navbar";
import DrawerItem from "@/Components/DrawerItem";

export const drawerWidth: IDrawerWidth = { desktop: 240, mobile: 60 };
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  const currentPath = usePathname();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectListItem, setSelectListItem] = useState<ISelectListItem[]>(
    HivadSidebarItems.map((item) => ({ focusindex: false, openChildrenItem: item.route === currentPath || item.children?.some((child) => child.route === currentPath) }))
  );
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggle = () => {
    setSelectListItem((prevItems: ISelectListItem[]) =>
      prevItems.map((item) => ({
        ...item,
        focusindex: false,
        openChildrenItem: false,
      }))
    );
    setMobileOpen(!mobileOpen);
  };
  const handleCloseDrawer = () => {
    setOpen(!open);
    if (open) {
      setSelectListItem((prevItems: ISelectListItem[]) =>
        prevItems.map((item) => ({
          ...item,
          openChildrenItem: false,
        }))
      );
    } else {
      setSelectListItem((prevItems: ISelectListItem[]) =>
        prevItems.map((item) => ({
          ...item,
          focusindex: true,
          openChildrenItem: true,
        }))
      );
    }
  };
  const handleSelectedListItem = (index: number, itemRoute: string = "") => {
    if (open) {
      setSelectListItem((prevItems: ISelectListItem[]) => {
        const updatedItems = prevItems.map((item, i) => ({
          ...item,
          openChildrenItem: i === index ? !item.openChildrenItem : false,
          focusindex: i === index ? !item.focusindex : false,
        }));
        console.log(updatedItems);

        return updatedItems;
      });
    } else {
      setOpen(!open);
    }
    itemRoute ? router.push(itemRoute) : "";
    if (itemRoute && !smUp) {
      handleDrawerToggle();
    }
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
          <DrawerItem open={open} selectListItem={selectListItem} handleSelectedListItem={handleSelectedListItem} handleCloseDrawer={handleDrawerToggle} setSelectListItem={setSelectListItem} />
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
          <DrawerItem open={open} selectListItem={selectListItem} handleSelectedListItem={handleSelectedListItem} handleCloseDrawer={handleCloseDrawer} setSelectListItem={setSelectListItem} />
        </DrawerDesktop>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: open ? `calc(100% - ${drawerWidth.desktop}px)` : `calc(100% - ${drawerWidth.mobile}px)` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
