"use client";
import {
  Avatar,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { NavbarProps } from "@/Interface/Interfaces";
import { StyledAppBar } from "@/style/StyleComponents/StyledAppBar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { useGetProfileQuery } from "@/Services/Api/profileApi";
import { RootState } from "@/redux/store";
const Navbar: FC<NavbarProps> = ({ onDrawerOpen, isDesktopSidebarOpen: open }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
  useGetProfileQuery();
  const { name: ProfileName } = useAppSelector((state: RootState) => state.profileState);

  useEffect(() => {}, []);
  const Logout = () => {
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("isLoggedIn");
    router.push("/login");
  };
  const Profile = () => {
    router.push("/Profile");
  };

  return (
    <StyledAppBar open={open} isDesktop={isDesktop} dir="rtl">
      <Toolbar variant="dense" sx={{ bgcolor: theme.palette.background.paper, justifyContent: "space-between" }}>
        <Stack>
          <IconButton onClick={onDrawerOpen} sx={{ display: { sm: "none", xs: "flex" } }}>
            <MenuIcon />
          </IconButton>
        </Stack>
        <Stack direction={"row"}>
          {/* profile */}
          <IconButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorElProfile(e.currentTarget)}>
            <Image src="/icon/profile.svg" width={20} height={20} alt="profile" />
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
              <Typography variant="body1">{ProfileName}</Typography>
            </MenuItem>
            <MenuItem onClick={Profile} sx={{ gap: 1, m: 1, transition: ".1s all", borderRadius: 1 }}>
              <ModeEditIcon sx={{ width: 22, height: 22 }} />
              <Typography variant="body2">ویرایش رمز عبور</Typography>
            </MenuItem>
            <MenuItem onClick={Logout} sx={{ mx: 1, gap: 1, transition: ".1s all", borderRadius: 1 }}>
              <LogoutIcon sx={{ width: 22, height: 22 }} />
              <Typography variant="body2">خروج</Typography>
            </MenuItem>
          </Menu>
          {/* notification
          <IconButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorElNotification(e.currentTarget)}>
            <Image src="/icon/notification.svg" width={20} height={20} alt="notification" />
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
          </Menu> */}
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
