"use client";
import { AppBar, Avatar, Fade, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, styled, useTheme } from "@mui/material";
import Image from "next/image";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { drawerWidth } from "./SideBar";
// import { AppBar } from "../../../Utils/style/stylecomponent";

export interface NavbarProps {
  isDesktopSidebarOpen: boolean;
  onDrawerOpen: () => void;
}

const Navbar: FC<NavbarProps> = ({ onDrawerOpen, isDesktopSidebarOpen: open }) => {
  const theme = useTheme();
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
  const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const Logout = () => {
    localStorage.clear();
    if (!localStorage.getItem("myToken")) {
      router.push("/login");
    }
  };

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        ...(open && {
          marginLeft: drawerWidth.desktop,
          width: `calc(100% - ${drawerWidth.desktop}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
      dir="rtl"
      position="fixed"
    >
      <Toolbar variant="dense" sx={{ bgcolor: theme.palette.background.paper, justifyContent: "space-between" }}>
        <Stack>
          <IconButton onClick={onDrawerOpen} sx={{ display: { sm: "none", xs: "block" } }}>
            <Image src="/image/pouyagaranLogo.svg" width={30} height={30} alt="pouyagaranLogo" />
          </IconButton>
        </Stack>
        <Stack direction={"row"}>
          {/* profile */}
          <IconButton>
            <Image
              src="/icon/profile.svg"
              width={20}
              height={20}
              alt="profile"
              onClick={(e: React.MouseEvent<HTMLImageElement>) => setAnchorElProfile(e.currentTarget)}
            />
          </IconButton>
          <Menu
            dir="rtl"
            sx={{ mt: 0.5, minwidth: 250, borderRadius: 1 }}
            anchorEl={anchorElProfile}
            open={!!anchorElProfile}
            onClose={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorElProfile(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            TransitionComponent={Fade}
          >
            <MenuItem divider={true} sx={{ gap: 1 }}>
              <Avatar sx={{ width: 30, height: 30, bgcolor: theme.palette.primary.light }} alt={"zahra sarabi"} />
              <Typography variant="body1">{"زهرا سرابی"}</Typography>
            </MenuItem>
            <MenuItem onClick={Logout} sx={{ gap: 1 }}>
              <LogoutIcon sx={{ width: 22, height: 22 }} />
              <Typography variant="body2">خروج</Typography>
            </MenuItem>
          </Menu>
          {/* notification */}
          <IconButton>

            <Image
              src="/icon/notification.svg"
              width={20}
              height={20}
              alt="notification"
              onClick={(e: React.MouseEvent<HTMLImageElement>) => setAnchorElNotification(e.currentTarget)}
            />
          </IconButton>
          <Menu
            dir="rtl"
            sx={{ mt: 0.5, minwidth: 250, borderRadius: 1 }}
            anchorEl={anchorElNotification}
            open={!!anchorElNotification}
            onClose={(e: React.MouseEvent<HTMLImageElement>) => setAnchorElNotification(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Fade}
          >
            <MenuItem sx={{ gap: 1 }}>
              <SmsFailedIcon sx={{ color: theme.palette.error.light }} />
              <Typography variant="body1">{"در حال حاضر پیامی ندارید!!!"}</Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
