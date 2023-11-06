import { IconButton, List, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import SidebarItem from "@/app/(sidebar)/SidebarItem";
import { ISelectListItem } from "@/Interface/Interfaces";
import Icon from "./Icon";
import { useParams } from "next/navigation";
export interface IDrawerItemComponenet {
  open: boolean;
  handleSelectedListItem: (index: number, itemRoute: string) => void;
  selectListItem: ISelectListItem[];
  handleCloseDrawer: () => void;
  setSelectListItem: React.Dispatch<React.SetStateAction<ISelectListItem[]>>;
}
const DrawerItem: React.FC<IDrawerItemComponenet> = ({ open, handleSelectedListItem, setSelectListItem, selectListItem, handleCloseDrawer }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));
  const currentRoute = useParams();

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

      <List>
        <SidebarItem open={open} handleSelectedListItem={handleSelectedListItem} selectListItem={selectListItem} handleCloseDrawer={handleCloseDrawer} />
      </List>

      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          transition: "  transform .3s ease-in-out",
          transform: smDown ? (open ? "rotate(0deg)" : "rotate(180deg)") : "rotate(0deg)",
          position: "fixed",
          bottom: 0,
        }}
      >
        <IconButton sx={{ padding: "4px", margin: 2 }} onClick={handleCloseDrawer}>
          <Icon pathName={"../icon/ArrowIcon.svg"} focused={false} color="white" />
        </IconButton>
      </Stack>
    </>
  );
};

export default DrawerItem;
