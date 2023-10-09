import { ISelectListItem, ISidebarItemComponent, SidebarItem, SidebarItemChildren, SidebarItemChildrenOfChildren } from "@/Interface/Interfaces";
import Icon from "@/app/Components/Icon";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const HivadSidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    route: "/dashboard",
    icon: "dashboard.svg",
  },
  {
    title: "قرارداد های هیواد",
    icon: "plainicon.svg",
    children: [
      { title: "ایجاد قراردادها", route: "/Contracts/CreateContract" },
      {
        title: "لیست قراردادها",
        route: "/Contracts/ContractList",
      },
    ],
  },
];

const SidebarItem: React.FC<ISidebarItemComponent> = ({ open, handleSelectedListItem, selectListItem }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

  return HivadSidebarItems.map((item: SidebarItem, index: number) => (
    <React.Fragment key={item.title}>
      <ListItem sx={{ paddingX: 1, paddingY: 0 }}>
        <ListItemButton
          sx={{
            direction: "initial",
            transition: ".1s all east-in",
            justifyContent: open ? "space-between" : "center",
            alignItems: "center",
            borderRadius: "25px",

            color: selectListItem[index].focusindex ? theme.palette.primary.main : "white",
            "&:hover ": {
              bgcolor: "rgba(255, 255, 255, 0.08)",
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
                display: smDown ? (open ? "block" : "none") : "block",
                transform: selectListItem[index].focusindex ? "rotate(-90deg)" : "rotate(0deg)",
                transition: ".2s all",
              }}
              focused={selectListItem[index].focusindex}
            />
          ) : (
            ""
          )}

          <ListItemText
            sx={{
              display: smDown ? (open ? "block" : "none") : "block",
            }}
            primary={item.title}
          />
          <ListItemIcon sx={{ justifyContent: "center" }}>
            <Icon pathName={item.icon} focused={selectListItem[index].focusindex} style={{ marginRight: open ? "24px" : "0px" }} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      {item.children &&
        item.children.map((childerItem: SidebarItemChildren, parentIndex: number) => (
          <Collapse key={parentIndex} in={selectListItem[index].openChildrenItem}>
            <List component="div" disablePadding>
              <ListItemButton
                onClick={() => router.push(childerItem.route || "")}
                sx={{
                  borderRadius: "25px",
                  mx: 1,
                  transition: ".1s all",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                  "&:focus": {
                    color: theme.palette.primary.main,
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
        ))}
    </React.Fragment>
  ));
};
export default SidebarItem;
