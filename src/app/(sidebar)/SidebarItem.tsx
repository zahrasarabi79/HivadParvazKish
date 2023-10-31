import { ISelectListItem, ISidebarItemComponent, SidebarItem, SidebarItemChildren, SidebarItemChildrenOfChildren } from "@/Interface/Interfaces";
import Icon from "@/app/Components/Icon";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery, useTheme } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export const HivadSidebarItems: SidebarItem[] = [
  {
    title: "قرارداد های هیواد",
    icon: "plainicon.svg",
    children: [
      {
        title: "لیست قراردادها",
        route: "/Contracts/ContractList",
      },
      { title: "ایجاد قراردادها", route: "/Contracts/CreateContract" },
    ],
  },
  {
    title: "تاریخچه تغییرات",
    route: "/systemlog",
    icon: "dashboard.svg",
  },
];
const SidebarItem: React.FC<ISidebarItemComponent> = ({ open, handleSelectedListItem, selectListItem, handleCloseDrawer }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const currentPath = usePathname();
  const isActive = (item: SidebarItem | SidebarItemChildren): boolean => {
    if (item.route) {
      return currentPath?.includes(item.route) ?? false;
    }
    if ("children" in item) {
      return item.children?.some((child, index) => isActive(child)) as boolean;
    }
    return false;
  };

 
  const childrenCollapsItemButton = (childerItem: SidebarItemChildren) => {
    router.push(childerItem.route || "");

    if (!smUp) {
      handleCloseDrawer();
    }
  };

  return HivadSidebarItems.map((item: SidebarItem, index: number) => {
    const isAnyChildMatched = open ? item.children?.some((childerItem) => currentPath === childerItem.route) : false;

    return (
      <React.Fragment key={item.title}>
        <ListItem sx={{ paddingX: 1, paddingY: 0 }}>
          <ListItemButton
            sx={{
              direction: "initial",
              transition: ".1s all east-in",
              justifyContent: open ? "space-between" : "center",
              alignItems: "center",
              borderRadius: "25px",
              color: !item.children && isActive(item) ? theme.palette.primary.main : "white",
              "&:hover ": {
                bgcolor: open ? "rgb(79, 77,96)" : "rgba(43, 154, 255, 0.00)",
              },
              "&:focus": {
                "&:hover": {
                  bgcolor: "rgba(43, 154, 255, 0.24)",
                },
              },
            }}
            onClick={() => handleSelectedListItem(index, item.route || "")}
          >
            {item.children ? (
              <Icon
                pathName="littleLeftArrow.svg"
                style={{
                  display: smUp ? (open ? "block" : "none") : "block",
                  transform: selectListItem[index].openChildrenItem ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: ".2s all",
                }}
              />
            ) : (
              ""
            )}

            <ListItemText
              sx={{
                display: smUp ? (open ? "block" : "none") : "block",
              }}
              primary={item.title}
            />
            <ListItemIcon
              sx={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <Box
                sx={{
                  bgcolor: !open && isActive(item) ? "rgb(79, 77,96)" : "rgba(255, 255, 255, 0.00)",
                  padding: !open ? 1.5 : 0,
                  borderRadius: "50%",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: !open ? (isActive(item) ? "rgba(43, 154, 255, 0.24)" : "rgba(255, 255, 255, 0.08)") : "rgba(255, 255, 255, 0.00)",
                  },
                }}
              >
                <Icon pathName={item.icon} focused={open ? (item.children ? false : isActive(item)) : isActive(item)} style={{ marginRight: open ? "24px" : "0px" }} />
              </Box>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {item.children &&
          selectListItem[index].openChildrenItem &&
          item.children.map((childerItem: SidebarItemChildren, parentIndex: number) => {
            return (
              <Collapse key={parentIndex} in={isAnyChildMatched || selectListItem[index].openChildrenItem}>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => childrenCollapsItemButton(childerItem)}
                    sx={{
                      borderRadius: "25px",
                      mx: 1,
                      transition: ".1s all",
                      color: currentPath === childerItem.route ? theme.palette.primary.main : "white",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                      },
                      "&:focus": {
                        // color: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: "rgba(43, 154, 255, 0.24)",
                        },
                      },
                    }}
                  >
                    <ListItemText inset primary={childerItem.title} />
                  </ListItemButton>
                  {childerItem.children &&
                    childerItem.children.map((childerItemchildren: SidebarItemChildrenOfChildren, childIndex: number) => (
                      <Collapse key={childIndex}>
                        <List component="div" disablePadding>
                          <ListItemButton onClick={() => router.push(childerItemchildren.route || "")}>
                            <ListItemText inset primary={childerItemchildren.title} />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    ))}
                </List>
              </Collapse>
            );
          })}
      </React.Fragment>
    );
  });
};
export default SidebarItem;
