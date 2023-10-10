import { IconButton, List, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import SidebarItem from "../(sidebar)/SidebarItem";
import { ISelectListItem } from "@/Interface/Interfaces";
import Icon from "./Icon";
export interface IDrawerItemComponenet {
  open: boolean;
  handleSelectedListItem: (index: number, itemRoute: string) => void;
  selectListItem: ISelectListItem[];
  handleCloseDrawer: () => void;
}
const DrawerItem: React.FC<IDrawerItemComponenet> = ({ open, handleSelectedListItem, selectListItem, handleCloseDrawer }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Stack style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 25, justifyContent: "space-between" }}>
        <Image src="/image/pouyagaranLogo.svg" priority={true} width={40} height={40} alt="pouyagaranLogo" style={{ marginBottom: smDown ? (open ? "42px" : "22px") : "42px" }} />
        {((smDown && open) || (!smDown && open)) && (
          <Typography variant="body2" sx={{ mb: 3 }}>
            مدیریت ارتباط با مشتریان
          </Typography>
        )}
      </Stack>

      <List sx={{ paddingY: 0 }}>
        <SidebarItem open={open} handleSelectedListItem={handleSelectedListItem} selectListItem={selectListItem} />
      </List>

      <Stack
        sx={{
          transition: "  transform .4s ease-in-out",
          transform: open ? "rotate(0deg)" : "rotate(180deg)",
          position: "fixed",
          bottom: 0,
          
        }}
      >
        <IconButton sx={{ padding: "8px", margin: 2 }} onClick={handleCloseDrawer}>
          <Icon pathName={"../icon/ArrowIcon.svg"} focused={false} color="white" />
        </IconButton>
      </Stack>
    </>
  );
};

export default DrawerItem;
