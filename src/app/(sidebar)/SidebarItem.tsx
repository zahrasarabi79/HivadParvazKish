import { ISelectListItem, ISidebarItemComponent, SidebarItem, SidebarItemChildren, SidebarItemChildrenOfChildren } from "@/Interface/Interfaces";
import Icon from "@/app/Components/Icon";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const HivadSidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    route: "dashboard",
    icon: "dashboard.svg",
  },
  {
    title: "قرارداد های هیواد",
    icon: "plainicon.svg",
    children: [
      { title: "ایجاد", route: "/Contracts/ModifyContract" },
      {
        title: "لیست",
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
      <ListItem sx={{ px: 2, py: 0, justifyContent: "space-between" }}>
        <ListItemButton
          sx={{
            transition: ".1s all east-in",
            justifyContent: open ? "initial" : "center",
            borderRadius: 1,
            color: selectListItem[index].focusindex ? theme.palette.primary.main : "white",

            "&:hover ": {
              bgcolor: "rgba(255, 255, 255, 0.05)",
            },
            "&:focus": {
              "&:hover": {
                bgcolor: "rgba(43, 154, 255,0.07)",
              },
            },
          }}
          // onFocus={() => setFocused(index)}
          // onBlur={() => setFocused(null)}
          onClick={() => handleSelectedListItem(index)}
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
              mx: 1,
              display: smDown ? (open ? "block" : "none") : "block",
            }}
            primary={item.title}
          />
          <ListItemIcon sx={{ minWidth: 0 }}>
            <Icon pathName={item.icon} focused={selectListItem[index].focusindex} />
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
                  borderRadius: 1,
                  transition: ".1s all",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                  "&:focus": {
                    color: theme.palette.primary.main,
                    mx: 1,
                    "&:hover": {
                      bgcolor: "rgba(43, 154, 255,0.07)",
                    },
                  },
                }}
              >
                <ListItemText sx={{ m: 0 }} inset primary={childerItem.title} />
              </ListItemButton>
              {childerItem.children &&
                childerItem.children.map((childerItemchildren: SidebarItemChildrenOfChildren , childIndex: number) => (
                  <Collapse key={childIndex}>
                    <List component="div" disablePadding>
                      <ListItemButton onClick={() => router.push(childerItemchildren.route || "")}>
                        <ListItemText sx={{ m: 0 }} inset primary={childerItemchildren.title} />
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
